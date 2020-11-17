import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './css/OrderPage.css';
import OrderImg from './img/buyButton.png';
import salesPage from './img/sellButton.png';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import firebase, { auth, provider } from './firebase.js';
import { Row, Col, Form, Input, Button, Checkbox, Card, Layout, Menu, Breadcrumb, Table } from 'antd';
const { Meta } = Card;
const { Header, Content, Footer } = Layout;
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
class OrderPage extends React.Component {
    state = {
        columns: [
            {
                title: 'description',
                dataIndex: 'name',
                width: 200,
            },
            {
                title: 'Type',
                dataIndex: 'type',
                width: 100,
            },
            {
                title: 'Units',
                dataIndex: 'unit',
                width: 100,
            },
            {
                title: 'Units Price',
                dataIndex: 'unitPrice',
                width: 100,
            },
            {
                title: 'Amount',
                dataIndex: 'amount',
                width: 100,
            }
        ],
    };
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
                    {/* <div className="site-layout-content">Content</div> */}
                    <Table pagination={false} className="table" columns={this.state.columns} dataSource={data} />
                    
                </Content>
                <Footer style={{ textAlign: 'center', position:'fixed', left: 0, bottom: 0, width: "100%"}}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        );
    }
}
export default OrderPage;