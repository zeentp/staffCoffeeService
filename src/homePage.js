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
            role:"",
            phone:""
        }
    }

    componentWillMount() {
        const loginStatus = localStorage.getItem('loginStatus') === 'true';
        const name = loginStatus ? localStorage.getItem('name') : '';
        const role = loginStatus ? localStorage.getItem('role') : '';
        const phone = loginStatus ? localStorage.getItem('phone') : '';
        this.setState({loginStatus,name,role,phone}); 
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
                            <Card hoverable style={{width:350}}>
                            <h1>Information</h1>
                            <h2> Name: {this.state.name} </h2>
                            <h2> Tel: {this.state.phone}</h2>
                            </Card>
                        </div>
                    </Col>
                    <Col span={16}>
                        <div style={{width:900,height:700}} className="menuHome">
                            <h1 style={{marginTop:20}}>Menu</h1>
                            {/* <Button style={{marginLeft:200}} type="primary"> */}<Link to={{
                                pathname: '/OrderPage',
                            }}> <img src={OrderImg} className="center" /><span>Ordering</span></Link>
                            <Link to={{
                                pathname: '/SalesPage',   
                            }}
                            ><img src={salesPage} className="center" /><span>Order History</span></Link>
                            
                        </div>

                    </Col>
                </Row>
                <Footer style={{  color:"white",backgroundColor:" rgb(187, 187, 187)" ,textAlign: 'center', position: 'fixed', left: 0, bottom: 0, width: "100%" }}>Orso Polare Café</Footer>

            </Layout>

        );
    }
}
export default homePage;