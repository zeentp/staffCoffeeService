import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './css/loginPage.css';
import OrderImg from './img/buyButton.png';
import salesPage from './img/sellButton.png';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import firebase, { auth, provider } from './firebase.js';
import { Row, Col, Card, PageHeader, Button} from 'antd';
const { Meta } = Card;
const db = firebase.firestore();
class homePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          loginStatus: false,
    
        }
      }

    componentWillMount() {
        console.log('check2')
        if (typeof this.props.location.state !== 'undefined') {
            this.setState({ loginStatus: true })
        }
    }

    onLogout = () => {
        this.setState({ loginStatus: false })
    }

    render() {
        if (this.state.loginStatus !==true) {
            console.log('check')
            return <Redirect to={{
                pathname: '/',
            }} />
        }
        return (
            <div>
                <Button type="primary" danger onClick={this.onLogout}> log out </Button>
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
                                    <Meta title="Username" description="kk" />
                                    <Meta title="Role" description="Admin" />
                                </Card>
                            </div>
                        </Col>
                        <Col span={16}>

                            <Card title="Menu" className="body  ">
                                <Link to="/SalesPage" ><img src={salesPage} className="center" /></Link>
                                <Link to="/OrderPage"><img src={OrderImg} className="center" /></Link>
                            </Card>

                        </Col>
                    </Row>
                </PageHeader>

            </div>
        );
    }
}
export default homePage;