import 'antd/dist/antd.css';
import React, { useState, Component } from 'react';
// import OrderImg from './img/buyButton.png';
// import salesPage from './img/sellButton.png';
import { BrowserRouter as Redirect, Link } from 'react-router-dom';
// import firebase, { auth, provider } from './firebase.js';
import firebase from './firebase.js';
import { Space, Card, Layout, Menu, Breadcrumb, Select, Button, DatePicker, Row, Divider, List, Collapse, Col, Avatar, Drawer } from 'antd';
// import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
// import { getKeyThenIncreaseKey } from 'antd/lib/message';
import moment from 'moment';
const { Meta } = Card;
const db = firebase.firestore();
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
            selectDrawer: -1
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

    showDrawer = (e) => {
        console.log(e)
        this.setState({
            visible: true,
            selectDrawer: e
        });
    };

    onChange = async (date, dateString) => {
        console.log(date, dateString);
        let wholedata = []
        await db.collection('order').where("date", "==", dateString).get()
            .then((res) => {
                res.forEach(doc => {
                    var temp = [];
                    temp.push(doc.id)
                    temp.push(doc.data())
                    wholedata.push(temp)
                });
                this.setState({ allData: wholedata })
            });
        console.log(this.state.allData)

    }

    onClose = () => {
        this.setState({
            visible: false,
        });
    }
    render() {
        const {allData} = this.state
        if (this.state.loginStatus !== true) {
            console.log('check')
            this.props.history.push("/")
        }
        const listOfItem = <div> <List
            dataSource={this.state.allData}
            bordered
            renderItem={item => (

                <List.Item
                    key={item.id}
                    actions={[
                        <a onClick={()=>this.showDrawer(item[0])} key={`a-${item[0].id}`}>
                            View
          </a>,
                    ]}
                >
                    <List.Item.Meta
                        avatar={
                            <Avatar src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
                        }
                        title={<a href="https://ant.design/index-cn">{item[0]}</a>}
                        description={item[1].total}
                    />
                </List.Item>
            )}
        />   <Drawer
            width={640}
            placement="right"
            closable={false}
            onClose={this.onClose}
            visible={this.state.visible}
        >
                <p className="site-description-item-profile-p" style={{ marginBottom: 24 }}>
                    Orderlist Number
</p>
                <p className="site-description-item-profile-p">{this.state.selectDrawer!=-1 ?
                 allData[allData.findIndex(x => x[0] === this.state.selectDrawer)][0]: ""}</p>

                <Divider />
                <p className="site-description-item-profile-p">{this.state.selectDrawer!=-1 ?
                 allData[allData.findIndex(x => x[0] === this.state.selectDrawer)][1].menuName.forEach((element,index)=> console.log(allData[allData.findIndex(x => x[0] === this.state.selectDrawer)][1].menuQuantity[index])): ""}</p>
                <Row>
                    <Col span={12}>
                        <DescriptionItem title="Chocolate" content="Latte" />
                    </Col>
                </Row>
                <Divider />
                <p className="site-description-item-profile-p">Total</p>
                <Row>
                    <Col span={24}>
                        <DescriptionItem
                            title={this.state.selectDrawer!=-1 ? this.state.allData[this.state.allData.findIndex(x => x[0] === this.state.selectDrawer)][1].total : ""}
                            // content={
                            //     <a href="http://github.com/ant-design/ant-design/">
                            //         github.com/ant-design/ant-design/ </a>
                            // }
                        />
                    </Col>
                </Row>
            </Drawer> </div>
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
                    <div>{listOfItem}</div>
                </Content>
                <Footer style={{ textAlign: 'center', position: 'fixed', left: 0, bottom: 0, width: "100%" }}>Cafe of Carefa</Footer>
            </Layout>
        );
    }
}
export default SalesPage;