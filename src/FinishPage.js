import 'antd/dist/antd.css';
import React, { useState, Component } from 'react';
// import OrderImg from './img/buyButton.png';
// import salesPage from './img/sellButton.png';
import './css/OrderPage.css';
import { BrowserRouter as Redirect, Link } from 'react-router-dom';
// import firebase, { auth, provider } from './firebase.js';
import firebase from './firebase.js';
import { Result, Button, Card, Divider, Drawer, Table, Col, Row,Input, Tooltip,message } from 'antd';
function formatNumber(value) {
    value += '';
    const list = value.split('.');
    const prefix = list[0].charAt(0) === '-' ? '-' : '';
    let num = prefix ? list[0].slice(1) : list[0];
    let result = '';
    while (num.length > 3) {
       
      result = `,${num.slice(-3)}${result}`;
      num = num.slice(0, num.length - 3);
    }
    if (num) {
      result = num + result;
    }
    return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
  }
  
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
        title: 'Price',
        dataIndex: 'price',
    },
    {
        title: 'Type',
        dataIndex: 'type',
    },
    {
        title:'Amount',
        dataIndex:'amount',

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
            tableData: [],
            value: '',
            change:''
        }
    }
    onChange = value => {
        console.log(value)
        this.setState({ value });
      };

    
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
            this.setState({ allData: wholedata  })
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
    onSubmitNumber=(v,t) => {
        if(parseInt(v) <= 0){
            message.error('Money must be Positive');

        }
        else if(v - t < 0){
            message.error('Please Paid in full');

        }else{
           this.setState({ change: v - t})
            
        }
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
        window.location.href = "/MainPage"
    }
    onSubmit2 = () => {
        window.location.href = "/OrderPage"
    }
    onBlur = () => {
        const { value, onBlur, onChange } = this.props;
        let valueTemp = value;
        if (value.charAt(value.length - 1) === '.' || value === '-') {
          valueTemp = value.slice(0, -1);
        }
        onChange(valueTemp.replace(/0*(\d+)/, '$1'));
        if (onBlur) {
          onBlur();
        }
      };

    render() {
        const { allData } = this.state
        if (this.state.loginStatus !== true) {
            console.log('check')
            this.props.history.push("/")
        }
      
        const listOfItem = this.state.allData.map((item)=>{
            var id = item[0]
            var name = item[1].name
            var price = item[1].price
            // var type = item[1].type 
            var time = item[1].time
            var total = item[1].total
            var orderId = item[1].orderId
            var vat = item[1].vat
            var subTotal = item[1].subTotal
            var component = (
                <Card style={{width:500,marginLeft:650}} >

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
                <Divider>Vat(7%)</Divider>
                <p style={{ textAlign: "center" }}>
                    {(vat).toLocaleString()} </p>
                <Divider>Sub Total</Divider>
                <p style={{ textAlign: "center" }}>
                    {(subTotal).toLocaleString()} </p>
                <Divider>Total</Divider>
                <p style={{ textAlign: "center" }}>
                    {(total).toLocaleString()} </p>
                   
                <Divider>Cashier</Divider>
                <p className="site-description-item-profile-p" style={{ textAlign: "center" }}>{name}</p>
                <Divider>Time</Divider>
                <p className="site-description-item-profile-p" style={{ textAlign: "center" }}>{time}</p>
                
                <Row>  <h2 style={{fontSize:16}}>PAID</h2>  
                <NumericInput style={{ width: 120,marginLeft:100 }} value={this.state.value} onChange={this.onChange} /> 
                <Button onClick={()=>this.onSubmitNumber(this.state.value,total)}>submit</Button></Row>
              
                 <h2 style={{fontSize:16}}>Change</h2>
                <h2 style={{fontSize:20, marginLeft: 200}}>{(this.state.change).toLocaleString()}</h2>
                <Button style={{marginLeft:100,marginTop:15}} type="primary" key="console" onClick={this.onSubmit}>
                    Go to Home
                </Button>
                <Button key="buy" onClick={this.onSubmit2}>Buy Again</Button>
               
            </Card >
            )
            return component

        })

        return (
           <div style={{ backgroundColor:"#23395d", display: "flex" }}>{listOfItem}</div>

        );
    }
}
export default FinishPage;

class NumericInput extends React.Component {
    onChange = e => {
      const { value } = e.target;
      const reg = /^-?\d*(\.\d*)?$/;
      if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
        this.props.onChange(value);
      }
    };
  
    // '.' at the end or only '-' in the input box.
    onBlur = () => {
      const { value, onBlur, onChange } = this.props;
      let valueTemp = value;
      if (value.charAt(value.length - 1) === '.' || value === '-') {
        valueTemp = value.slice(0, -1);
      }
      onChange(valueTemp.replace(/0*(\d+)/, '$1'));
      if (onBlur) {
        onBlur();
      }
    };
  
    render() {
      const { value } = this.props;
      const title = value ? (
        <span className="numeric-input-title">{value !== '-' ? formatNumber(value) : '-'}</span>
      ) : (
        'Input a number'
      );
      return (
        <Tooltip
          trigger={['focus']}
          title={title}
          placement="topLeft"
          overlayClassName="numeric-input"
        >
          <Input
            {...this.props}
            onChange={this.onChange}
            onBlur={this.onBlur}
            placeholder="Input a number"
            maxLength={25}
          />
        </Tooltip>
      );
    }
  }