import React, { Component } from 'react';
import { Layout, Menu, Button } from 'antd';
import { Link } from 'react-router-dom';
import '../css/Main.css';
import Bgimg from '../css/bgg.jpg';
import LogoImg from '../img/Logo.png';
const { Header, Content, Footer } = Layout;

class MainPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loginStatus: false,
            name:"",
            role:"",
            phone:""
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

    onLogout = () => {
        localStorage.setItem('loginStatus', false);
        this.setState({ loginStatus: false })
    }

    render() {
        if (this.state.loginStatus !== true) {
            console.log('check')
            this.props.history.push("/")
        }
        return (
            <div >
                <Layout className="layout" style={{ fontFamily: "Kanit, sans-serif" }}>
                    <Header>
                        <div style={{fontSize:20,height:0, marginLeft: 1200,color:"grey" }}>Cashier: {this.state.name}</div>
                        <Button className="logout-button" type="primary" danger onClick={this.onLogout}> log out </Button>
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['1']} inlineIndent="24"
                            style={{ lineHeight: '64px' , marginLeft: 40}}

                        >
                            <Menu.Item key="1"><Link to='/MainPage'>Home</Link></Menu.Item>
                            {/* <Menu.Item key="3"><Link to='/CheckInInfoShow'>Menu</Link></Menu.Item> */}
                            <Menu.Item key="2"><Link to='/OrderPage'>Ordering</Link></Menu.Item>
                            <Menu.Item key="3"><Link to='/SalesPage'>OrderHistory</Link></Menu.Item>
                            {/* <Menu.Item key="4"><Link to='/HistoryInfoShow'>Contact</Link></Menu.Item> */}

                        </Menu>
                    </Header>
                    <Content class="bg"> 
                    <img src={LogoImg} class="logo"/>
                    </Content>
                       
                            {/* <img src={Bgimg} id='setimg' /> */}
                            
                        <div style={{ background: '#fff', backgroundColor : "#23395d" }}> </div>
                    
                    <Footer style={{ textAlign: 'center' }}>Orso Polare Coffee & Bistro</Footer>
                </Layout>
            </div>
        )
    }
}

export default MainPage