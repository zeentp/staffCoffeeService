import 'antd/dist/antd.css';
import React, { useState, Component } from 'react';
// import OrderImg from './img/buyButton.png';
// import salesPage from './img/sellButton.png';
import { BrowserRouter as Redirect, Link } from 'react-router-dom';
// import firebase, { auth, provider } from './firebase.js';
import firebase from './firebase.js';
import { Result, Button} from 'antd';

const db = firebase.firestore();


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
            selectDrawer: -1
        }
    }
    componentDidMount() {

    }

    componentWillMount() {
        const loginStatus = localStorage.getItem('loginStatus') === 'true';
        const name = loginStatus ? localStorage.getItem('name') : '';
        const role = loginStatus ? localStorage.getItem('role') : '';
        this.setState({ loginStatus, name, role });
        console.log(loginStatus)

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

        return (
            <Result
                status="success"
                title="Successfully Ordered"
                subTitle="Make coffee takes 3-5 minutes, please wait."
                extra={[
                    <Button type="primary" key="console" onClick={this.onSubmit}>
                       Go to Home
      </Button>,
                    <Button key="buy" onClick={this.onSubmit2}>Buy Again</Button>,
                ]}
            />

        );
    }
}
export default SalesPage;