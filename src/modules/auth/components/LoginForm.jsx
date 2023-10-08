import { Button, Card, Form, Input, Row } from "antd";
import PropTypes from "prop-types";
import logo from "../../../assets/voiAds_logo.svg";
import { AUTH_TEXT, TEXT } from "../../../localization/en";

function LoginForm({ onSubmit, isLoading }) {
  return (
    <div style={{ width: "300px", margin: "auto", height: "100%" }}>
      <Card>
        <img src={logo} alt="void-ads-logo" className="w-full h-20 m-auto" />
        <Form name="validate_other" layout="vertical" onFinish={onSubmit}>
          <Form.Item
            name="name"
            label={AUTH_TEXT.name}
            rules={[{ required: true, message: TEXT.required.is_required }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label={AUTH_TEXT.passWord}
            rules={[{ required: true, message: TEXT.required.is_required }]}
          >
            <Input.Password />
          </Form.Item>
          <Row className="justify-center">
            <Button
              type="primary"
              className="bg-primary"
              htmlType="submit"
              loading={isLoading}
            >
              {AUTH_TEXT.login}
            </Button>
          </Row>
        </Form>
      </Card>
    </div>
  );
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

export default LoginForm;
