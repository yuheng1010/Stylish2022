import '../All.css';
import search from '../icon/search.png';
import cart from '../icon/cart.png';
import member from '../icon/member.png';
import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Cate from './Cate'
import Scroll from './Scroll.js';
import Detail from './Detail.js';
import CheckOut from './CheckOut.js';
import AfterOr from './AfterOr.js';
import Login from './Login';
import SignUp from './SignUp';
import Profile from './Profile';

function Header(props) {
    const [data, setData] = useState([])
    const [res,setRe]=useState([])
    useEffect(() => {
        console.log(localStorage.getItem('num'))
        if(localStorage.getItem('num')!=null){
        document.querySelector('#cartNum').innerText = localStorage.getItem('num');}
    }, [])
    useEffect(() => {
        fetch('http://52.8.249.71:8000/api/v1/products?paging=0')
            .then(res => res.json())
            .then(data => {
                var ap = data.all_paging;
                var np = data.next_paging;
                var temp = JSON.parse(data.list);
             
                if (np === "none") {
                    setData(temp);
                } else {
                    for (var i = 1; i < ap; i++) {
                        fetch('http://52.8.249.71:8000/api/v1/products?paging=' + i)
                            .then(res => res.json())
                            .then(data2 => {
                                temp = temp.concat(JSON.parse(data2.list));
                                setData(temp);
                            })
                    }
                }
            })
 



    }, [])
    const handleKeyDown = event => {
        console.log(event.key);
        if (event.key === 'Enter') {
            var input = document.getElementById("search_bar");
            fetch('http://52.8.249.71:8000/api/v1/products/search?paging=0&keyword=' + input.value, { method: "GET", headers: { 'Content-Type': 'application/json; charset=UTF-8' } })
                .then(res => {
                    return res.json();
                }).then(result => {
                    var r = JSON.parse(result.list);
                    setData(r)
                })
        }
    };

    function cate(c) {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        fetch('http://52.8.249.71:8000/api/v1/products/cate?cate=' + c + '&paging=0')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                var ap = data.all_paging;
                var np = data.next_paging;
                var temp = JSON.parse(data.list);
                console.log(temp)
                if (np === "none") {
                    setData(temp);
                } else {
                    for (var i = 1; i < ap; i++) {
                        fetch('http://52.8.249.71:8000/api/v1/products/cate?cate=' + c + '&paging=' + i)
                            .then(res => res.json())
                            .then(data2 => {
                                temp = temp.concat(JSON.parse(data2.list));
                                setData(temp);
                            })
                    }
                }
            })
    }
    function addCart(cartN) {
        document.querySelector('#cartNum').innerText = cartN;
        props.cart(cartN)
    }
    function afterPay(re){
        console.log(re)
        setRe(re)
    }
    return (
        <div>
                <header>
                    <div className="ban1" >
                        <Link to='/' onClick={window.location.reload}><img src={require("../icon/logo.png")} id="logo" alt='logo' /></Link>
                        <div className="category">
                            <Link to='/'><a id="women" name="women" href='#'onClick={() => cate('women')}>女&emsp;裝</a></Link>
                            <font>|</font>
                            <Link to='/'><a id="men" name="men" href='#' onClick={() => cate('men')}>男&emsp;裝</a></Link>
                            <font>|</font>
                            <Link to='/'><a id="other" name="accessories" href='#' onClick={() => cate('accessories')}>配&emsp;件</a></Link>
                        </div>

                        <div className="search" >
                            <input type="text" id="search_bar" onKeyDown={handleKeyDown} style={{ borderRadius: '40px' }} />
                            <input type="image" id="search_btn" onClick={display} src={search}
                                style={{ height: "44px", width: "44px" }} />
                        </div>
                        <div className='cartAll'>
                            <Link to='/checkOut'><button id="cartNum" >0</button></Link>
                            <Link to='/checkOut'><input type="image" src={cart} id="cart" style={{ width: '44px', height: '44px' }} /></Link>
                        </div>
                            <Link to='/login'><input type="image" src={member} id="profile" style={{ width: '48px', height: '44px' }} /></Link>
                    </div>
                    <div className="scroll">
                        <div className="smallCate" >
                            <Link to='/'><a id="womenS" href='#' onClick={() => cate('women')} value="women">女&emsp;裝</a></Link>
                            <font>|</font>
                            <Link to='/'><a id="menS" href='#' onClick={() => cate('men')} value="men">男&emsp;裝</a></Link>
                            <font>|</font>
                            <Link to='/'><a id="otherS" href='#' onClick={() => cate('accessories')} value="accessories">配&emsp;件</a></Link>
                        </div>
                    </div>
                </header>
                <Scroll />
                <Routes>
                    <Route exact path="/" element={<Cate cat={data} />} />
                    <Route path="/detail/:id" element={<Detail cart={addCart} />} />
                    <Route path="/checkOut" element={<CheckOut after={afterPay}/>} />
                    <Route path="/ThankU" element={<AfterOr rest={res}/>}/>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/signUp" element={<SignUp/>}></Route>
                    <Route path="/profile" element={<Profile/>}></Route>
                </Routes>
        </div>
    );
}
export default Header;


function display() {
    var btn = document.getElementById('search_bar');
    btn.style.display = 'block';
    btn.style.width = '100%';
}


