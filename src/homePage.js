import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './css/loginPage.css';
import OrderImg from './img/buyButton.png';
import salesPage from './img/sellButton.png';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import firebase, { auth, provider } from './firebase.js';
import { Row, Col, Card, PageHeader, Statistic, Button, Checkbox, Layout, Menu, Breadcrumb, Table } from 'antd';
const { Meta } = Card;
const db = firebase.firestore();
const { Header, Content, Footer } = Layout;
class homePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loginStatus: false,
            name:"",
            role:""
        }
    }

    componentWillMount() {
        const loginStatus = localStorage.getItem('loginStatus') === 'true';
        const name = loginStatus ? localStorage.getItem('name') : '';
        const role = loginStatus ? localStorage.getItem('role') : '';
        this.setState({loginStatus,name,role}); 
        console.log(loginStatus)
    }

    onLogout = () => {
        localStorage.setItem('loginStatus', false);
        this.setState({ loginStatus: false })
    }

    render() {
        if (this.state.loginStatus !== true) {
            console.log('check')
            this.props.history.push("/")
        }
        return (

            <Layout className="layout">
                <Header>
                    <Button className="logout-button" type="primary" danger onClick={this.onLogout}> log out </Button>
                    <div className="logo" />
                    {/*  */}
                    {/* <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['8']}>
                    </Menu> */}
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    {/* <div className="site-layout-content">Content</div> */}
                </Content>
                <Footer style={{ textAlign: 'center', position: 'fixed', left: 0, bottom: 0, width: "100%" }}>Ant Design ©2018 Created by Ant UED</Footer>
                {/* <Button type="primary" danger onClick={this.onLogout}> log out </Button> */}
                <PageHeader
                ></PageHeader>
                <Row gutter={[16, 16]}>
                    <Col span={8}>
                        <div className="info">
                            <Card title="Information" className="card" style={{width:300}}>
                                <h1> Name: {this.state.name} </h1>
                                <h1> Role: {this.state.role}</h1>
                            </Card>
                        </div>
                    </Col>
                    <Col span={16}>

                        <Card title="Menu" className="body">
                            <Link to={{
                                pathname: '/SalesPage',
                               
                            }}
                            > <img src={salesPage} className="center" /></Link>
                            <Link to={{
                                pathname: '/OrderPage',
                           
                            }}><img src={OrderImg} className="center" /></Link>
                        </Card>

                    </Col>
                </Row>
            </Layout>

        );
    }
}
export default homePage;