import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './css/OrderPage.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import firebase, { auth, provider } from './firebase.js';
import { Statistic, Button, Card, Modal, Layout, Breadcrumb, Table, Tabs, Row, Col, Divider, message, Radio, Menu } from 'antd';
import { MinusOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { getKeyThenIncreaseKey } from 'antd/lib/message';
import Bgimg from './css/bgg.jpg';

import FinishPage from './FinishPage';
const { Meta } = Card;
const { TabPane } = Tabs;
const { Header, Content, Footer } = Layout;
const db = firebase.firestore();

class OrderPage extends React.Component {


    state = {
        allData: [],
        orders: [],
        total: 0,
        totalWithVat: 0,
        vat: 0,
        types: "",
        columns: [
            {
                textWrap: 'word-break',
                title: 'Description',
                dataIndex: 'description',
                width: 120,
            },
            {
                title: 'Type',
                dataIndex: 'type',
                key: 'type',
                width: 80,
            },
            {
                title: 'Units',
                dataIndex: 'unit',
                width: 10,
                align: 'center',
                render: (text, record) => (

                    <Button.Group>
                        <Button style={{ width: 27, height: 27 }} onClick={() => this.decline(record)} icon={<MinusOutlined />} />
                        {/* <div  style={{textAlign:"center",width:35}}value= /> */}
                        <a className="formatA" style={{ width: 35, textAlign: "center" }}>{this.state.orders[this.state.orders.findIndex(x => x.key == record.key && x.type == record.type)].quantity}</a>
                        <Button style={{ width: 27, height: 27 }} onClick={() => this.increase(record)} icon={<PlusOutlined />} />
                    </Button.Group>



                )
            },
            {
                title: 'Price',
                dataIndex: 'unitPrice',
                width: 62,
            },
            {
                title: 'Amount',
                dataIndex: 'amount',
                width: 80,
                render: (text, record) => (
                    <a>{(this.state.orders[this.state.orders.findIndex(x => x.key == record.key && x.type == record.type)].quantity * record.unitPrice).toLocaleString()}</a>

                )
            },
            {
                //  ellipsis: true,
                title: 'Delete',
                dataIndex: 'delete',
                width: 80,
                render: (text, record) => (
                    <DeleteOutlined onClick={() => this.handleDelete(record)} />
                )
            }

        ],
        loginStatus: false,
        name: "",
        role: "",
        date: "",
        orderId: "",
    };


    onChangeTotal = () => {
        const orders = [...this.state.orders]

        let total = 0;

        for (var i = 0; i < orders.length; i++) {
            total += orders[i].quantity * orders[i].unitPrice


            console.log(total)
        }
        this.setState({ total: total })

    }
    handleDelete = (record) => {
        console.log("record", record)
        const orders = [...this.state.orders];
        let x = this.state.total - parseInt(orders[orders.findIndex(x => x.key === record.key && x.type == record.type)].quantity * orders[orders.findIndex(x => x.key === record.key && x.type == record.type)].unitPrice)
        console.log(orders[orders.findIndex(x => x.key === record.key && x.type == record.type)].quantity)

        orders.splice(orders.findIndex(x => x.key === record.key && x.type == record.type), 1)
        this.setState({
            orders, total: x
        })
        console.log(this.state.orders);
    };

    componentDidMount() {
        let wholedata = [];
        db.collection('menu').get()
            .then((res) => {
                res.forEach(doc => {
                    var temp = [];
                    temp.push(doc.id)
                    temp.push(doc.data())
                    wholedata.push(temp)
                });
                this.setState({ allData: wholedata })
            })
    }
    componentWillMount() {
        const loginStatus = localStorage.getItem('loginStatus') === 'true';
        const name = loginStatus ? localStorage.getItem('name') : '';
        const role = loginStatus ? localStorage.getItem('role') : '';
        const orderId = loginStatus ? localStorage.getItem('orderId') : '';
        this.setState({ loginStatus, name, role, orderId });
        console.log(loginStatus)
    }

    onLogout = () => {
        localStorage.setItem('loginStatus', false);
        this.setState({ loginStatus: false })
    }

    increase = (record) => {
        let orders = [...this.state.orders];
        orders[orders.findIndex(x => x.key == record.key && x.type == record.type)].quantity = orders[orders.findIndex(x => x.key == record.key && x.type == record.type)].quantity + 1
        if (orders[orders.findIndex(x => x.key == record.key && x.type == record.type)].quantity > 100) {
            orders[orders.findIndex(x => x.key == record.key && x.type == record.type)].quantity = 100;
        }
        else {
            this.setState((state) => ({
                total: state.total + parseInt(record.unitPrice)
            }));
        }
        this.setState({ orders });

        console.log(this.state.orders)
    };

    onAccept = (id, name, type) => { //, type, value - price
        console.log('typ1', type)
        console.log('type2', this.state.types)
        // console.log('value', value)

    }
    selectType = (e, id, name, type) => {
        console.log('typ1', type)
        console.log('type2', e)
        this.setState({ types: e })
        if (this.state.orders.findIndex(x => x.key == id + e) == -1) {
            let data = {
                key: id + e,
                description: name,
                unitPrice: type[e],
                quantity: 1,
                type: e,
            }
            console.log(data)
            const list = this.state.orders.concat(data);
            this.setState({
                orders: list
            })
        }
        else if (this.state.orders[this.state.orders.findIndex(x => x.key == id + e)]) {
            console.log(id)
            console.log(this.state.orders[this.state.orders.findIndex(x => x.key == id + e)].quantity)
            let orders = [...this.state.orders];
            orders[orders.findIndex(x => x.key == id + e)].quantity = orders[orders.findIndex(x => x.key == id + e)].quantity + 1
            this.setState({ orders })
        }
        else {
            let data = {
                key: id + e,
                description: name,
                unitPrice: type[e],
                quantity: 1,
                type: e,
            }
            console.log(data)
            const list = this.state.orders.concat(data);
            this.setState({
                orders: list
            })

        }
        this.setState((state) => ({
            total: state.total + parseInt(type[e])
        }));

    }
    confirm = () => {
        // console.log(id)
        Modal.confirm({
            onOk: () => this.onSubmit(),
            title: 'Confirm',
            content: 'Are you sure ?',
            cancelText: 'NO',
            okText: 'YES',
        });
    }

    callback = (key) => {
        let wholedata = [];
        const min = 1000;
        const max = 9999;

        if (key == 'coffee' || key == "non-coffee") {
            db.collection('menu').where("category", "==", key).get()
                .then((res) => {
                    res.forEach(doc => {
                        var temp = [];
                        temp.push(doc.id)
                        temp.push(doc.data())
                        wholedata.push(temp)
                    });
                    this.setState({ allData: wholedata })
                })
        } else {
            db.collection('menu').get()
                .then((res) => {
                    res.forEach(doc => {
                        var temp = [];
                        temp.push(doc.id)
                        temp.push(doc.data())
                        wholedata.push(temp)
                    });
                    this.setState({ allData: wholedata })
                })

        }

    }
    onSubmit = () => {
        if (this.state.orders.length == 0) {
            message.warning('Please select your order')
        }
        else {
            let m = []
            let q = []
            let t = []

            const o_date = new Intl.DateTimeFormat;
            const f_date = (m_ca, m_it) => Object({ ...m_ca, [m_it.type]: m_it.value });
            const m_date = o_date.formatToParts().reduce(f_date, {});
            if (m_date.year == "2563") {
                m_date.year = "2020"
            }
            const a = m_date.year + '-' + m_date.month + '-' + m_date.day;
            const orders = [...this.state.orders]
            const time = new Date().toLocaleTimeString();
            const r = Math.floor(Math.random() * 9999) + 1000;
            const rand = String(r)
            console.log("a", rand)
            localStorage.setItem('orderId', rand);
            console.log('date', this.state.date)
            // let lst = "[]"
            for (var i = 0; i < orders.length; i++) {
                const key = orders[i].key
                const newkey = key.substring(0, 20);
                m.push(newkey)
                q.push(orders[i].quantity)
                t.push(orders[i].type)
                console.log(m)
            }

            db.collection('order').add({
                orderId: rand,
                menuName: m,
                menuQuantity: q,
                menuType: t,
                name: this.state.name,
                date: a,
                time: time,
                total: this.state.total,
                vat: (this.state.total / 1.07 * 0.07).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }),
                subTotal: (this.state.total / 1.07).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }),

            })
                .then(docRef => {
                    console.log("add success~")
                    this.props.history.push({
                        pathname: '/FinishPage',
                        // search: '?query=abc',
                        state: { detail: rand }
                    }) 
                })
            
        }
    }
    decline = (record) => {
        console.log('fd', record)
        let orders = [...this.state.orders];
        orders[orders.findIndex(x => x.key == record.key && x.type == record.type)].quantity = orders[orders.findIndex(x => x.key == record.key && x.type == record.type)].quantity - 1
        if (orders[orders.findIndex(x => x.key == record.key && x.type == record.type)].quantity < 1) {
            orders[orders.findIndex(x => x.key == record.key && x.type == record.type)].quantity = 1;
        }
        else {
            this.setState((state) => ({
                total: state.total - parseInt(record.unitPrice)
            }));
        }
        this.setState({ orders });

        console.log(this.state.orders)
    };
    render() {
        if (this.state.loginStatus !== true) {
            console.log('check')
            this.props.history.push("/")
        }
        const listOfItem = this.state.allData.map((item) => {
            var id = item[0]
            var name = item[1].name
            // var price = item[1].price
            var type = item[1].type
            var img = item[1].img
            var component = (
                <Col><Card
                    // <Col><Card onClick={() => this.selectType}
                    style={{
                        width: 220, height: 400
                        // height: 400,marginRight:150,
                    }}
                    hoverable={true}
                    cover={
                        <img
                            alt="example"
                            src={img}
                        />
                    }
                >

                <h1 style={{ textAlign: "center", color: "gray", fontFamily: "Comic Sans MS, cursive, sans-serif" }}>{name}</h1>
                    <Divider></Divider>
                    <Button type="primary" danger onClick={() => this.selectType("hot", id, name, type)} value="hot">hot: {type["hot"]}</Button>
                    <Button type="primary" onClick={() => this.selectType("iced", id, name, type)} value="iced">iced: {type["iced"]}</Button>


                </Card >
                </Col>

            )
            // return component
            return (<div> {component}</div>)
        })
        return (
            <div style={{ backgroundColor:"#23395d" }} >
                <Layout className="layout" style={{ fontFamily: "Kanit, sans-serif" }}>
                    <Header>
                    <div style={{fontSize:30,height:0, marginLeft: 1450, }}>Cashier: {this.state.name}</div>
                        <Button className="logout-button" type="primary" danger onClick={this.onLogout}> log out </Button>
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['2']} inlineIndent="24"
                            style={{ lineHeight: '64px', marginLeft: 40 }}

                        >
                            <Menu.Item key="1"><Link to='/MainPage'>Home</Link></Menu.Item>
                            {/* <Menu.Item key="3"><Link to='/CheckInInfoShow'>Menu</Link></Menu.Item> */}
                            <Menu.Item key="2"><Link to='/OrderPage'>Ordering</Link></Menu.Item>
                            <Menu.Item key="3"><Link to='/SalesPage'>OrderHistoring</Link></Menu.Item>
                            {/* <Menu.Item key="4"><Link to='/HistoryInfoShow'>Contact</Link></Menu.Item> */}

                        </Menu>
                    </Header>
                    <Content style={{ padding: '0 50px' }}>
    <Row className="site-layout-content" >
                            <Col span={13} className="listOrder">
                                <Row>
                                    <Tabs style={{ marginRight: 200 }} defaultActiveKey="1" onChange={this.callback} >
                                        <   TabPane tab="All" key="all"></TabPane>
                                        <TabPane tab="Coffee" key="coffee"></TabPane>
                                        <TabPane tab="Non-Coffee" key="non-coffee"></TabPane>
                                    </Tabs>
                                </Row>
                                <Row gutter={[32, 32]}>
                                    {listOfItem}
                                </Row>
                            </Col>
                            <Col className='listOrder'>
                                <Row>
                                    <Table style={{ marginLeft: 5 }} pagination={false} columns={this.state.columns} dataSource={this.state.orders} rowKey={record => record.key} />
                                </Row>
                                <Row>

                                </Row>
                            </Col>
                            <Col style={{ marginLeft: 5 }}>
                                <h1 className="listPrice">Subtotal: {(this.state.total / 1.07).toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                })}
                                </h1>

                                <h1 className="listPrice">Vat: {(this.state.total / 1.07 * 0.07).toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                })}
                                </h1>
                                <h1 className="listTotalPrice">Total: {this.state.total.toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                })}
                                </h1>
                                <Row><Button style={{ marginLeft: 10 }} type="primary" onClick={this.confirm}>Confirm</Button></Row>
                            </Col>
                        </Row>
                    </Content>
                        

                        <div style={{ background: '#fff', backgroundColor: "#23395d" }}> </div>
                    <Footer style={{ textAlign: 'center' }}>Orso Polare Coffee & Bistro</Footer>
                </Layout>
            </div>
        );
    }
}
export default OrderPage;