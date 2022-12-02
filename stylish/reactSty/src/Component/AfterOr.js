import thankU from '../img/Thank-you.jpg'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../AfterOr.css';
const AfterOr=props=>{
    console.log(props.rest)
return(
   
    <Row className='justify-content-center'><Col md={6} xl={6}><img src={thankU} id='thanku'className='img-fluid'></img></Col></Row>
    
)
}


export default AfterOr