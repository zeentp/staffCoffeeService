import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col, Card, Collapse, Badge, Switch, Modal, Button, notification, Menu, message } from 'antd';
import "antd/dist/antd.css";
import { FrownOutlined, DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Scrollbars } from 'react-custom-scrollbars';
import monitorMS_Banner from './img/monitorMS_Banner.png'
import monitorMS_footer from './img/monitorMS_footer.png'
import { AxiosResponse, AxiosError } from 'axios'

const { Panel } = Collapse;

const Axios = () => {

  const [isToggled, setToggled] = useState(false);
  const [allMS_U, setU] = useState([]); const [allMS_S, setS] = useState([]);

  // mservice
  var devUpMS = [];
  var uatUpMS = [];
  var sitUpMS = [];
  var ptUpMS = [];
  var psUpMS = [];
  // entapi       
  var eapi_sitUp = [];
  var eapi_uatUp = [];
  var eapi_ptUp = [];
  var eapi_psUp = [];

  // mservice - UP
  const [devUpMS_, setDevUpMS_] = useState([]); const [uatUpMS_, setUatUpMS_] = useState([]);
  const [sitUpMS_, setSitUpMS_] = useState([]); const [ptUpMS_, setPtUpMS_] = useState([]);
  const [psUpMS_, setPsUpMS_] = useState([]);
  // entapi - UP
  const [eapi_sitUp_, setEapi_sitUp_] = useState([]); const [eapi_uatUp_, setEapi_uatUp_] = useState([]);
  const [eapi_ptUp_, setEapi_ptUp_] = useState([]); const [eapi_psUp_, setEapi_psUp_] = useState([]);


  useEffect(() => {

    // ---------------------  mservice ---------------------

    axios.get('/healthDev').then(dev => {
      const devMsData = dev.data.discoveryComposite.eureka.applications;
      message.success('Successful get data from DEV')
      // Get only started MS - Array format + check ms that have value = 0 (DOWN) [such as, EVENT-LISTENER-ESTM: 0] 
      Object.keys(devMsData).map(function (keyName, keyIndex) { if (devMsData[keyName] !== 0) { devUpMS.push(keyName.toUpperCase()); } })
      setDevUpMS_(devUpMS.sort());
    }).catch(error => {
      message.error('Can not get data from DEV');
      console.log(error.response)
    });
    axios.get('/healthUAT').then(uat => {
      const uatMsData = uat.data.discoveryComposite.eureka.applications;
      message.success('Successful get data from UAT')
      console.log("data from UAT\n" + JSON.stringify(uatMsData));
      Object.keys(uatMsData).map(function (keyName, keyIndex) { if (uatMsData[keyName] !== 0) { uatUpMS.push(keyName.toUpperCase()); } })
      Object.keys(uatMsData).map(function (keyName, keyIndex) { allMS_U.push(keyName.toUpperCase());  })
      setUatUpMS_(uatUpMS.sort());
      setU(allMS_U);
      console.log("U" + allMS_U.length)
    }).catch(error => {
      message.error('Can not get data from UAT');
      console.log(error.response)
    });

    axios.get('/healthSIT').then(sit => {
      const sitMsData = sit.data.discoveryComposite.eureka.applications;
      message.success('Successful get data from SIT')
      console.log("data from SIT\n" + JSON.stringify(sitMsData));
      Object.keys(sitMsData).map(function (keyName, keyIndex) { if (sitMsData[keyName] !== 0) { sitUpMS.push(keyName.toUpperCase());  } })
      Object.keys(sitMsData).map(function (keyName, keyIndex) { allMS_S.push(keyName.toUpperCase()); })
      // console.log("UP SIT\n" + sitUpMS);
      setSitUpMS_(sitUpMS.sort());
      setS(allMS_S)
      // console.log(allMS_S.length)
    }).catch(error => {
      message.error('Can not get data from SIT');
      console.log(error.response)
    });

    axios.get('/healthPT').then(pt => {
      const ptMsData = pt.data.discoveryComposite.eureka.applications;
      message.success('Successful get data from PT')
      // console.log("data from PT\n" + JSON.stringify(ptMsData));
      Object.keys(ptMsData).map(function (keyName, keyIndex) { if (ptMsData[keyName] !== 0) { ptUpMS.push(keyName.toUpperCase()); } })
      // console.log("UP PT\n" + ptUpMS);
      setPtUpMS_(ptUpMS.sort());
    }).catch(error => {
      message.error('Can not get data from PT');
      console.log(error.response)
    });

    axios.get('/healthPS').then(ps => {
      const psMsData = ps.data.discoveryComposite.eureka.applications;
      message.success('Successful get data from PS')
      // console.log("data from PS\n" + JSON.stringify(psMsData));
      Object.keys(psMsData).map(function (keyName, keyIndex) { if (psMsData[keyName] !== 0) { psUpMS.push(keyName.toUpperCase()); } })
      // console.log("UP PS\n" + psUpMS);
      setPsUpMS_(psUpMS.sort());
    }).catch(error => {
      message.error('Can not get data from PS');
      console.log(error.response)
    });

    // ---------------------  e-api ---------------------

    axios.get('/entapiSit').then(entapiSit => {
      const entapiSitData = entapiSit.data.discoveryComposite.eureka.applications;
      message.success('Successful get data from E-API SIT')
      // console.log("data from E-API SIT\n" + JSON.stringify(entapiSitData));
      Object.keys(entapiSitData).map(function (keyName, keyIndex) { if (entapiSitData[keyName] !== 0) { eapi_sitUp.push(keyName.toUpperCase()); } })
      // console.log("UP E-API SIT\n" + eapi_sitUp);
      setEapi_sitUp_(eapi_sitUp.sort());
    }).catch(error => {
      message.error('Can not get data from E-API SIT');
      console.log(error.response)
    });

    axios.get('/entapiUat').then(entapiUat => {
      const entapiUatData = entapiUat.data.discoveryComposite.eureka.applications;
      message.success('Successful get data from E-API UAT')
      // console.log("data from E-API UAT\n" + JSON.stringify(entapiUatData));
      Object.keys(entapiUatData).map(function (keyName, keyIndex) { if (entapiUatData[keyName] !== 0) { eapi_uatUp.push(keyName.toUpperCase()); } })
      // console.log("UP E-API UAT\n" + eapi_uatUp);
      setEapi_uatUp_(eapi_uatUp.sort());
    }).catch(error => {
      message.error('Can not get data from E-API UAT');
      console.log(error.response)
    });

    axios.get('/entapiPt').then(entapiPt => {
      const entapiPtData = entapiPt.data.discoveryComposite.eureka.applications;
      message.success('Successful get data from E-API PT')
      // console.log("data from E-API PT\n" + JSON.stringify(entapiPtData));
      Object.keys(entapiPtData).map(function (keyName, keyIndex) { if (entapiPtData[keyName] !== 0) { eapi_ptUp.push(keyName.toUpperCase()); } })
      // console.log("UP E-API PT\n" + eapi_ptUp);
      setEapi_ptUp_(eapi_ptUp.sort());
    }).catch(error => {
      message.error('Can not get data from E-API PT');
      console.log(error.response)
    });

    axios.get('/entapiPs').then(entapiPs => {
      const entapiPsData = entapiPs.data.discoveryComposite.eureka.applications;
      message.success('Successful get data from E-API PS')
      // console.log("data from E-API PS\n" + JSON.stringify(entapiPsData));
      Object.keys(entapiPsData).map(function (keyName, keyIndex) { if (entapiPsData[keyName] !== 0) { eapi_psUp.push(keyName.toUpperCase()); } })
      // console.log("UP E-API PS\n" + eapi_psUp);
      setEapi_psUp_(eapi_psUp.sort());
    }).catch(error => {
      message.error('Can not get data from E-API PS');
      console.log(error.response)
    });

  }, []);

  const getDownMS = (msThatWantToKnow) => {
    let list = [];
    var totalMS = allMS_S.concat(allMS_U)
    totalMS = totalMS.sort();
    totalMS = totalMS.filter(function (item, pos) { return totalMS.indexOf(item) == pos; });
    let tempList = totalMS.filter(function (obj) { return msThatWantToKnow.indexOf(obj) == -1; });
    for (let i = 0; i < tempList.length; i++) {
      list.push(<p key={i}>{tempList[i]}</p>)
    }
    return list;
  }

  const PushToCard = (temp) => {
    let list = [];
    for (let i = 0; i < temp.length; i++) {
      list.push(<p key={i}>{temp[i]}</p>)
    }
    return list;
  }
  const PushToCardAllMS = () => {
    let list = [];
    var totalMS = allMS_S.concat(allMS_U)
    totalMS = totalMS.filter(function (item, pos) { return totalMS.indexOf(item) == pos; });
    totalMS = totalMS.sort();
    for (let i = 0; i < totalMS.length; i++) {
      list.push(<p key={i}>{totalMS[i]}</p>)
    }
    // console.log(list.length)
    return list;
  }
  const RemoveListener = (temp) => {
    let list = [];
    for (let i = 0; i < temp.length; i++) {
      // .includes == false - don't have "EVENT-LISTENER-" in string
      if (!temp[i].includes("EVENT-LISTENER-")) {
        list.push(<p key={i}>{temp[i]}</p>)
      }
    }
    return list;
  }

  const RemoveDownListener = (msThatWantToKnow) => {
    let list = [];
    var totalMS = allMS_S.concat(allMS_U)
    totalMS = totalMS.sort();
    totalMS = totalMS.filter(function (item, pos) { return totalMS.indexOf(item) == pos; });
    let tempList = totalMS.filter(function (obj) { return msThatWantToKnow.indexOf(obj) == -1; });
    for (let i = 0; i < tempList.length; i++) {
      if (!tempList[i].includes("EVENT-LISTENER-")) {
        list.push(<p key={i}>{tempList[i]}</p>)
      }
    }
    return list;
  }

  const getNumMsWithOutListener = (msUp) => {
    let countUP = 0; let countDOWN = 0;
    var totalMS = allMS_S.concat(allMS_U)
    totalMS = totalMS.sort();
    totalMS = totalMS.filter(function (item, pos) { return totalMS.indexOf(item) == pos; });
    let msDown = totalMS.filter(function (obj) { return msUp.indexOf(obj) == -1; });
    for (let i = 0; i < msUp.length; i++) { if (!msUp[i].includes("EVENT-LISTENER-")) { countUP += 1; } }
    for (let i = 0; i < msDown.length; i++) { if (!msDown[i].includes("EVENT-LISTENER-")) { countDOWN += 1; } }
    let badge = [];
    badge.push(<span>
      <Badge count={countUP} overflowCount={999} style={{ backgroundColor: '#52c41a' }} showZero></Badge>
            &nbsp;  &nbsp;
            <Badge count={countDOWN} overflowCount={999} showZero></Badge>
    </span>)
    return badge;
  }

  const getNumMsWithListener = (msUp) => {
    let badge = [];
    var totalMS = allMS_S.concat(allMS_U)
    totalMS = totalMS.sort();
    totalMS = totalMS.filter(function (item, pos) { return totalMS.indexOf(item) == pos; });
    let msDown = totalMS.filter(function (obj) { return msUp.indexOf(obj) == -1; });
    badge.push(<span>
      <Badge count={msUp.length} overflowCount={999} style={{ backgroundColor: '#52c41a' }} showZero></Badge>
            &nbsp;  &nbsp;
            <Badge count={msDown.length} overflowCount={999} showZero></Badge>

    </span>)
    return badge;
  }

  const toggleTrueFalse = () => setToggled(!isToggled);

  const addElementInDropdown = () => {
    var totalMS = allMS_S.concat(allMS_U)
    totalMS = totalMS.filter(function (item, pos) { return totalMS.indexOf(item) == pos; });
    totalMS = totalMS.sort();
    const Add = totalMS.map(Add => Add)
    return Add;
  }

  const checkMsUpInEveryEnvi = (e) => {
    var upText = " "; var downText = " ";
    var totalMS = allMS_S.concat(allMS_U)
    totalMS = totalMS.filter(function (item, pos) { return totalMS.indexOf(item) == pos; });
    totalMS = totalMS.sort();
    var msName = totalMS[e.target.value];
    // console.log((totalMS[e.target.value]));

    message.success("Search " + msName);
    var allEnvi = ["DEV", "SIT", "EAPI-SIT", "UAT", "EAPI-UAT", "PT", "EAPI-PT", "PS", "EAPI-PS"];
    var upEnvi = [];
    var downEnvi = [];

    if (devUpMS_.includes(msName)) { upEnvi.push("DEV"); }
    if (sitUpMS_.includes(msName)) { upEnvi.push("SIT"); }
    if (eapi_sitUp_.includes(msName)) { upEnvi.push("EAPI-SIT"); }
    if (uatUpMS_.includes(msName)) { upEnvi.push("UAT"); }
    if (eapi_uatUp_.includes(msName)) { upEnvi.push("EAPI-UAT"); }
    if (ptUpMS_.includes(msName)) { upEnvi.push("PT"); }
    if (eapi_ptUp_.includes(msName)) { upEnvi.push("EAPI-PT"); }
    if (psUpMS_.includes(msName)) { upEnvi.push("PS"); }
    if (eapi_psUp_.includes(msName)) { upEnvi.push("EAPI-PS"); }

    downEnvi = allEnvi.filter(function (obj) { return upEnvi.indexOf(obj) == -1; });
    // console.log(upText);
    upEnvi.forEach(function (entry) { upText += entry + " "; });
    downEnvi.forEach(function (entry) { downText += entry + " "; });

    notification.open({
      message: "STATUS UP: " + msName,
      description: upText,
      duration: 0,
      icon: <SmileOutlined style={{ color: "#16A085" }} />
    });
    notification.open({
      message: "STATUS DOWN: " + msName,
      description: downText,
      duration: 0,
      icon: <FrownOutlined style={{ color: "#C70039" }} />
    });
  }

  const [visible, setVisible] = useState(false)
  const showModal = () => { setVisible(true) };
  const handleOk = (e) => { console.log(e); setVisible(false) };
  const handleCancel = (e) => { console.log(e); setVisible(false) };

  return (
    <div className="fullscreen_bg">
      <img src={monitorMS_Banner} id="setBG" />
      <h1 class="first-text">Loading...</h1>
      <br />
      <Switch checkedChildren="Without Listener" unCheckedChildren="     Listener    " onClick={toggleTrueFalse} id="toggle"></Switch>

      <>
        <Button id="SearchByName" value="default" onClick={showModal}>
          {" "}
            Search By Name{" "}
        </Button>
        <Modal title="Search By Name" visible={visible} onOk={handleOk} onCancel={handleCancel}>
          < select onChange={e => checkMsUpInEveryEnvi(e)} > {
            addElementInDropdown().map((ms, key) => <option value={key}>{ms}</option>)
          }
          </select >
        </Modal>
      </>

      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Scrollbars id="setScrollBar">
            <Card title="Micro Services Name" id="setCard">
              {PushToCardAllMS()}
            </Card>
          </Scrollbars>
        </Col>

        <Col span={16}>
          <Row>
            <Col span={24}>
              <Collapse >
                <Panel header="DEV" key="1" extra={(isToggled === false ? getNumMsWithListener(devUpMS_) : getNumMsWithOutListener(devUpMS_))}>
                  <Collapse >
                    <Panel header="Status : up [dev]">{(isToggled === false ? PushToCard(devUpMS_) : RemoveListener(devUpMS_))}</Panel>
                    <Panel header="Status : down [dev]"> {isToggled === false ? getDownMS(devUpMS_) : RemoveDownListener(devUpMS_)} </Panel>
                  </Collapse>
                </Panel>
                <Panel header="SIT" key="2" extra={(isToggled === false ? getNumMsWithListener(sitUpMS_) : getNumMsWithOutListener(sitUpMS_))}>
                  <Collapse >
                    <Panel header="Status : up [sit]">{(isToggled === false ? PushToCard(sitUpMS_) : RemoveListener(sitUpMS_))}</Panel>
                    <Panel header="Status : down [sit]"> {isToggled === false ? getDownMS(sitUpMS_) : RemoveDownListener(sitUpMS_)} </Panel>
                  </Collapse>
                </Panel>

                <Panel header="EAPI SIT" key="3" extra={isToggled === false ? getNumMsWithListener(eapi_sitUp_) : getNumMsWithOutListener(eapi_sitUp_)}>
                  <Collapse>
                    <Panel header="Status : up [eapi sit]">{isToggled === false ? PushToCard(eapi_sitUp_) : RemoveListener(eapi_sitUp_)} </Panel>
                    <Panel header="Status : down [eapi sit]">{isToggled === false ? getDownMS(eapi_sitUp_) : RemoveDownListener(eapi_sitUp_)} </Panel>
                  </Collapse>
                </Panel>
                <Panel header="UAT" key="4" extra={isToggled === false ? getNumMsWithListener(uatUpMS_) : getNumMsWithOutListener(uatUpMS_)}>
                  <Collapse>
                    <Panel header="Status : up [uat]">{isToggled === false ? PushToCard(uatUpMS_) : RemoveListener(uatUpMS_)} </Panel>
                    <Panel header="Status : down [uat]">{isToggled === false ? getDownMS(uatUpMS_) : RemoveDownListener(uatUpMS_)} </Panel>
                  </Collapse>
                </Panel>
                <Panel header="EAPI UAT" key="5" extra={isToggled === false ? getNumMsWithListener(eapi_uatUp_) : getNumMsWithOutListener(eapi_uatUp_)}>
                  <Collapse>
                    <Panel header="Status : up [eapi uat]">{isToggled === false ? PushToCard(eapi_uatUp_) : RemoveListener(eapi_uatUp_)} </Panel>
                    <Panel header="Status : down [eapi uat]">{isToggled === false ? getDownMS(eapi_uatUp_) : RemoveDownListener(eapi_uatUp_)} </Panel>
                  </Collapse>
                </Panel>

                <Panel header="PT" key="6" extra={isToggled === false ? getNumMsWithListener(ptUpMS_) : getNumMsWithOutListener(ptUpMS_)}>
                  <Collapse>
                    <Panel header="Status : up [pt]">{isToggled === false ? PushToCard(ptUpMS_) : RemoveListener(ptUpMS_)} </Panel>
                    <Panel header="Status : down [pt]">{isToggled === false ? getDownMS(ptUpMS_) : RemoveDownListener(ptUpMS_)} </Panel>
                  </Collapse>
                </Panel>

                <Panel header="EAPI PT" key="7" extra={isToggled === false ? getNumMsWithListener(eapi_ptUp_) : getNumMsWithOutListener(eapi_ptUp_)}>
                  <Collapse>
                    <Panel header="Status : up [eapi pt]">{isToggled === false ? PushToCard(eapi_ptUp_) : RemoveListener(eapi_ptUp_)} </Panel>
                    <Panel header="Status : down [eapi pt]">{isToggled === false ? getDownMS(eapi_ptUp_) : RemoveDownListener(eapi_ptUp_)} </Panel>
                  </Collapse>
                </Panel>
                <Panel header="PS" key="8" extra={isToggled === false ? getNumMsWithListener(psUpMS_) : getNumMsWithOutListener(psUpMS_)}>
                  <Collapse>
                    <Panel header="Status : up [ps]">{isToggled === false ? PushToCard(psUpMS_) : RemoveListener(psUpMS_)} </Panel>
                    <Panel header="Status : down [ps]">{isToggled === false ? getDownMS(psUpMS_) : RemoveDownListener(psUpMS_)} </Panel>
                  </Collapse>
                </Panel>

                <Panel header="EAPI PS" key="9" extra={isToggled === false ? getNumMsWithListener(eapi_psUp_) : getNumMsWithOutListener(eapi_psUp_)}>
                  <Collapse>
                    <Panel header="Status : up [eapi ps]">{isToggled === false ? PushToCard(eapi_psUp_) : RemoveListener(eapi_psUp_)} </Panel>
                    <Panel header="Status : down [eapi ps]">{isToggled === false ? getDownMS(eapi_psUp_) : RemoveDownListener(eapi_psUp_)} </Panel>
                  </Collapse>
                </Panel>
              </Collapse>
            </Col>
          </Row>
        </Col>
      </Row>
      <img src={monitorMS_footer} id="setBGFooter" />
    </div>
  );


}

export default Axios;