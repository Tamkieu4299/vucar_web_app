import { Button, Card, Form, Input, Row } from "antd";
import PropTypes from "prop-types";
import { useNavigate } from "react-router";
import { AUTH_TEXT, MESSAGE } from "@/localization/en";
import logo from "@/assets/voiAds_logo.svg";

function RegisterForm({ onSubmit, isLoading = false }) {
  const navigate = useNavigate();

  return (
    <div style={{ width: "400px", margin: "auto" }}>
      <Card>
        <Form name="validate_other" layout="vertical" onFinish={onSubmit}>
          <img src={logo} alt="void-ads-logo" className="w-20 h-20 m-auto" />
          <Form.Item
            name="name"
            label={AUTH_TEXT.name}
            rules={[
              {
                required: true,
                message: MESSAGE.isRequired,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label={AUTH_TEXT.phoneNumber}
            rules={[
              {
                required: true,
                message: MESSAGE.isRequired,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label={AUTH_TEXT.passWord}
            rules={[
              {
                required: true,
                message: MESSAGE.isRequired,
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Row className="justify-between">
            <Button
              onClick={() => navigate("/auth/login")}
              className="bg-primary"
              type="primary"
            >
              {AUTH_TEXT.login}
            </Button>
            <Button
              htmlType="submit"
              type="primary"
              className="bg-primary"
              loading={isLoading}
            >
              {AUTH_TEXT.register}
            </Button>
          </Row>
        </Form>
      </Card>
    </div>
  );
}

RegisterForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

export default RegisterForm;
