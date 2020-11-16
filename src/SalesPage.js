import React, { Component } from 'react';
import 'antd/dist/antd.css';
import OrderImg from './img/buyButton.png';
import salesPage from './img/sellButton.png';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import firebase, { auth, provider } from './firebase.js';
import { Row, Col, Form, Input, Button, Checkbox, Card } from 'antd';
const { Meta } = Card;
class SalesPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            userr: "",

        }
    }
    
    render() {
        return (
            <div>
             order
            </div>
        );
    }
}
export default SalesPage;