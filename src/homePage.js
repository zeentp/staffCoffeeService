import React, { Component } from 'react';
import 'antd/dist/antd.css';
import OrderImg from './img/buyButton.png';
import salesPage from './img/sellButton.png';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import firebase, { auth, provider } from './firebase.js';
import { Row, Col, Form, Input, Button, Checkbox, Card } from 'antd';
const { Meta } = Card;
const db = firebase.firestore();
class homePage extends React.Component {
    componentDidMount() {
        console.log(this.props.name)
    }
    render() {
        return (
            <div>
                <Row gutter={[16, 16]}>
                    <Col span={8}>
                        <Card
                            hoverable
                            style={{ width: 240 }}

                        >
                            {this.state.name}
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