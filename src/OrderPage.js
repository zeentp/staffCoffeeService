import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './css/OrderPage.css';
import OrderImg from './img/buyButton.png';
import salesPage from './img/sellButton.png';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import firebase, { auth, provider } from './firebase.js';
import { Statistic, Button, Card, Modal, Layout, Menu, Breadcrumb, Table, Tabs, Row, Col, Divider } from 'antd';
import { MinusOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { getKeyThenIncreaseKey } from 'antd/lib/message';
const { Meta } = Card;
const { TabPane } = Tabs;
const { Header, Content, Footer } = Layout;
const db = firebase.firestore();

class OrderPage extends React.Component {
    state = {
        allData: [],
        orders: [],
        total: 0,
        columns: [
            {
                textWrap: 'word-break',
                title: 'description',
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
                width: 120,
                align: 'center',
                render: (text, record) => (

                    <Button.Group>
                        <Button style={{width:27,height:27}} onClick={() => this.decline(record)} icon={<MinusOutlined />} />
                        {/* <div  style={{textAlign:"center",width:35}}value= /> */}
                        <a className="formatA" style={{width:35,textAlign:"center"}}>{this.state.orders[this.state.orders.findIndex(x => x.key == record.key)].quantity}</a>
                        <Button style={{width:27,height:27}} onClick={() => this.increase(record)} icon={<PlusOutlined />} />
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
                    <a>{this.state.orders[this.state.orders.findIndex(x => x.key == record.key)].quantity * record.unitPrice}</a>

                )
            },
            {
                //  ellipsis: true,
                title: 'Delete',
                dataIndex: 'delete',
                width:80,
                render: (text, record) => (
                    <DeleteOutlined onClick={() => this.handleDelete(record.key)} />
                )
            }

        ],
        loginStatus: false,
        name: "",
        role: "",
        date: "",
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
    handleDelete = (key) => {
        const orders = [...this.state.orders];
        
        this.setState((state) => ({
            total: state.total - parseInt(orders[orders.findIndex(x=>x.key === key)].quantity*orders[orders.findIndex(x=>x.key === key)].unitPrice)
        }));
        this.setState({
            orders: orders.filter((item) => item.key !== key),
        });
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
        this.setState({ loginStatus, name, role });
        console.log(loginStatus)
    }

    onLogout = () => {
        localStorage.setItem('loginStatus', false);
        this.setState({ loginStatus: false })
    }

    increase = (record) => {
        let orders = [...this.state.orders];
        orders[orders.findIndex(x => x.key == record.key)].quantity = orders[orders.findIndex(x => x.key == record.key)].quantity + 1
        if (orders[orders.findIndex(x => x.key == record.key)].quantity > 100) {
            orders[orders.findIndex(x => x.key == record.key)].quantity = 100;
        }
        else {
            this.setState((state) => ({
                total: state.total + parseInt(record.unitPrice)
            }));
        }
        this.setState({ orders });

        console.log(this.state.orders)
    };

    onAccept = (id, name, price, type) => {
        if (this.state.orders.findIndex(x => x.key == id) == -1) {
            let data = {
                key: id,
                description: name,
                unitPrice: price,
                quantity: 1,
                type: type,
            }

            const list = this.state.orders.concat(data);
            this.setState({
                orders: list
            })
        }
        else {
            console.log(id)
            console.log(this.state.orders[this.state.orders.findIndex(x => x.key == id)].quantity)
            let orders = [...this.state.orders];
            orders[orders.findIndex(x => x.key == id)].quantity = orders[orders.findIndex(x => x.key == id)].quantity + 1
            this.setState({ orders })
        }
        this.setState((state) => ({
            total: state.total + parseInt(price)
        }));
    }
    confirm = (id, name, price, type) => {
        // console.log(id)
        Modal.confirm({
            onOk: () => this.onAccept(id, name, price, type),
            title: 'Confirm',
            content: 'Are you sure ?',
            cancelText: 'NO',
            okText: 'YES',
        });
    }
    callback = (key) => {
        let wholedata = [];
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
        let m = []
        let q = []
        const o_date = new Intl.DateTimeFormat;
        const f_date = (m_ca, m_it) => Object({ ...m_ca, [m_it.type]: m_it.value });
        const m_date = o_date.formatToParts().reduce(f_date, {});
        const a = m_date.year + '-' + m_date.month + '-' + m_date.day;
        const orders = [...this.state.orders]
        const time = new Date().toLocaleTimeString();
        console.log('date', this.state.date)
        // let lst = "[]"
        for (var i = 0; i < orders.length; i++) {
            m.push(orders[i].key)
            q.push(orders[i].quantity)
            console.log(m)
        }

        db.collection('order').add({
            menuName: m,
            menuQuantity : q,
            name: this.state.name,
            date: a,
            time: time,
            total: this.state.total
        })
            .then(docRef => {
                console.log("add success~")
            })

    }
    decline = (record) => {
        let orders = [...this.state.orders];
        orders[orders.findIndex(x => x.key == record.key)].quantity = orders[orders.findIndex(x => x.key == record.key)].quantity - 1
        if (orders[orders.findIndex(x => x.key == record.key)].quantity < 1) {
            orders[orders.findIndex(x => x.key == record.key)].quantity = 1;
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
            var price = item[1].price
            var type = item[1].type
            var img = item[1].img
            var component = (
                <Col><Card onClick={() => this.confirm(id, name, price, type)}
                    style={{ width: 200
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
                     <Card 
                    //  style={{textAlign:"left",width:174,height:125}} 
                     title={name} bordered={false}>
                         <h1 className="formatB">
         price: {price}<br />
         type: {type}
         </h1>
        </Card>
                </Card></Col>

            )
            // return component
            return (<div> {component}</div>)
        })
        return (

            <Layout className="layout">
                <Header>
                    <Button className="logout-button" type="primary" danger onClick={this.onLogout}> log out </Button>
                    <Button style={{fontSize:16,height:35}} type="primary">cashier: {this.state.name}</Button>,
                    {/* <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['8']}>
                    </Menu> */}
                    {/* this.state.name */}
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
                        <Breadcrumb.Item>Order</Breadcrumb.Item>
                    </Breadcrumb>
                    </Breadcrumb>
                    {/* <div className="site-layout-content">Content</div> */}
                    <Row className="site-layout-content">
                        
                        <Col span={13} style={{ backgroundColor: "rgb(255, 255, 255, 0.3)" }} >
                            <Row>
                                <Tabs style={{marginRight:200}} defaultActiveKey="1" onChange={this.callback} >
                                <   TabPane tab="All" key="all"></TabPane>
                                    <TabPane tab="Coffee" key="coffee"></TabPane>
                                    <TabPane tab="Non-Coffee" key="non-coffee"></TabPane>
                                </Tabs>
                            </Row>
                            <Row gutter={[32, 32]}>
                                {listOfItem}
                            </Row>
                        </Col>
                        <Col span={10}>
                            <Row>
                                <Table pagination={false}  className="" columns={this.state.columns} dataSource={this.state.orders} rowKey={record => record.key} />
                            </Row>
                            <Row> <Divider>Total</Divider>
                                <Row>
                                    
                                    {/* <Col>สรุปยอดเงิน</Col> */}
                                    <Col><Row><Statistic style={{marginLeft:490}} value={this.state.total} /></Row></Col>
                                    <Row><Button style={{marginLeft:248}} type="primary" onClick={this.onSubmit}>Confirm</Button></Row>
                                </Row> </Row>
                        </Col>
                    </Row>

                </Content>
                <Footer style={{ textAlign: 'center', position: 'fixed', left: 0, bottom: 0, width: "100%" }}></Footer>
            </Layout>
        );
    }
}
export default OrderPage;