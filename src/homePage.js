import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './css/loginPage.css';
import OrderImg from './img/buyButton.png';
import salesPage from './img/sellButton.png';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import firebase, { auth, provider } from './firebase.js';
import { Row, Col, Card, PageHeader,Statistic, Button, Checkbox,Layout, Menu, Breadcrumb, Table} from 'antd';
const { Meta } = Card;
const db = firebase.firestore();
const { Header, Content, Footer } = Layout;
class homePage extends React.Component {
    componentDidMount() {
        console.log(this.props.name)
    }

    render() {
        return (
            <div>
                <Layout className="layout">
                <Header>
                    <div className="logo" />
                    <div className="user" />
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['8']}>
                    </Menu>

                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    {/* <div className="site-layout-content">Content</div> */}
                </Content>
                <Footer style={{ textAlign: 'center', position: 'fixed', left: 0, bottom: 0, width: "100%" }}>Ant Design ©2018 Created by Ant UED</Footer>
                <PageHeader
                    className="site-page-header"
                    onBack={(loginPage) => null}
                    title="Coffee Shop"
                    subTitle="Home Page"
                >
                    <Row gutter={[16, 16]}>



                        <Col span={8}>
                            <div>
                            <Card title="Information" className="card"
                                hoverable
                                style={{ width: 300 }}
                            //cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                            >
                                <Meta title="Username" description="kk"/>
                                <Meta title="Role" description="Admin" />
                            </Card>
                            </div>
                    </Col>
                        <Col span={16}>
                
                                <Card title="Menu" className="body">
                                <Link to="/SalesPage" ><img src={salesPage} className="center"/></Link>
                                <Link to="/OrderPage"><img src={OrderImg} className="center"/></Link>
                                </Card>

                        </Col>
                    </Row>
                </PageHeader>
                </Layout>

            </div>
        );
    }
}
export default homePage;