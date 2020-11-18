// import React, { Component }from 'react';
import 'antd/dist/antd.css';
import React, { useState } from 'react';
// import OrderImg from './img/buyButton.png';
// import salesPage from './img/sellButton.png';
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
// import firebase, { auth, provider } from './firebase.js';
import { Space, Card, Layout, Menu, Breadcrumb, Select, TimePicker, DatePicker, Row, Divider, List, Collapse, Col, Avatar, Drawer } from 'antd';
// import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
// import { getKeyThenIncreaseKey } from 'antd/lib/message';
const { Meta } = Card;
const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
        <p className="site-description-item-profile-p-label">{title}:</p>
        {content}
    </div>
);
const { Header, Content, Footer } = Layout;
const style = { background: '#0092ff', padding: '8px 0' };
const { Panel } = Collapse;

function callback(key) {
    console.log(key);
}
const data = [
    {
        key: 0,
        name: '2018-02-11',
        amount: 120,
        type: 'hot',
        note: 'transfer',
    },
    {
        key: 1,
        name: '2018-03-11',
        amount: 243,
        type: 'hot',
        note: 'transfer',
    },
    {
        key: 2,
        name: '2018-04-11',
        amount: 98,
        type: 'freppe',
        note: 'transfer',
    },
];

function onChange(date, dateString) {
    console.log(date, dateString);
}
class SalesPage extends React.Component {
    state = { visible: false };
    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    }
    render() {

        return (
            <Layout className="layout">
                <Header>
                    <div className="logo" />
                    <div className="user" />
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['8']}>
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Space direction="vertical">
                        <DatePicker onChange={onChange} />
                    </Space>
                    {/* <Collapse defaultActiveKey={['1']} onChange={callback}>
                        <Panel header="This is panel header 2" key="2"> */}
                            <List
                                dataSource={[
                                    {
                                        name: 'fang',
                                    },
                                    {
                                        name: 'Lily',
                                    },
                                ]}
                                bordered
                                renderItem={item => (
                                    <List.Item
                                        key={item.id}
                                        actions={[
                                            <a onClick={this.showDrawer} key={`a-${item.id}`}>
                                                Detail
                </a>,
                                        ]}
                                    >
                                        <List.Item.Meta
                                            avatar={
                                                <Avatar src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
                                            }
                                            title={<a href="https://ant.design/index-cn">{item.name}</a>}
                                            description="Progresser XTech"
                                        />
                                    </List.Item>
                                )}
                            />
                            <Drawer
                                width={640}
                                placement="right"
                                closable={false}
                                onClose={this.onClose}
                                visible={this.state.visible}
                            >
                                <p className="site-description-item-profile-p" style={{ marginBottom: 24 }}>
                                    User Profile
          </p>
                                <p className="site-description-item-profile-p">Personal</p>

                                <Divider />
                                <p className="site-description-item-profile-p">Company</p>
                                <Row>
                                    <Col span={12}>
                                        <DescriptionItem title="Position" content="Programmer" />
                                    </Col>
                                </Row>
                                <Divider />
                                <p className="site-description-item-profile-p">Contacts</p>
                                <Row>
                                    <Col span={24}>
                                        <DescriptionItem
                                            title="Github"
                                            content={
                                                <a href="http://github.com/ant-design/ant-design/">
                                                    github.com/ant-design/ant-design/
                  </a>
                                            }
                                        />
                                    </Col>
                                </Row>
                            </Drawer>
                </Content>
                <Footer style={{ textAlign: 'center', position: 'fixed', left: 0, bottom: 0, width: "100%" }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        );
    }
}
export default SalesPage;