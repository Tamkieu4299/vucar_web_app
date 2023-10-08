import { Divider, Menu } from "antd";
import PropTypes from "prop-types";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/voiAds_logo.svg";
import { privateRouteData } from "../../configs/route.config";

function LeftMenu({ setCollapsed }) {
  const location = useLocation();

  const index = privateRouteData.findIndex(
    (item) => item.path === location.pathname
  );

  return (
    <Menu
      theme="light"
      mode="inline"
      selectable
      className="left-menu"
      style={{ backgroundColor: "#fff" }}
      defaultSelectedKeys={[`${index}`]}
      tabIndex={[location.pathname]}
    >
      <div
        className="logo"
        style={{
          height: "64px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          alt="logo"
          src={logo}
          width="48px"
          height="48px"
          onClick={() => setCollapsed((pre) => !pre)}
        />
      </div>
      <Divider style={{ margin: "-1px 0 0 0" }} />
      {privateRouteData.map((item, index) => (
        <Menu.Item key={index} icon={item.icon}>
          <NavLink to={item.path} activeClassName="selected">
            {item.title}
          </NavLink>
        </Menu.Item>
      ))}
    </Menu>
  );
}

LeftMenu.propTypes = {
  setCollapsed: PropTypes.func.isRequired,
};

export default LeftMenu;
