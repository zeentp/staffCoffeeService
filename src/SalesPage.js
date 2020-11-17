import React, { Component } from 'react';
import 'antd/dist/antd.css';
import OrderImg from './img/buyButton.png';
import salesPage from './img/sellButton.png';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import firebase, { auth, provider } from './firebase.js';
import {PageHeader,Card } from 'antd';
const { Meta } = Card;
class OrderPage extends React.Component {
    state = {
        percent: 0,
        columns: [
            {
                title: 'description',
                dataIndex: 'name',
                width: 200,
            },
            {
                title: 'Type',
                dataIndex: 'type',
                width: 100,
            },
            {
                title: 'Units',
                dataIndex: 'unit',
                width: 100,
            },
            {
                title: 'Units Price',
                dataIndex: 'unitPrice',
                width: 100,
            },
            {
                title: 'Amount',
                dataIndex: 'amount',
                width: 100,
            }
        ],
    };
    
    render() {

        return (

            <div>
                <PageHeader
                    className="site-page-header"
                    onBack={(loginPage) => null}
                    title="Coffee Shop"
                    subTitle="Sales Page"

             >
                 <Card title="Information"
                                hoverable
                                style={{ width: 300 }}
                            //cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                            >
                                <Meta title="Username" description="kk"/>
                                <Meta title="Role" description="Admin" />
                            </Card>
                            
            </PageHeader>
            </div>
        );
    }
}
export default salesPage;