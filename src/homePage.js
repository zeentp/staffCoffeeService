import React, { Component } from 'react';
import 'antd/dist/antd.css';
import OrderImg from './img/buyButton.png';
import salesPage from './img/sellButton.png';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import firebase, { auth, provider } from './firebase.js';
import { Row, Col, Form, Input, Button, Checkbox, Card } from 'antd';
const { Meta } = Card;
class homePage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            userr: "",

        }
    }
    
    render() {
        return (
            <div>
                <Row gutter={[16, 16]}>
                    <Col span={8}>
                        <Card
                            hoverable
                            style={{ width: 240 }}
                            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                        >
                            <Meta title="Europe Street beat" description="www.instagram.com" />
                        </Card>,
                    </Col>
                    <Col span={16}>
                        <Row>
                        <Link to="/SalesPage"><img src={salesPage} /></Link>
                        <Link to="/OrderPage"><img src={OrderImg} /></Link> 
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}
export default homePage;