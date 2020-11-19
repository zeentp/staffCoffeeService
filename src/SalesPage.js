import 'antd/dist/antd.css';
import React, { useState, Component } from 'react';
// import OrderImg from './img/buyButton.png';
// import salesPage from './img/sellButton.png';
import { BrowserRouter as Redirect, Link } from 'react-router-dom';
// import firebase, { auth, provider } from './firebase.js';
import { Space, Card, Layout, Menu, Breadcrumb, Select, Button, DatePicker, Row, Divider, List, Collapse, Col, Avatar, Drawer } from 'antd';
// import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
// import { getKeyThenIncreaseKey } from 'antd/lib/message';
import moment from 'moment';
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


class SalesPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loginStatus: false,
            name: "",
            role: "",
            visible: false,
            dateForSearch: "",
            allData: [],
        }
    }
    componentDidMount() {
        // let wholedata = [];
        // db.collection('order').get()
        //     .then((res) => {
        //         res.forEach(doc => {
        //             var temp = [];
        //             temp.push(doc.id)
        //             temp.push(doc.data())
        //             wholedata.push(temp)

        //         });
        //         this.setState({ allData: wholedata })
        //     })
    }

    componentWillMount() {
        const loginStatus = localStorage.getItem('loginStatus') === 'true';
        const name = loginStatus ? localStorage.getItem('name') : '';
        const role = loginStatus ? localStorage.getItem('role') : '';
        this.setState({ loginStatus, name, role });
        console.log(loginStatus)

    }

    onLogout = () => {
        localStorage.setItem('loginStatus', false);
        this.setState({ loginStatus: false })
    }

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onChange = (date, dateString) => {
        console.log(date, dateString);
        let wholedata = []
        await db.collection('order').where("time", "==", dateString).get()
            .then((res) => {
                res.forEach(doc => {
                    var temp = [];
                    temp.push(doc.id)
                    temp.push(doc.data())
                    wholedata.push(temp)
                });
                this.setState({ allData: wholedata })
            });

    }

    onClose = () => {
        this.setState({
            visible: false,
        });
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
                    {/* <div className="user" /> */}
                    {/* <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['8']}>
                    </Menu> */}
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Space direction="vertical">
                        <DatePicker onChange={this.onChange} />
                    </Space>
                    




                </Content>
                <Footer style={{ textAlign: 'center', position: 'fixed', left: 0, bottom: 0, width: "100%" }}>Cafe of Carefa</Footer>
            </Layout>
        );
    }
}
export default SalesPage;