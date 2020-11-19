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
                    <Button style={{fontSize:16,height:35}} type="primary">cashier: {this.state.name}</Button>,
                    {/*  */}
                    {/* <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['8']}>
                    </Menu> */}
                </Header>
                <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item> </Breadcrumb.Item>

                        
                    </Breadcrumb>
                    {/* <div className="site-layout-content">Content</div> */}
                </Content>
                {/* <Button type="primary" danger onClick={this.onLogout}> log out </Button> */}

                <Row gutter={[16, 16]} className="info">
                    <Col span={8}>
                        <div>
                            <h1>Information</h1>
                            <h2> Name: {this.state.name} </h2>
                            <h2> Role: {this.state.role}</h2>
                        </div>
                    </Col>
                    <Col span={16}>

                        <div className="menuHome">
                            <h1>Menu</h1>
                            <Link to={{
                                pathname: '/SalesPage',   
                            }}
                            > <img src={salesPage} className="center" /><span>Order History</span></Link>
                            <Link to={{
                                pathname: '/OrderPage',
                            }}> <img src={OrderImg} className="center" /><span>Ordering</span></Link>
                        </div>

                    </Col>
                </Row>
            </Layout>

        );
    }
}
export default homePage;