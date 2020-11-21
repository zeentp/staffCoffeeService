import 'antd/dist/antd.css';
import React, { useState, Component } from 'react';
// import OrderImg from './img/buyButton.png';
// import salesPage from './img/sellButton.png';
import { BrowserRouter as Redirect, Link } from 'react-router-dom';
// import firebase, { auth, provider } from './firebase.js';
import firebase from './firebase.js';
import { Space, Card, Layout, Menu, Breadcrumb, Select, Button, DatePicker, Row, Divider, List, Collapse, Col, Avatar, Drawer, Table, Statistic } from 'antd';
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
        title: 'Type',
        dataIndex: 'type',
    },
    {
        title: 'Price',
        dataIndex: 'price',
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
        if (m_date.year == "2563") {
            m_date.year = "2020"
        }
        const a = m_date.year + '-' + m_date.month + '-' + m_date.day;
        console.log(a)
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
        let tempType = []
        let tempPrice = []
        var pluginArrayArg = new Array();
        console.log('d1')
        if (this.state.selectDrawer != -1) {
            const lstMenuId = allData[allData.findIndex(x => x[0] === this.state.selectDrawer)][1].menuName
            console.log('d2')
            for (var i = 0; i < lstMenuId.length; i++) {
                console.log('d3')
                tempName.push(allMenu[allMenu.findIndex(x => x[0] === lstMenuId[i])][1].name)
                tempQuantity.push(allData[allData.findIndex(x => x[0] === this.state.selectDrawer)][1].menuQuantity[i])
                const t =allData[allData.findIndex(x => x[0] === this.state.selectDrawer)][1].menuType[i]
                // console.log('type',allMenu[allMenu.findIndex(x => x[0] === lstMenuId[i])][1].type[t]);
                tempAmount.push(allMenu[allMenu.findIndex(x => x[0] === lstMenuId[i])][1].type[t]* parseInt(tempQuantity[i]));
                // tempAmount.push(allMenu[allMenu.findIndex(x => x[0] === lstMenuId[i].type)][1].type * parseInt(tempQuantity[i]))
                tempType.push(allData[allData.findIndex(x => x[0] === this.state.selectDrawer)][1].menuType[i])
                tempPrice.push(allMenu[allMenu.findIndex(x => x[0] === lstMenuId[i])][1].type[t]);

                console.log(allData[allData.findIndex(x => x[0] === this.state.selectDrawer)][1].name)

            }
            for (var i = 0; i < tempName.length; i++) {
                console.log('d3')
                var jsonArg1 = new Object();
                jsonArg1.name = tempName[i];
                jsonArg1.quantity = tempQuantity[i];
                jsonArg1.amount = tempAmount[i];
                jsonArg1.type = tempType[i];
                jsonArg1.price = tempPrice[i];

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
        await db.collection("order").where("date", "==", dateString).get()
            .then((res) => {
                res.forEach(doc => {
                    var temp = [];
                    temp.push(doc.id)
                    temp.push(doc.data())
                    wholedata.push(temp)
                    console.log("doc", doc.data())
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
                            <Avatar src="data:image/png;base64,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" />
                        }
                        title={<a >Order ID : {item[1].orderId}</a>}
                        description={<h>price: {item[1].total} <br></br>time: {item[1].time}</h>}

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
                <Divider>Order Number</Divider>

                <p className="site-description-item-profile-p" style={{ textAlign: "center" }}>{this.state.selectDrawer != -1 ?
                    allData[allData.findIndex(x => x[0] === this.state.selectDrawer)][1].orderId : ""}</p>

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
                <Divider>Time</Divider>
                <p className="site-description-item-profile-p" style={{ textAlign: "center" }}>{this.state.selectDrawer != -1 ?
                    allData[allData.findIndex(x => x[0] === this.state.selectDrawer)][1].time : ""}</p>
            </Drawer> </div>
        return (
            <Layout className="layout">
                <Header>

                    <Button className="logout-button" type="primary" danger onClick={this.onLogout}> log out </Button>
                    <Button style={{ fontSize: 16, height: 35 }} type="primary">cashier: {this.state.name}</Button>,

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
                    <Divider orientation="right"><Statistic title="Total" value={this.state.totalOfTheDay}> </Statistic> </Divider>



                    <div>{listOfItem}</div>
                </Content>
                {/* <Footer style={{ color: "white", backgroundColor: " rgb(187, 187, 187)", textAlign: 'center', position: 'fixed', left: 0, bottom: 0, width: "100%" }}>Orso Polare Café</Footer> */}
            </Layout>
        );
    }
}
export default SalesPage;