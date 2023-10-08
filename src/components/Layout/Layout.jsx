import { Layout } from "antd";
import PropTypes from "prop-types";
import { useState } from "react";
import AppHeader from "../Layout/Header";
import LeftMenu from "./LeftMenu";

const { Sider } = Layout;

function AppLayout({ children, title }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        theme="light"
        className="custom-sider"
        collapsible
        collapsed={collapsed}
      >
        <LeftMenu collapsed={collapsed} setCollapsed={setCollapsed} />
      </Sider>
      <Layout>
        <AppHeader title={title} />
        <div
          className="p-3 relative"
          style={{ minHeight: `calc(100vh - 64px)` }}
        >
          {children}
        </div>
      </Layout>
    </Layout>
  );
}

AppLayout.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string,
};

export default AppLayout;
