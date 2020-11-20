import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './css/loginPage.css';
import firebase from './firebase.js';
import { Form, Input, Button, Checkbox, Card,message,Space } from 'antd';
import { Redirect } from 'react-router-dom';
import LogoImg from './img/Logo.png';

const db = firebase.firestore();
const success = () => {
  message.success('This is a success message');
};

const error = () => {
  message.error('This is an error message');
};

const warning = () => {
  message.warning('This is a warning message');
};
const onFinish = (values) => {
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
class loginPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      loginStatus: false,
      name: "",
      role: "",
      phone: ""
    }
  }
  componentWillMount() {
    const loginStatus = localStorage.getItem('loginStatus') === 'true';
    const name = loginStatus ? localStorage.getItem('name') : '';
    const role = loginStatus ? localStorage.getItem('role') : '';
    const phone = loginStatus ? localStorage.getItem('phone') : '';

    
    this.setState({loginStatus,name,role,phone}); 
    console.log(loginStatus)
}


  onFinish = async (values) => {
    let id = [];
    let name = "";
    let role ="";
    let phone = "";
    var status = 0;
    console.log('Success:', values);
    console.log('username:', values.username);
    console.log('password:', values.password);
    await db.collection('user').where("username", "==", values.username).where("password", "==", values.password).get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        console.log(doc.id, " => ", doc.data().username);
        console.log(doc.id, " => ", doc.data().password);
        id.push(doc.id);
        name = doc.data().name 
        role = doc.data().role
        phone = doc.data().phone
        status = 1
      });
    });

    if (status === 1) {
      localStorage.setItem('loginStatus', true);
      localStorage.setItem('name',name);
      localStorage.setItem('role',role);
      localStorage.setItem('phone',phone);
      this.setState({ loginStatus: true })
      
    }
    if (status===0) {
      return (message.error('Your username or password may be incorrect!'))
    }


  };

  onFinishFailed = (errorInfo) => {
    message.warning('Please input your username or password!');
  };

  onSubmit = () => {

  }
  render() {
    // if (this.state.loginStatus) {  // ส่งค่า
    //   return <Redirect to={{      //
    //     pathname: '/HomePage',   // ผ่าน path
    //     state: { name: this.state.name , role : this.state.role}
    //   }} />
    // }
    if (this.state.loginStatus === true) {
      console.log('check')
      this.props.history.push("/HomePage")
    }
 
    return (
      
      <div class="bg">
        <img src={LogoImg} id='logo'/>
        <Card title="Coffee Shop Manager" style={{ width: 500 }} class="body">
          <Form
            name="basic" initialValues={{ remember: true, }} onFinish={this.onFinish} onFinishFailed={this.onFinishFailed}>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item >
              <Button type="primary" htmlType="submit" onClick={this.onSubmit} >
                Submit
          </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}
export default loginPage;
