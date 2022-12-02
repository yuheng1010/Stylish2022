import Container from 'react-bootstrap/Container';
import Form from "react-bootstrap/Form";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function SignUp() {

    function change(){
        const name = document.getElementById('name').value
        const ac = document.getElementById('pID').value
        const pa = document.getElementById('uPa').value
        const phone = document.getElementById('phone').value
        const add = document.getElementById('add').value
        var header = { 'Content-Type': 'application/json; charset=UTF-8' };
        fetch('http://localhost:8000/signU', {
                    method: 'POST',
                    headers: header,
                    body: JSON.stringify({ 'uAc': ac, 'uPa':pa,'phone':phone,'add':add,'name':name})

                })
                    .then(res => {
                        return res.json();
                    }).then(result => {
                        console.log(result);
                        alert(result.message)
                        window.location.assign('http://localhost:3000/')
                    })
        
    }
    
    return (
        <Container>
        <form name="file" >
            <section>
                <br /><br />
                <Row><font size='7'>SignUp</font></Row>
                <br />
                <label for="name">名字:</label>
                <br />
                <Form.Control type='text' style={{ borderRadius: "7px" }} className="name" name="name" id="name" />
                <br />
                <label for="uAc">帳號:</label>
                <br />
                <Form.Control type='text' style={{ borderRadius: "7px" }} className="uAc" name="uAc" id="pID" />
                <br />
                <label for="uPa">密碼:</label>
                <br />
                <Form.Control type='password' style={{ borderRadius: "7px" }} className="uPa" name="uPa" id="uPa" />
                <br />
                <label for="phone">電話:</label>
                <br />
                <Form.Control type='text' style={{ borderRadius: "7px" }} className="phone" name="phone" id="phone" />
                <br />
                <label for="add">地址:</label>
                <br />
                <Form.Control type='text' style={{ borderRadius: "7px" }} className="add" name="add" id="add" />
                <br /><br />
                <Row className='justify-content-center'><Col xs={3} lg={2}  md={2} xl={1}><Button id="signU"  onClick={change}style={{ backgroundColor:'#AFDFE4',borderRadius: "10px",color:'green' }}>註冊</Button></Col></Row>
                <div id="ajax"></div>
            </section>
        </form>
        </Container>
    )
}
export default SignUp