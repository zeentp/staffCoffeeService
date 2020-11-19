import 'antd/dist/antd.css';
import React, { useState, Component } from 'react';
// import OrderImg from './img/buyButton.png';
// import salesPage from './img/sellButton.png';
import { BrowserRouter as Redirect, Link } from 'react-router-dom';
// import firebase, { auth, provider } from './firebase.js';
import firebase from './firebase.js';
import { Space, Card, Layout, Menu, Breadcrumb, Select, Button, DatePicker, Row, Divider, List, Collapse, Col, Avatar, Drawer, Table } from 'antd';
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
const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Quantity',
        dataIndex: 'quantity',
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
    }
];
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
            selectDrawer: -1,
            allMenu: [],
            tableData: [],
            totalOfTheDay: 0
        }
    }
    componentDidMount() {
        let wholedata2 = [];
        let x = 0;
        const o_date = new Intl.DateTimeFormat;
        const f_date = (m_ca, m_it) => Object({ ...m_ca, [m_it.type]: m_it.value });
        const m_date = o_date.formatToParts().reduce(f_date, {});
        const a = m_date.year + '-' + m_date.month + '-' + m_date.day;
        db.collection('menu').get()
            .then((res) => {
                res.forEach(doc => {
                    var temp = [];
                    temp.push(doc.id)
                    temp.push(doc.data())

                    wholedata2.push(temp)
                });
                this.setState({ allMenu: wholedata2 })
            })
        this.setState({ allData: [], selectDrawer: -1 })
        let wholedata = []
        db.collection('order').where("date", "==", a).get()
            .then((res) => {
                res.forEach(doc => {
                    var temp = [];
                    temp.push(doc.id)
                    temp.push(doc.data())
                    x += parseInt(doc.data().total)
                    wholedata.push(temp)
                });
                this.setState({ allData: wholedata, totalOfTheDay: x })
            });
        console.log(this.state.allData)
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

    showDrawer = async (e) => {
        await this.setState({
            visible: true,
            selectDrawer: e
        });
        console.log(e)

        const { allData } = this.state
        const { allMenu } = this.state
        console.log(allData)
        let tempName = []
        let tempQuantity = []
        let tempAmount = []
        var pluginArrayArg = new Array();
        console.log('d1')
        if (this.state.selectDrawer != -1) {
            const lstMenuId = allData[allData.findIndex(x => x[0] === this.state.selectDrawer)][1].menuName
            console.log('d2')
            for (var i = 0; i < lstMenuId.length; i++) {
                console.log('d3')
                tempName.push(allMenu[allMenu.findIndex(x => x[0] === lstMenuId[i])][1].name)
                tempQuantity.push(allData[allData.findIndex(x => x[0] === this.state.selectDrawer)][1].menuQuantity[i])
                tempAmount.push(allMenu[allMenu.findIndex(x => x[0] === lstMenuId[i])][1].price * parseInt(tempQuantity[i]))
                console.log(allData[allData.findIndex(x => x[0] === this.state.selectDrawer)][1].name)

            }
            for (var i = 0; i < tempName.length; i++) {
                console.log('d3')
                var jsonArg1 = new Object();
                jsonArg1.name = tempName[i];
                jsonArg1.quantity = tempQuantity[i];
                jsonArg1.amount = tempAmount[i];

                pluginArrayArg.push(jsonArg1);
                console.log('plug', pluginArrayArg)
            }

            var jsonArray = JSON.parse(JSON.stringify(pluginArrayArg))
            this.setState({ tableData: jsonArray })
            console.log(jsonArray)
        }
    };

    onChange = async (date, dateString) => {
        this.setState({ allData: [], selectDrawer: -1 })
        let x = 0
        console.log(date, dateString);
        let wholedata = []
        await db.collection('order').where("date", "==", dateString).get()
            .then((res) => {
                res.forEach(doc => {
                    var temp = [];
                    temp.push(doc.id)
                    temp.push(doc.data())
                    wholedata.push(temp)
                    x += parseInt(doc.data().total)
                });
                this.setState({ allData: wholedata, totalOfTheDay: x })
            });
        console.log(this.state.allData)

    }

    onClose = () => {
        this.setState({
            visible: false,
        });
    }
    // ListMenu = ()=> {
    //     const {allData} = this.state
    //     allData[allData.findIndex(x => x[0] === this.state.selectDrawer)][1].menuName.forEach((element,index)=> console.log('xx',allData[allData.findIndex(x => x[0] === this.state.selectDrawer)][1].menuQuantity[index]))
    // }
    showData = () => {



    }
    render() {
        const { allData } = this.state
        const { allMenu } = this.state
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
                        <a onClick={() => this.showDrawer(item[0])} key={`a-${item[0].id}`}>
                            View
          </a>,
                    ]}
                >
                    <List.Item.Meta
                        avatar={
                            <Avatar src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
                        }
                        title={<a >{item[0]}</a>}
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
                <Divider>Orderlist Number</Divider>

                <p className="site-description-item-profile-p" style={{ textAlign: "center" }}>{this.state.selectDrawer != -1 ?
                    allData[allData.findIndex(x => x[0] === this.state.selectDrawer)][0] : ""}</p>

                <Divider />
                <Divider>Menu</Divider>
                <Row>
                    <Col span={24}>

                        <Table columns={columns} dataSource={this.state.tableData} pagination={false} size="small" />
                    </Col>
                </Row>
                <Divider />
                <Divider>Total</Divider>

                <p style={{ textAlign: "center" }}>
                    {this.state.selectDrawer != -1 ? this.state.allData[this.state.allData.findIndex(x => x[0] === this.state.selectDrawer)][1].total : ""}</p>



                <Divider>Cashier</Divider>
                <p className="site-description-item-profile-p" style={{ textAlign: "center" }}>{this.state.selectDrawer != -1 ?
                    allData[allData.findIndex(x => x[0] === this.state.selectDrawer)][1].name : ""}</p>

            </Drawer> </div>
        return (
            <Layout className="layout">
                <Header>

                    <Button className="logout-button" type="primary" danger onClick={this.onLogout}> log out </Button>
                    <Button style={{ fontSize: 16, height: 35 }} type="primary">cashier: {this.state.name}</Button>,
                    <div className="logo" />

                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Link to={{
                                pathname: '/HomePage',

                            }}><Breadcrumb.Item>Home</Breadcrumb.Item></Link>
                            <Link to={{
                                pathname: '/SalesPage',

                            }}
                            ><Breadcrumb.Item></Breadcrumb.Item></Link>
                            <Breadcrumb.Item>Total</Breadcrumb.Item>
                        </Breadcrumb>
                    </Breadcrumb>

                    <DatePicker onChange={this.onChange} />
                    <Divider orientation="right">รายได้จ้า (เปลี่ยนภาษาให้ด้วยน้า) {this.state.totalOfTheDay} baht.</Divider>



                    <div>{listOfItem}</div>
                </Content>
                <Footer style={{ textAlign: 'center', position: 'fixed', left: 0, bottom: 0, width: "100%" }}>Cafe of Carefa</Footer>
            </Layout>
        );
    }
}
export default SalesPage;