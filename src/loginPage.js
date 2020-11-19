import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './css/loginPage.css';
import firebase from './firebase.js';
import { Form, Input, Button, Checkbox, Card } from 'antd';
import { Redirect } from 'react-router-dom';
const db = firebase.firestore();

const onFinish = (values) => {
  // let user = [];
  // let password = [];
  // let login = [];
  // console.log('username:', values.username);
  // console.log('password:', values.password);
  // db.collection('user').get().then(function (querySnapshot) {
  //   querySnapshot.forEach(function (doc) {
  //     console.log(doc.id, " => ", doc.data().username);
  //     console.log(doc.id, " => ", doc.data().password);
  //     user.push(doc.data().username);
  //     password.push(doc.data().password);
  //   });
  // }).then
  // var i;
  // for (i = 0; user.length; i++) {
  //   if (values.username == user[i]) {
  //     if (values.password == password[i]) {
  //       login.push(values.username)
  //       login.push(values.password)

  //     }
  //   }
  // }
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
    }
  }
  componentWillMount() {
    const loginStatus = localStorage.getItem('loginStatus') === 'true';
    const name = loginStatus ? localStorage.getItem('name') : '';
    const role = loginStatus ? localStorage.getItem('role') : '';
    this.setState({loginStatus,name,role}); 
    console.log(loginStatus)
}


  onFinish = async (values) => {
    let id = [];
    let name = "";
    let role ="";
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
        status = 1
      });
    });

    if (status === 1) {
      localStorage.setItem('loginStatus', true);
      localStorage.setItem('name',name);
      localStorage.setItem('role',role);
      this.setState({ loginStatus: true })
    }


  };

  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
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
        <Card title="Coffee Shop" style={{ width: 500 }} class="body">
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
