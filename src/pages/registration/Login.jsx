import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from "react"
import Mycontext from '../../context/Mycontext'
import toast from 'react-hot-toast'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, fireDB } from '../../firebase/FirebaseConfig'
import Loader from '../../component/loader/Loader'
import { collection, onSnapshot, query, where } from "firebase/firestore"

const Login = () => {

    const context = useContext(Mycontext)
    const { loading, setLoading } = context
    const navigate = useNavigate();

    const [userLogin, setUserLogin] = useState({
        email: "",
        password: ""
    })

    const userLoginFunction = async () => {
        if (userLogin.email === "" || userLogin.password === "") {
            toast.error("All Fields are required")
        }

        setLoading(true);

        const users = await signInWithEmailAndPassword(auth, userLogin.email, userLogin.password);

        try {

            const q = query(
                collection(fireDB, "user"),
                where('uid', '==', users?.user?.uid)
            );
            try {
                const data = onSnapshot(q, (QuerySnapShot) => {
                    let user;
                    QuerySnapShot.forEach((doc) => user = doc.data())
                    localStorage.setItem("users", JSON.stringify(user))
                    setUserLogin({
                        email: "",
                        password: ""
                    })
                    toast.success("Login Successfully");
                    setLoading(false);
                    if (user.role === "user") {
                        navigate('/userdashboard');
                    } else {
                        navigate('/admindashboard');
                    }
                });

                return () => data;

            } catch (error) {
                console.log(error);
                setLoading(false);
            }

        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error("Login Failed");
        }
    }

    return (
        <div className='flex justify-center items-center h-screen'>
            {loading && <Loader/>}
            <div className="login_Form bg-pink-50 px-1 lg:px-8 py-6 border border-pink-100 rounded-xl shadow-md">
                <div className="mb-5">
                    <h2 className='text-center text-2xl font-bold text-pink-500 '>Login</h2>
                </div>
                <div className="mb-3">
                    <input type='email' placeholder='Enter E-mail' className='bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200' 
                    onChange={(e) => {
                        setUserLogin({
                            ...userLogin,
                            email:e.target.value
                        })
                    }} />
                </div>
                <div className="mb-3">
                    <input type='password' placeholder='Enter Password' className='bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200' 
                    onChange={(e) => {
                        setUserLogin({
                            ...userLogin,
                            password:e.target.value
                        })
                    }}
                    />
                </div>
                <div className="mb-5">
                    <button type='button' onClick={userLoginFunction} className='bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md '>Login</button>
                </div>
                <div>
                    <h2 className='text-black'>Don't Have an account <Link className=' text-pink-500 font-bold' to={'/signup'}>Signup</Link></h2>
                </div>
            </div>
        </div>
    )
}

export default Login