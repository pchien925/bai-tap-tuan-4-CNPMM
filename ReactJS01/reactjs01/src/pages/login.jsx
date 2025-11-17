import React from 'react';
import { Button, Col, Form, Input, notification, Row, Divider } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { loginApi } from '../util/api';
import { AuthContext } from '../component/context/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { setAuth, setAppLoading } = React.useContext(AuthContext);

  const onFinish = async (values) => {
    const { email, password } = values;
    const res = await loginApi(email, password);

    if (res?.access_token) {
      localStorage.setItem("access_token", res.access_token);

      // Bật lại loading để App.jsx gọi API lấy thông tin user mới nhất
      setAppLoading(true);

      setAuth({
        isAuthenticated: true,
        user: {
          email: res.email || "",
          name: res.name || "",
        },
      });

      notification.success({
        message: "Đăng nhập thành công!",
        description: "Chào mừng quay lại!",
      });

      navigate("/");
    } else {
      notification.error({
        message: "Đăng nhập thất bại",
        description: res?.message || "Email hoặc mật khẩu không đúng!",
      });
    }
  };

  return (
    <Row justify="center" style={{ marginTop: "50px" }}>
      <Col xs={20} sm={16} md={12} lg={8}>
        <fieldset style={{ padding: 20, border: "1px solid #ddd", borderRadius: 8 }}>
          <legend style={{ fontWeight: "bold", fontSize: 20 }}>Đăng Nhập</legend>

          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
              <Input />
            </Form.Item>

            <Form.Item label="Mật khẩu" name="password" rules={[{ required: true }]}>
              <Input.Password />
            </Form.Item>

            <div style={{ textAlign: "right", marginBottom: 16 }}>
              <Link to="/forgot-password" style={{ fontSize: 13 }}>
                Quên mật khẩu?
              </Link>
            </div>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>Đăng Nhập</Button>
            </Form.Item>
          </Form>

          <Link to="/"><ArrowLeftOutlined /> Quay lại trang chủ</Link>
          <Divider />
          <div style={{ textAlign: "center" }}>
            Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
          </div>
        </fieldset>
      </Col>
    </Row>
  );
};

export default LoginPage;