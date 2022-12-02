import React, { useEffect, useState } from 'react'
import '../Checkout.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from "react-bootstrap/Form"
import del from "../icon/cart-remove.png"
import { BrowserRouter as  Link } from 'react-router-dom'



function CheckOut(props) {
    const [order, setOrder] = useState([])
    const [total, setTotal] = useState(0)


    useEffect(() => {
        if (localStorage.getItem('aboutCheck') !== null) {
            setOrder(JSON.parse(localStorage.getItem('aboutCheck')))
            var t = 0;
            for (var i = 0; i < JSON.parse(localStorage.getItem('aboutCheck')).length; i++) {
                t += parseInt(JSON.parse(localStorage.getItem('aboutCheck'))[i][0]['sum']) * parseInt(JSON.parse(localStorage.getItem('aboutCheck'))[i][0]['price'])
            }
            setTotal(t)
        }
    }, [])
  
    function delOrder(index) {
        var pre = JSON.parse(localStorage.getItem('aboutCheck'));
        var delN = parseInt((JSON.parse(localStorage.getItem('aboutCheck')))[index][0]['sum'])
        var newR = parseInt(localStorage.getItem('num')) - delN
        localStorage.setItem('num', newR)
        pre.splice(index, 1);
        localStorage.setItem('aboutCheck', JSON.stringify(pre));
        alert('刪除商品完畢!');
        window.location.reload();
    }
    function changeN(index){      
        console.log(index)
        var n=document.querySelector('.number').value
        var pre = JSON.parse(localStorage.getItem('aboutCheck'));
        var delN = parseInt((JSON.parse(localStorage.getItem('aboutCheck')))[index][0]['sum'])
        var newR = parseInt(localStorage.getItem('num')) - delN + parseInt(n)
        var nList= pre[index][0]
        console.log(nList)
        nList['sum']=n
        console.log(nList)
        pre.splice(index, 1,[(nList)]);
        localStorage.setItem('aboutCheck', JSON.stringify(pre));
        console.log(pre)
        localStorage.setItem('num', newR)
        alert('更改商品完畢!');
        window.location.reload();
    }
    useEffect(()=>{
        getTPDirect().then((TPDirect) => {
        TPDirect.setupSDK(12348, 'app_pa1pQcKoY22IlnSXq5m5WP5jFKzoRG58VEXpT7wU62ud7mMbDOGzCYIlzzLF', 'sandbox')
        var fields = {
            number: {
                element: '#card-number',
                placeholder: '**** **** **** ****'
            },
            expirationDate: {
                element: document.getElementById('card-expiration-date'),
                placeholder: 'MM / YY'
            },
            ccv: {
                element: '#card-ccv',
                placeholder: 'ccv'
            }
        }
       
        TPDirect.card.setup({
            fields: fields,
            styles: {
                'input': {
                    'color': 'gray'
                },
                '.valid': {
                    'color': 'green'
                },
                '.invalid': {
                    'color': 'red'
                },
                '@media screen and (max-width: 400px)': {
                    'input': {
                        'color': '#2b542c'
                    }
                }
            },
            isMaskCreditCardNumber: true,
            maskCreditCardNumberRange: {
                beginIndex: 6,
                endIndex: 11
            }
        })
    })
},[])

    function onSubmit(event) {
        if(localStorage.getItem('token')===null || localStorage.getItem('token')==='undefined'){
            alert('請先登入!')
        }else{
        getTPDirect().then((TPDirect) => {
        event.preventDefault()
        const tappayStatus = TPDirect.card.getTappayFieldsStatus()
        if (tappayStatus.canGetPrime === false) {
            alert('can not get prime')
            return
        }
        var prime;
        TPDirect.card.getPrime((result) => {
            if (result.status !== 0) {
                alert('get prime error ' + result.msg)
                return
            }
            prime = result.card.prime;
            var name = document.getElementById('name').value;
            var mail = document.getElementById('mail').value;
            var address = document.getElementById('address').value;
          
            var list=[];
            var chartL = JSON.parse(localStorage.getItem('aboutCheck'));
            for(var i=0; i<JSON.parse(localStorage.getItem('aboutCheck')).length; i++){
                var temp={'id':chartL[i][0]['pid'], 'price':chartL[i][0]['price'], 'color':{'code':chartL[i][0]['color'],'name':''}, 'size':chartL[i][0]['size'], 'qty':chartL[i][0]['sum']}
                list.push(temp)
            }
            var detail = {'total':total,'list':list};
            // var time = document.querySelector('input[name="time"]:checked').value;
            // console.log(time);
            var phone = document.getElementById('phone').value;
            var header = { 'Content-Type': 'application/json; charset=UTF-8', 'Authorization': localStorage.getItem('token') };
            alert('get prime 成功,prime: ' + result.card.prime)
            fetch('http://localhost:8000/pay-by-prime', {
                method: 'POST',
                headers: header,
                body: JSON.stringify({ 'prime': prime, 'name': name, 'mail': mail, 'address': address,  'phone': phone ,'detail':{detail}})
            })
                .then(res => {
                    return res.json();
                }).then(result => {
                    console.log(result);
                    props.after(result)
                    localStorage.removeItem('aboutCheck')
                    localStorage.removeItem('num')
                    window.location.assign('http://localhost:3000/ThankU')
                });
        })
    })
}}
    return (
        <div>
            {/* <script src="https://js.tappaysdk.com/tpdirect/v5.13.1"></script> */}
            <Container>
                <Row className='colName'>
                    <Col md={12} xl={5}><font>購物車({localStorage.getItem('num')})</font></Col>
                    <Col xl={2} id='numT'><font>數量</font></Col>
                    <Col xl={2} id='unitT'><font>單價</font></Col>
                    <Col xl={2} id='sumT'><font>小計</font></Col>
                </Row>

                <Row className='border border-1'>
                    {order.map((inner, index) =>
                        <Row className='justify-content-md-center'>
                            <Col md={6} xl={3} className='iDetail'><img className="img-fluid" id='proPho' src={inner[0].src}></img></Col>
                            <Col md={6} xl={2} className='iDetail' text-align-center='true'><p>{inner[0].inName}</p><p>編號:{inner[0].pid}</p><p>顏色:{inner[0].color}</p><p>尺寸:{inner[0].size}</p></Col>
                            <Col md={4} xl={2} className='iDetail'>
                                <Form.Select className="number" aria-label="Default select example" size="sm" onChange={()=>changeN(index)}>
                                    <option value={inner[0].sum} className="number" select hidden style={{ height: '20px', weigth: '40px' }}>{inner[0].sum}</option>
                                    {(JSON.parse(inner[0].limit)).map(x => <option value={x} className="number"  style={{ height: '20px', weigth: '40px' }}>{x}</option>)}
                                </Form.Select>
                            </Col>
                            <Col md={4} xl={2} className='iDetail' ><font>{inner[0].price}</font></Col>
                            <Col md={4} xl={2} className='iDetail' ><font>{parseInt(inner[0].price) * parseInt(inner[0].sum)}</font></Col>
                            <Col xl={1} className='iDetail' id='del'><img src={del} onClick={() => delOrder(index)}></img></Col>
                        </Row>
                    )}
                </Row>
                <br />
                <Row><font>訂購資料</font></Row>
                <Row><hr style={{ color: 'black' }} /></Row>
                <Row id='nameR'><Col xl={2}>收件人姓名</Col><Col xl={4} id='sojian'><Form.Control id='name' size="sm" type="text" style={{ borderRadius: "7px" }} /><font>務必填寫完整收件人姓名，避免包裹無法順利簽收</font></Col></Row>
                <Row id='mailR'><Col xl={2}>Email</Col><Col xl={4} ><Form.Control id='mail' size="sm" type="text" style={{ borderRadius: "7px" }} /></Col></Row>
                <Row id='phoneR'><Col xl={2}>手機</Col><Col xl={4} ><Form.Control id='phone' size="sm" type="text" style={{ borderRadius: "7px" }} /></Col></Row>
                <Row id='addressR'><Col xl={2}>地址</Col><Col xl={4} ><Form.Control id='address' size="sm" type="text" style={{ borderRadius: "7px" }} /></Col></Row>
                <Row id='timeTR'><Col md={2} xl={2}>&nbsp;&nbsp;時間</Col><Col md={3} xl={1} id='timeCheck'><Form.Check label='8~12' /></Col><Col md={3} xl={1}><Form.Check label="13~17" /></Col><Col md={3} xl={1}><Form.Check label="18~21" /></Col></Row>
                <br /><br />
                <Row><font>付款資料</font></Row>
                <Row><hr style={{ color: 'black' }} /></Row>

                <Row><div className="form-group card-number-group">
                    <br />
                    <label for="card-number">卡號</label>
                    <div className="tpfield" id="card-number" name="card-number" ></div>
                </div></Row>
                <Row><div className="form-group expiration-date-group">
                    <label for="card-expiration-date">卡片到期日</label>
                    <div className="tpfield" id="card-expiration-date" name="card-expiration-date"></div>
                </div></Row>
                <Row><div className="form-group ccv-group">
                    <label for="card-ccv">卡片後三碼</label>
                    <div className="tpfield" id="card-ccv" name="card-ccv"></div>
                </div></Row>
                <Row className="justify-content-end">
                    <Col md={6} xl={2}>
                        <Row><Col><font>總金額</font></Col><Col><small>NT.</small><font>&ensp;{total}</font></Col></Row>
                        <Row><Col><font>運費</font></Col><Col><small>NT.</small><font>60</font></Col></Row>
                        <Row><hr style={{ color: 'black' }} /></Row>
                        <Row><Col><font>應付金額</font></Col><Col><small>NT.</small><font>{total + 60}</font></Col></Row>
                    </Col>
                </Row>
                <br /> <br />
               <Row><button onClick={onSubmit}  className="btn btn-default" style={{borderBlockColor:'green'} }>Pay</button></Row>
            </Container>
        </div>

    )
}

export default CheckOut

export function getTPDirect() {
    return new Promise((resolve, reject) => {
        if (typeof window.TPDirect !== 'undefined') {
            return resolve(window.TPDirect)
        } else {
            const script = window.document.createElement('script')
            script.src = "https://js.tappaysdk.com/tpdirect/v5.1.0"
            script.async = true
            script.onload = () => {
                if (typeof window.TPDirect !== 'undefined') {
                    resolve(window.TPDirect)
                } else {
                    reject(new Error('failed to load TapPay sdk'))
                }
            }
            script.onerror = reject
            window.document.body.appendChild(script);
        }
    })
}