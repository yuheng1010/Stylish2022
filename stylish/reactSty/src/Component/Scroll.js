import '../All.css';
// import { Carousel, Button } from 'bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import scroll2 from '../icon/scroll_mt2.jpg';
import scroll3 from '../icon/scroll_mt3.jpg';



function Scroll(){
    return(
        <div id='sea'>
            <Carousel variant="dark">
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={scroll3}
                        alt="First slide"
                    />
                        {/* // <Carousel.Caption>
                        //     <h5>First slide label</h5>
                        //     <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        // </Carousel.Caption> */}
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={scroll2}
                        alt="Second slide"
                    />

                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={scroll3}
                        alt="Third slide"
                    />

                </Carousel.Item>
            </Carousel>
        </div>





    );
        }


export default Scroll;