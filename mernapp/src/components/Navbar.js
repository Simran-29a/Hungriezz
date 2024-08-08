

import React,{useState}from 'react'
import { Link , useNavigate} from "react-router-dom";
import Badge from 'react-bootstrap/Badge';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import {useCart} from './ContextReducer';
export default function Navbar() {
    let data=useCart();
    const [cartView,setCartView]=useState(false);
    const navigate=useNavigate();
    const handleLogout =()=>{
          localStorage.removeItem("authtoken");
          navigate("/login")
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-info  position-sticky"
                style={{ boxShadow: "0px 10px 20px black", filter: 'blur(20)', position: "fixed", zIndex: "10", width: "100%" }}>
                <div className="container-fluid">
                    <Link className="navbar-brand fs-1 fst-italic" to="/">Hungriezz</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>  
                            </li>
                            {(localStorage.getItem("authtoken")) ?
                            <li className="nav-item">
                            <Link className="nav-link fs-5  active" aria-current="page" to="/myOrder" >My Orders</Link>  {/* index.css - nav-link color white */}
                        </li> : ""}
                        
                        </ul>
                        {(!localStorage.getItem("authtoken"))?
                        <div className='d-flex'>
                        <Link className="btn bg-white text-info mx-1"  to="/login">Login</Link>  
                        <Link className="btn bg-white text-info mx-1"  to="/createuser">SignUp</Link>  
                        </div>
                          :
                          <div>
                          
                          <div className='btn bg-white text-info mx-2'onClick={()=>{setCartView(true)}}>
                            My Cart {" "}
                            <Badge pill bg="danger">{data.length}</Badge>
                            </div>
                            {cartView ? <Modal onClose={()=>setCartView(false)}><Cart/></Modal>:null}
                            <div className='btn bg-white text-danger mx-2' onClick={handleLogout}>
                          Logout
                          </div>
                            </div>
                            }      
                    </div>
                </div>
            </nav>
        </div>
    )
}