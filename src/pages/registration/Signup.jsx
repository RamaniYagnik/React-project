import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import Mycontext from '../../context/Mycontext'
import { Timestamp, addDoc, collection } from "firebase/firestore"
import { auth, fireDB } from '../../firebase/FirebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import Loader from '../../component/loader/Loader'
import toast from 'react-hot-toast'
import Layout from '../../component/layout/Layout'

const Signup = () => {

    const context = useContext(Mycontext);
    const { loading, setLoading } = context;
    const navigate = useNavigate();

    const [userSignup, setUserSignup] = useState({
        name: "",
        email: "",
        password: "",
        role: "user"
    })

    const userSignupFunction = async () => {
        if (userSignup.name === '' || userSignup.email === '' || userSignup.password === '') {
            toast.error("All Feilds Are Required")
        }
        setLoading(true);
        try {

            const users = await createUserWithEmailAndPassword(auth, userSignup.email, userSignup.password);

            const user = {
                name: userSignup.name,
                email: users.user.email,
                uid: users.user.uid,
                role: userSignup.role,
                time: Timestamp.now(),
                date: new Date().toLocaleString(
                    "en-US",
                    {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                    }
                )
            }
            const userRefrence = collection(fireDB, "user")
            addDoc(userRefrence, user);
            setUserSignup({
                name: "",
                email: "",
                password: ""
            })
            toast.success("Signup Successfully");

            setLoading(false);
            navigate('/login')

        } catch (error) {

            console.log(error);
            setLoading(false);
        }
    }

    return (
        <Layout>
            <div className='flex justify-center items-center h-screen'>
                {loading && <Loader />}
                <div className="login_Form bg-pink-50 px-1 lg:px-8 py-6 border border-pink-100 rounded-xl shadow-md">
                    <div className="mb-5">
                        <h2 className='text-center text-2xl font-bold text-pink-500 '>Signup</h2>
                    </div>
                    <div className="mb-3">
                        <input type='text' placeholder='Enter Full Name' className='bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200'
                            onChange={(e) => setUserSignup({
                                ...userSignup,
                                name: e.target.value
                            })} />
                    </div>
                    <div className="mb-3">
                        <input type='email' placeholder='Enter E-mail' className='bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200'
                            onChange={(e) => setUserSignup({
                                ...userSignup,
                                email: e.target.value
                            })} />
                    </div>
                    <div className="mb-3">
                        <input type='password' placeholder='Enter Password' className='bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200'
                            onChange={(e) => setUserSignup({
                                ...userSignup,
                                password: e.target.value
                            })} />
                    </div>
                    <div className="mb-5">
                        <button onClick={userSignupFunction} type='button' className='bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md '>Signup</button>
                    </div>
                    <div>
                        <h2 className='text-black'>Have an account <Link className=' text-pink-500 font-bold' to={'/login'}>Login</Link></h2>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Signup