import React from 'react'
import Searchbar from '../searchbar/Searchbar';
import { Link,useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Navbar = () => {

    const user = JSON.parse(localStorage.getItem('users'));
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear('users');
        navigate("/login")
    }

    const cartItems = useSelector((state) => state.cart || []) 

    const navbar = (

        <ul className='flex space-x-3 text-white font-medium text-md px-5'>
            
            <li>
                <Link to={'/'} >Home</Link>
            </li>

            <li>
                <Link to={'/allproducts'} >All products</Link>
            </li>

            {!user ? <li>
                <Link to={'/signup'} >SignUp</Link>
            </li> : ''}

            {!user ? <li>
                <Link to={'/login'} >Login</Link>
            </li> : ''}

            {user?.role === "user" && <li>
                <Link to={'/userdashboard'}>User</Link>
            </li>}

            {user?.role === "admin" && <li>
                <Link to={'/admindashboard'}>Admin</Link>
            </li>}

            {user && <li className=" cursor-pointer" onClick={logout}>
                Logout
            </li>}

            <li>
                <Link to={'/cart'} >Cart({cartItems.length})</Link>
            </li>

        </ul>
    )

    return (

        <div className='bg-pink-600 sticky top-0'>
            <div className='lg:flex lg:justify-between lg:px-3 items-center py-3'>
                <div className='left py-3 lg:py-0'>
                    <Link to={'/'} >
                        <h2 className='font-bold text-white text-2xl text-center' >E-BHARAT</h2>
                    </Link>
                </div>
                <div className='right flex justify-center mb-4 lg:mb-0'>
                    {navbar}
                </div>
                <Searchbar/>
            </div>
        </div>

    )
}

export default Navbar;