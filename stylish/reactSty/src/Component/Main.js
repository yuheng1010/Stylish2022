import '../All.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useEffect, useState } from 'react'

function Main() {
  const [data, setData] = useState([])
  useEffect(() => {
    fetch('http://localhost:8000/api/v1/products?paging=0')
      .then(res => res.json())
      .then(data => {
        var ap = data.all_paging;
        var np = data.next_paging;
        var temp=JSON.parse(data.list);
        if(np === "none"){
        setData(temp);
        }else{
        for (var i = 1; i < ap; i++) {
          fetch('http://localhost:8000/api/v1/products?paging='+i)
            .then(res => res.json())
            .then(data2 => {
              temp=temp.concat(JSON.parse(data2.list));
              setData(temp);
            })
      }}
    })
  }, [])

  return (
    
    <Container>
      <Row>
        {data.map((inner) =>
          <Col xs={6} lg={6} md={6} xl={4} d-block="true" key={inner.id}>
            <img id="p1" className="img-fluid" src={require(`${inner.img}`)} />
            <div className="des">
              <img className="img-fluid" src={require("./icon/color.png")} style={{ width: "23%", height: "8%" }} />
              <font size="3">{inner.pname}</font>
              <font size="3"> TWD. {inner.pprice}</font>
            </div>
          </Col>)}

      </Row>
    </Container >

  )

}

export default Main;



