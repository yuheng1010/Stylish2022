import '../All.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'


function Cate(props) {
  var cat = props.cat
  // const [col, setCol] = useState([])
  // let color = []
  return (
    <Container>
      <Row>
        {cat.map((inner, index) =>
          <Col xs={6} lg={6} md={6} xl={4} d-block="true" key={inner.id}>
            <Link to={`/detail/${inner.id}`}><img id="p1" className="img-fluid" src={inner.img} /></Link>
            <div className="des">
           
              <div className='colorC'>{inner['color'].split(',').map((c) => <button style={{ backgroundColor: c, width: '30px', height: '30px',borderRadius:'5px'}}></button>)}</div>
              <font size="3">{inner.pname}</font>
              <font size="3"> TWD. {inner.pprice}</font>
            </div>
          </Col>
        )}

      </Row>
    </Container >

  )

}

export default Cate



