import React, { useEffect, useState } from 'react'
import '../All.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ex1 from '../img/ex1.png';
import ex2 from '../img/ex2.png';
import { useParams } from 'react-router-dom'

function Detail(props) {
    var cnum=props.cart
    const { id } = useParams()
    const [data, setData] = useState([])
    const [color, setColor] = useState('')
    const [size, setSize] = useState('')
    const [box,setBox]=useState([])
    const[c,setC]=useState([])
    useEffect(() => {
        var temp=[];
        fetch(`http://52.8.249.71:8000/api/v1/products/details/${id}`)
            .then(res => res.json())
            .then(data => {
                var re = JSON.parse(data.list)
                console.log(re[0])
                console.log(re)
                setBox(re)
                setData(re[0]);
                for (var j = 0; j < re.length; j++) {
                    if (temp.indexOf(re[j].color) == -1) {
                    temp.push(re[j].color)
                    }
                }
                setC(temp)
            })
    }, [])

    function jia() {
        var num;
        var input_num = document.getElementById("input-num");
        console.log(size)
        for(var i=0;i<box.length;i++){
            if (box[i].size===size){
                num=box[i].num
            }
        }
        console.log(num)
        if(input_num.value<num){
        input_num.value = parseInt(input_num.value) + 1;
    }
    }
    
    function jian() {
        var input_num = document.getElementById("input-num");
        if (input_num.value <= 0) {
            input_num.value = 0;
        } else {
            input_num.value = parseInt(input_num.value) - 1;
        }
    }
    function change(s){
        setSize(s)
        document.querySelector('#add').innerText='加入購物車';
    }
    function addCart() {
        var lim=[]
        var limit;
        for(var i=0;i<box.length;i++){
            if (box[i].size===size){
                limit=box[i].num
            }
        }
        for(var i=1;i<=parseInt(limit);i++){
            lim.push(i)
        }
        var input_num = document.getElementById("input-num");
        let num=localStorage.getItem('num')
        console.log(num)
        if(num===null){
            num=0
            var list = []
           
          
            list.push([{'inName':data.pname,'pid':data.id,'src':data.img,'color':color,'price':data.pprice,'size':size,'sum':parseInt(input_num.value),'limit':JSON.stringify(lim)}])
            localStorage.setItem('aboutCheck',JSON.stringify(list))
            // localStorage.setItem('color',color)
            // localStorage.setItem('size',size)
            localStorage.setItem('num',parseInt(num)+parseInt(input_num.value))
        }else{
            // localStorage.setItem('color',color)
            // localStorage.setItem('size',size)
          
            var exist = JSON.parse(localStorage.getItem('aboutCheck'))
            var list = [{'inName':data.pname,'pid':data.id,'src':data.img,'color':color,'price':data.pprice,'size':size,'sum':parseInt(input_num.value),'limit':JSON.stringify(lim)}]
            exist.push(list)  
            console.log(exist)
            localStorage.setItem('aboutCheck',JSON.stringify(exist))
            localStorage.setItem('num',parseInt(num)+parseInt(input_num.value))
        }
        console.log("cacacac")
            props.cart(parseInt(num)+parseInt(input_num.value));
    
    }

    return (
        <div className='detailsAll'>
            <Container>
                <Row>
                    <Col xs={12} lg={12} md={12} xl={6} >
                        <img src={data.img}  className="img-fluid"/>
                    </Col>
                    <Col xs={12} lg={12} md={12} xl={6}>
                        <h3>{data.pname}</h3>
                        <br />
                        <p style={{ color: 'gray' }}>編號:{data.id}</p>
                        <p>TWD.{data.pprice}</p>
                        <hr />
                        <div className="color" >
                            <font>顏色&emsp;|&emsp;</font>
                            {c.map((x)=><Button style={{ backgroundColor: x, width: '30px', height: '30px',borderBlockColor:'black'}} onClick={()=>setColor(x) }></Button>)}
                           
                        </div>
                        <div className="size">
                            <font>尺寸&emsp;|&emsp;</font>
                            <button id='s' style={{ width: '30px', height: '30px', borderRadius: '50%' }} onClick={()=>change('S')}>S</button>
                            <button id='m' style={{ width: '30px', height: '30px', borderRadius: '50%' }} onClick={()=>change('M')}>M</button>
                            <button id='l' style={{ width: '30px', height: '30px', borderRadius: '50%' }} onClick={()=>change('L')}>L</button>
                        </div>
                        <div className="btn-numbox">
                            <font>數量&emsp;|&emsp;</font>
                            <li>
                                <ul className="count">
                                    <li><span id="num-jian" className="num-jian" onClick={jian}>-</span></li>
                                    <li><input type="text" className="input-num" id="input-num" value="0" /></li>
                                    <li><span id="num-jia" className="num-jia" onClick={jia}>+</span></li>
                                </ul>
                            </li>
                        </div>
                        <br /><br />
                        <div>
                            <button id="add" style={{ backgroundColor: ' rgb(12, 46, 21)', width: '220px', height: '40px', color: 'white' }} onClick={addCart}>請選擇尺寸</button>
                        </div>
                        <p dangerouslySetInnerHTML={{ __html: data.des_1 }}></p>
                    </Col>
                </Row >
                <br />
                <Col justify-content-center="true">
                
                <Col xl={12} d-block="true"><p>細部說明</p></Col>
                <Col xl={12} d-block="true"><p>{data.des_2}</p></Col>
                <Row xl={12} d-block="true"><img id="ps1" src={ex1} /></Row> 
                <Row xl={12} d-block="true"><img id="ps1" src={ex2} /></Row>
                <Row xl={12} d-block="true"><img id="ps1" src={ex1} /></Row>
                <Row xl={12} d-block="true"><img id="ps1" src={ex2} /></Row>
                </Col>
            </Container>
        </div>
    )
}

export default Detail





