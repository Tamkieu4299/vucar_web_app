import {
  Avatar,
  Button,
  Col,
  Layout,
  Popconfirm,
  Popover,
  Row,
  Space,
  Typography,
} from "antd";
import PropTypes from "prop-types";
import { TEXT } from "../../localization/en";
import useLogout from "../../hooks/useLogout";
import { getLocalStorage } from "../../utils/storage";

const { Header } = Layout;
const { Title } = Typography;

function AppHeader({ title }) {
  const { logout } = useLogout();
  const user = getLocalStorage("tempUser");

  const userProfileContent = (
    <div>
      <Popconfirm placement="bottom" title={TEXT.confirm.confirm_logout}>
        <Space className="flex flex-col">
          <Typography className="text-lg">{user?.name}</Typography>
          <Button className="bg-primary text-white" onClick={logout}>
            {TEXT.button.logout}
          </Button>
        </Space>
      </Popconfirm>
    </div>
  );

  return (
    <Header style={{ backgroundColor: "#0F2F56", paddingInline: "16px" }}>
      <Row justify="space-between" align="middle">
        <Col>
          <Title className="text-left pt-2 m-0" style={{ color: "#fff" }}>
            {title}
          </Title>
        </Col>
        <Col style={{ textAlign: "right" }}>
          <Space size="large" style={{ alignItems: "start" }}>
            <Popover
              placement="left"
              content={userProfileContent}
              trigger="click"
            >
              <Space size="small">
                <Avatar
                  size={42}
                  style={{
                    color: "#f56a00",
                    backgroundColor: "#fde3cf",
                    marginBottom: "11px",
                  }}
                >
                  {user?.name?.charAt(0)?.toUpperCase()}
                </Avatar>
              </Space>
            </Popover>
          </Space>
        </Col>
      </Row>
    </Header>
  );
}

AppHeader.propTypes = {
  title: PropTypes.string,
};

export default AppHeader;
