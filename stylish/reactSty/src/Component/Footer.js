import '../All.css';
import line from '../icon/line.png';
import FB from '../icon/facebook.png';
import twitter from '../icon/twitter.png';
import cartM from '../icon/cart-mobile.png';
import memberM from '../icon/member-mobile.png';
import React, { useEffect } from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'


function Footer() {
    console.log(localStorage.getItem('num'))
    useEffect(() => {
        if (localStorage.getItem('num') != null) {
            document.querySelector('#cartNumS').innerText = localStorage.getItem('num');
        }
    }, [])

    return (
        <footer>
                <nav className="nav">
                    <div className="info">
                        <a className="nav-link" href="#">關於STYLiSH</a>
                        <font>|</font>
                        <a className="nav-link" href="#">服務條款</a>
                        <font>|</font>
                        <a className="nav-link" href="#">隱私政策</a>
                        <font>|</font>
                        <a className="nav-link" href="#">聯絡我們</a>
                        <font>|</font>
                        <a className="nav-link" href="#">FAQ</a>
                    </div>
                    <div className="info2">
                        <div className="rI1">
                            <a className="nav-link" href="#">關於STYLiSH</a>
                            <a className="nav-link" href="#">服務條款</a>
                            <a className="nav-link" href="#">隱私政策</a>
                        </div>
                        <div className="rI1">
                            <a className="nav-link" href="#">聯絡我們</a>
                            <a className="nav-link" href="#">FAQ</a>
                        </div>
                        <input type="image" id="line" src={line} style={{ height: '20px', width: '20px' }} />
                        <input type="image" id="fb" src={FB} style={{ height: '20px', width: '20px' }} />
                        <input type="image" id="twitter" src={twitter} style={{ height: '20px', width: '20px' }} />
                    </div>
                    <div className="navicon">
                        <input type="image" id="line" src={line} style={{ height: '20px', width: '20px' }} />
                        <input type="image" id="fb" src={FB} style={{ height: '20px', width: '20px' }} />
                        <input type="image" id="twitter" src={twitter} style={{ height: '20px', width: '20px' }} />
                    </div>
                    <small style={{ color: 'darkgray', size: '5px' }}>&copy;2018. All rights reserved.</small>
                </nav>
                <div className="menu">
                    <div className="m1">
                        <img src={cartM} />
                        <Link to='/checkOut' onClick={window.location.reload}><button id="cartNumS" >0</button></Link>
                        <Link to='/checkOut'onClick={window.location.reload}><a id="cartB">購物車</a></Link>
                    </div>
                    <font size="6">|</font>
                    <div className="m1">
                        <img src={memberM} />
                        <a id="member" href="">會員</a>
                    </div>

                </div>
        </footer>
    );

}

export default Footer;