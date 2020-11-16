import React, { Component } from 'react';
import './css/loginPage.css';
import 'antd/dist/antd.css';
import firebase, { auth, provider } from './firebase.js';
import { Form, Input, Button, Checkbox } from 'antd';


const onFinish = (values) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

class loginPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      userr: "",

    }
  }
  render() {
    return (
      <div class="bg">
      <Form 
        name="basic" initialValues={{ remember: true,}}  onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Form.Item class=""
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
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      </div>
    );
  }
}
export default loginPage;