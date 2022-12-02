import Container from 'react-bootstrap/Container';
import Form from "react-bootstrap/Form";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import '../Checkout.css'
import { useState,useEffect } from 'react';

function logOut(){
    localStorage.removeItem('token');
    window.location.assign('http://localhost:3000/');
}

function Profile() {
    const[id,setId]=useState('')
    const[name,setName]=useState('')
    const[detail,setDetail]=useState([])
    const[tid,setTID]=useState('')

    useEffect(()=>{
    var header = { 'Authorization': localStorage.getItem('token') };
    // document.getElementById('loginSection').style.display = 'none'
    fetch('http://localhost:8000/authJWT', {
        method: 'GET',
        headers: header,
    })
        .then(res => {
            return res.json();
        }).then(result => {
            console.log(result);
            setId(result.message.id)
            setName(result.message.username)
            var temp = JSON.parse(result.message.detail)
            console.log(temp)
            setDetail(JSON.parse(result.message.detail))
            console.log(detail)
            setTID(result.message.t_id)
        });
    },[])
    console.log(detail)
    return (
        <div>
        <Container className='border border-1 justify-content-center'>
            <Row className='justify-content-md-center'><Col ><font>使用者ID&ensp;:&ensp;{id}</font></Col></Row>
            <Row className='justify-content-md-center'><Col ><font>使用者姓名&ensp;:&ensp;{name}</font></Col></Row>
            <Row className='justify-content-md-center'><Col ><font>歷史訂單&ensp;:&ensp;{detail.map((inner)=>
                <Row>
                <Col xl={2} className='littlePic'><img  src={inner[0]['src']} className="img-fluid"></img></Col>
                <Col xl={6}>商品名稱:{inner[0]['inName']}</Col>
               
                </Row>
            )}</font></Col></Row>
            <Row className='justify-content-md-center'><Col ><font>訂單編號:{tid}</font></Col></Row>
            <Row><Button id="signO" onClick={logOut} style={{ backgroundColor:'#AFDFE4',borderRadius: "10px",color:'green' }}>登出</Button></Row>
        </Container>
        
        </div>
    )
}

export default Profile