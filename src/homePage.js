import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './css/loginPage.css';
import OrderImg from './img/buyButton.png';
import salesPage from './img/sellButton.png';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import firebase, { auth, provider } from './firebase.js';
import { Row, Col, Card, PageHeader } from 'antd';
const { Meta } = Card;
class homePage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            userr: "",

        }
    }
    // db.collection("menu").doc("latte").set({
    //     price: "Los 70",
    //     type: "ice"
    // })
    render() {
        return (
            <div class='body'>
                <PageHeader
                    className="site-page-header"
                    onBack={(loginPage) => null}
                    title="Coffee Shop"
                    subTitle="hello"
                >

                    <Row gutter={[16, 16]}>



                        <Col span={8}>
                            <div className="center">
                            <Card title="Information" 
                                hoverable
                                style={{ width: 300 }}
                            //cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                            >
                                <Meta title="Username" description="www.instagram.com" />
                                <Meta title="Role" description="www.instagram.com" />
                            </Card>
                            </div>
                    </Col>
                        <Col span={16} className="center">
                                <Col >
                                <Link to="/SalesPage" ><img src={salesPage} /></Link>
                                </Col>
                                <Col>
                                <Link to="/OrderPage"><img src={OrderImg} /></Link>
                                </Col>
                        </Col>
                    </Row>
                </PageHeader>

            </div>
        );
    }
}
export default homePage;