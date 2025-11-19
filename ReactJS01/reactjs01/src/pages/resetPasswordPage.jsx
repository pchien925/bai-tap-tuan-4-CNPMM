// src/pages/ResetPasswordPage.jsx
import React from 'react';
import { Button, Col, Form, Input, notification, Row } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../util/axios.customize';

const ResetPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    if (values.password !== values.confirmPassword) {
      notification.error({ message: "Mật khẩu xác nhận không khớp!" });
      return;
    }

    try {
      const res = await axios.post(`/v1/api/reset-password/${token}`, {
        password: values.password
      });

      notification.success({
        message: "Thành công!",
        description: res.data.message,
      });

      setTimeout(() => {
        navigate('/login', { replace: true });
      }, 2000);
    } catch (error) {
      notification.error({
        message: "Thất bại",
        description: error.response?.data?.message || "Token không hợp lệ hoặc đã hết hạn",
      });
    }
  };

  return (
    <Row justify="center" style={{ marginTop: "50px" }}>
      <Col xs={20} sm={16} md={12} lg={8}>
        <fieldset style={{ padding: 20, border: "1px solid #ddd", borderRadius: 8 }}>
          <legend style={{ fontWeight: "bold", fontSize: 20 }}>Đặt lại mật khẩu</legend>

          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Mật khẩu mới"
              name="password"
              rules={[{ required: true, min: 6 }]}
            >
              <Input.Password size="large" />
            </Form.Item>

            <Form.Item
              label="Xác nhận mật khẩu"
              name="confirmPassword"
              rules={[{ required: true }]}
            >
              <Input.Password size="large" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block size="large">
                Cập Nhật Mật Khẩu
              </Button>
            </Form.Item>
          </Form>
        </fieldset>
      </Col>
    </Row>
  );
};

export default ResetPasswordPage;