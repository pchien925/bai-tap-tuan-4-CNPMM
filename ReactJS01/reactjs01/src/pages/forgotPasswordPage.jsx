import React from 'react';
import { Button, Col, Form, Input, notification, Row, Divider } from 'antd';
import { Link } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import axios from '../util/axios.customize';

const ForgotPasswordPage = () => {
  const onFinish = async (values) => {
    try {
      const res = await axios.post('/v1/api/forgot-password', {
        email: values.email
      });

      notification.success({
        message: "Thành công!",
        description: res.data.message || "Kiểm tra email để đặt lại mật khẩu",
      });
    } catch (error) {
      notification.error({
        message: "Gửi thất bại",
        description: error.response?.data?.message || "Có lỗi xảy ra",
      });
    }
  };

  return (
    <Row justify="center" style={{ marginTop: "50px" }}>
      <Col xs={20} sm={16} md={12} lg={8}>
        <fieldset style={{ padding: 20, border: "1px solid #ddd", borderRadius: 8 }}>
          <legend style={{ fontWeight: "bold", fontSize: 20 }}>Quên Mật Khẩu</legend>

          <div style={{ marginBottom: 20, color: "#666" }}>
            Nhập email của bạn, chúng tôi sẽ gửi link đặt lại mật khẩu.
          </div>

          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Vui lòng nhập email!' },
                { type: 'email', message: 'Email không hợp lệ!' }
              ]}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block size="large">
                Gửi Link Đặt Lại
              </Button>
            </Form.Item>
          </Form>

          <Link to="/login">
            <ArrowLeftOutlined /> Quay lại đăng nhập
          </Link>
          <Divider />
          <div style={{ textAlign: "center" }}>
            Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
          </div>
        </fieldset>
      </Col>
    </Row>
  );
};

export default ForgotPasswordPage;