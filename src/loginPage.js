import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './css/loginPage.css';
import firebase from './firebase.js';
import { Form, Input, Button, Checkbox, Card } from 'antd';
import { Link } from 'react-router-dom';
const db = firebase.firestore();
let user = [];
let password = [];
let login = [];
const onFinish = (values) => {
  console.log('Success:', values);
  console.log('username:', values.username);
  console.log('password:', values.password);
  db.collection('user').get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      console.log(doc.id, " => ", doc.data().username);
      console.log(doc.id, " => ", doc.data().password);
      user.push(doc.data().username);
      password.push(doc.data().password);
    });
  });
  var i;
  usernameDisplay = values.username;
  for (i = 0; user.length; i++) {
    if (values.username == user[i]) {
      if (values.password == password[i]) {
        login.push(values.username)
        login.push(values.password)

      }
    }
  }

};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

class loginPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],

    }
  }
  onSubmit = () => {
    this.setState({
      data: login,
    });
    <Link to={{ pathname: "/loginPage", data: data}} ></Link>
  }
  render() {
    return (
      <div class="bg">
        <Card title="Coffee Shop" style={{ width: 500 }} class="body">
          <Form
            name="basic" initialValues={{ remember: true, }} onFinish={onFinish} onFinishFailed={onFinishFailed}>
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
