import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './css/loginPage.css';
import OrderImg from './img/buyButton.png';
import salesPage from './img/sellButton.png';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import firebase, { auth, provider } from './firebase.js';
import { Row, Col, Card, PageHeader } from 'antd';
const { Meta } = Card;
const db = firebase.firestore();
class homePage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            userr: "",

        }
    }

    render() {
        return (
            <div>
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
                
                                <Card title="Menu" className="body  ">
                                <Link to="/SalesPage" ><img src={salesPage} className="center"/></Link>
                                <Link to="/OrderPage"><img src={OrderImg} className="center"/></Link>
                                </Card>

                        </Col>
                    </Row>
                </PageHeader>

            </div>
        );
    }
}
export default homePage;