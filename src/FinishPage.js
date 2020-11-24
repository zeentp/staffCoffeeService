import 'antd/dist/antd.css';
import React, { useState, Component } from 'react';
// import OrderImg from './img/buyButton.png';
// import salesPage from './img/sellButton.png';
import { BrowserRouter as Redirect, Link } from 'react-router-dom';
// import firebase, { auth, provider } from './firebase.js';
import firebase from './firebase.js';
import { Result, Button, Card, Divider, Drawer, Table, Col, Row } from 'antd';

const db = firebase.firestore();
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
    },
    {
        title: 'Type',
        dataIndex: 'type',
    }
];

class FinishPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loginStatus: false,
            orderId: "",
            name: "",
            role: "",
            visible: false,
            dateForSearch: "",
            allData: [],
            allMenu:[],
            selectDrawer: -1,
            tableData: []
        }
    }
    
    componentDidMount() {
        const wholedata2 = []
        const wholedata = []
  
        db.collection('menu').get()
        .then((res) => {
            res.forEach(doc => {
                var temp = [];
                temp.push(doc.id)
                temp.push(doc.data())
                // console.log(doc.data())
                wholedata2.push(temp)
            });
            this.setState({ allMenu: wholedata2 })
            console.log('allmenu',this.state.allMenu)
        })  
        console.log('order',this.state.orderId)
        let str = this.state.orderId
        db.collection('order').where("orderId", "==", str).get()
        .then((res) => {
            res.forEach(doc => {
                var temp = [];
                temp.push(doc.id)
                temp.push(doc.data())
                // console.log(doc.data())
                wholedata.push(temp)
            });
            this.setState({ allData: wholedata,  })
            console.log('all',this.state.allData)
            let tempName = []
            let tempQuantity = []
            let tempAmount = []
            let tempType = []
            let tempPrice = []
            var pluginArrayArg = new Array();
            const {allData,allMenu} = this.state
            console.log('all',this.state.allData)
            const lstMenuId = allData[0][1]
            console.log('menuName',lstMenuId.menuName[0])
            for (var i = 0; i < lstMenuId.menuName.length ; i++) {
                console.log('d3')
                console.log('menuName',lstMenuId.menuName[i])
                tempName.push(allMenu[allMenu.findIndex(x => x[0] === lstMenuId.menuName[i])][1].name)
                tempType.push(lstMenuId.menuType[i])
                const t = lstMenuId.menuType[i]
                console.log('xx',allMenu[allMenu.findIndex(x => x[0] === lstMenuId.menuName[i])][1].type)
                tempPrice.push(allMenu[allMenu.findIndex(x => x[0] === lstMenuId.menuName[i])][1].type[t])
                tempQuantity.push(lstMenuId.menuQuantity[i])
                 tempAmount.push(parseInt(tempPrice[i] *tempQuantity[i]))
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

        });
       
       
        
    }

    componentWillMount() {
        const loginStatus = localStorage.getItem('loginStatus') === 'true';
        const name = loginStatus ? localStorage.getItem('name') : '';
        const role = loginStatus ? localStorage.getItem('role') : '';
        const orderId = loginStatus ? localStorage.getItem('orderId') : '';
        this.setState({ loginStatus, name, role, orderId });
        console.log(loginStatus)
        console.log('orderId',orderId)

        

    }


    onSubmit = () => {
        window.location.href = "/HomePage"
    }
    onSubmit2 = () => {
        window.location.href = "/OrderPage"
    }

    render() {
        const { allData } = this.state
        if (this.state.loginStatus !== true) {
            console.log('check')
            this.props.history.push("/")
        }
      
        const listOfItem = this.state.allData.map((item)=>{
            var id = item[0]
            var name = item[1].name
            // var price = item[1].price
            // var type = item[1].type 
            
            var time = item[1].time
            var total = item[1].total
            var orderId = item[1].orderId
            var component = (
                <Card>

                <Divider>Order Number</Divider>

                <p className="site-description-item-profile-p" style={{ textAlign: "center" }}>{orderId}</p>

                <Divider />
                <Divider>Menu</Divider>
                <Row>
                    <Col span={24}>

                        <Table columns={columns}dataSource={this.state.tableData} pagination={false} size="small" />
                    </Col>
                </Row>
                <Divider />
                <Divider>Total</Divider>

                <p style={{ textAlign: "center" }}>
                    {(total).toLocaleString()} </p>
                <Divider>Cashier</Divider>
                <p className="site-description-item-profile-p" style={{ textAlign: "center" }}>{name}</p>
                <Divider>Time</Divider>
                <p className="site-description-item-profile-p" style={{ textAlign: "center" }}>{time}</p>
                <Button type="primary" key="console" onClick={this.onSubmit}>
                    Go to Home
                </Button>
                <Button key="buy" onClick={this.onSubmit2}>Buy Again</Button>
            </Card >
            )
            return component

        })

        return (
           <div>{listOfItem}</div>

        );
    }
}
export default FinishPage;