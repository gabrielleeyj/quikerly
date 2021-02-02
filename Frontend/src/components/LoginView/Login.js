import React from 'react';
import "antd/dist/antd.css";
import { Layout } from 'antd';

const Login = () => {

return (
        <>
            <Layout>
            <Header><div className="logo" /></Header>
            <Layout>
                <Sider>Sider</Sider>
                <Content>Login Details</Content>
            </Layout>
            <Footer>Footer</Footer>
            </Layout>
        </>
    );
};

export default Login;