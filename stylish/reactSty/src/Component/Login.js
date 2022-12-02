import Container from 'react-bootstrap/Container';
import Form from "react-bootstrap/Form";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from 'react'
import '../Login.css'
function change(){
    window.location.assign('http://52.8.249.71/signUp')
}

function signIn(){
    const ac = document.getElementById('uAc').value
    const pa = document.getElementById('uPa').value
    var header = { 'Content-Type': 'application/json; charset=UTF-8' };
    fetch('http://52.8.249.71:8000/signI', {
                    method: 'POST',
                    headers: header,
                    body: JSON.stringify({ 'uAc': ac, 'uPa':pa})

                })
                    .then(res => {
                        return res.json();
                    }).then(result => {
                        console.log(result);
                        localStorage.setItem('token',result.token) 
                        alert(result.message)
                        window.location.assign('http://52.8.249.71/')
                    });
}
function Login() {
    useEffect(()=>{
        if(localStorage.getItem('token')!==null && localStorage.getItem('token')!=='undefined'){
            alert('已登入狀態!')
            window.location.assign('http://52.8.249.71/profile')
            
        }
    },[])
    return (
        <Container>
                <section id='loginSection'>
                    <br /><br />
                    <Row><font size='7'>Login</font></Row>
                    <Row><hr style={{ color: 'black' }} /></Row>
                    <br /><br />
                    <label for="uAc">帳號:</label>
                    <br />
                    <Form.Control type='text' style={{ borderRadius: "7px" }} className="uAc" name='uAc' id="uAc" />
                    <br />
                    <label for="uPa">密碼:</label>
                    <br />
                    <Form.Control type='password' style={{ borderRadius: "7px" }} className="uPa" name='uPa' id="uPa" />
                    <br /><br />
                    <Row className='justify-content-center'><Col xs={3} lg={2}  md={2} xl={1}><Button id="signI" onClick={signIn} style={{ backgroundColor:'#AFDFE4',borderRadius: "10px",color:'green' }}>登入</Button></Col>
                    <Col xs={3} lg={2}  md={2} xl={1}><Button id="signU" onClick={change} style={{ backgroundColor:'#AFDFE4',borderRadius: "10px",color:'green' }}>註冊</Button></Col></Row>
                    
                </section>
                <Row className='justify-content-center'id="ajax"></Row>
        </Container>
    )
}
export default Login