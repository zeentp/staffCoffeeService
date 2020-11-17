import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './css/loginPage.css';
import firebase from './firebase.js';
import { Form, Input, Button, Checkbox, Card } from 'antd';
import { Redirect } from 'react-router-dom';
const db = firebase.firestore();


class loginPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      loginStatus: false,
      username: "",
      id: "",

    }
  }

  onFinish = async (values) => {
    let id = [];
    var status = 0;
    console.log('Success:', values);
    console.log('username:', values.username);
    console.log('password:', values.password);
    await db.collection('user').where("username", "==", values.username).where("password", "==", values.password).get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        console.log(doc.id, " => ", doc.data().username);
        console.log(doc.id, " => ", doc.data().password);
        id.push(doc.id);
        status = 1
      });
    });

    if (status === 1) {
      this.setState({ username: values.username, id: id[0] })
      this.setState({ loginStatus: true })
    }


  };

  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  onSubmit = () => {

  }
  render() {
    if (this.state.loginStatus) {
      return <Redirect to={{
        pathname: '/HomePage',
        state: { username: this.state.username , id : this.state.id}
      }} />
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
