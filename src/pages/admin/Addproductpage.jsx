import React from 'react'
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { useContext, useState } from "react";
import Mycontext from '../../context/Mycontext';
import toast from "react-hot-toast";
import { fireDB } from '../../firebase/FirebaseConfig';
import { useNavigate } from 'react-router-dom';
import Loader from '../../component/loader/Loader';

const categoryList = [
  {
    name: 'fashion'
  },
  {
    name: 'shirt'
  },
  {
    name: 'jacket'
  },
  {
    name: 'mobile'
  },
  {
    name: 'laptop'
  },
  {
    name: 'shoes'
  },
  {
    name: 'home'
  },
  {
    name: 'books'
  }
]

const Addproductpage = () => {

  const context = useContext(Mycontext);
  const { loading, setLoading } = context;

  const navigate = useNavigate()

  const [product, setProduct] = useState({
    title: "",
    price: "",
    offer: "",
    productImageUrl: "",
    category: "",
    description: "",
    quantity: 1,
    time: Timestamp.now(),
    date: new Date().toLocaleString(
      "en-US",
      {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }
    )
  });

  const addProductFunction = async () => {
    if (product.offer == "" || product.title == "" || product.price == "" || product.productImageUrl == "" || product.category == "" || product.description == "") {
      return toast.error("all fields are required")
    }
    setLoading(true);
    try {
      const productRef = collection(fireDB, 'products');
      await addDoc(productRef, product)
      toast.success("Add product successfully");
      navigate('/admindashboard')
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
      toast.error("Add product failed");
    }
  }

  return (
    <div>
      <div className='flex justify-center items-center h-screen'>
        {loading && <Loader />}
        <div className="login_Form bg-pink-50 px-8 py-6 border border-pink-100 rounded-xl shadow-md">
          <div className='mb-5'>
            <h2 className='text-center text-2xl font-bold text-pink-500'>Add Product</h2>
          </div>
          <div className='mb-3'>
            <input type="text" name="title" placeholder='Product Title' className='bg-pink-50 text-pink-300 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300' value={product.title}
              onChange={(e) => {
                setProduct({
                  ...product,
                  title: e.target.value
                })
              }}
            />
          </div>
          <div className='mb-3'>
            <input type="text" name="price" placeholder='Product Price' className='bg-pink-50 text-pink-300 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300' value={product.price}
              onChange={(e) => {
                setProduct({
                  ...product,
                  price: e.target.value
                })
              }}
            />
          </div>
          <div className='mb-3'>
            <input type="text" name="offer" placeholder='Product Offer' className='bg-pink-50 text-pink-300 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300' value={product.offer}
              onChange={(e) => {
                setProduct({
                  ...product,
                  offer: e.target.value
                })
              }}
            />
          </div>
          <div className='mb-3'>
            <input type="text" name="productImageUrl" placeholder='Product Image URL' className='bg-pink-50 text-pink-300 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300' value={product.productImageUrl}
              onChange={(e) => {
                setProduct({
                  ...product,
                  productImageUrl: e.target.value
                })
              }}
            />
          </div>
          <div className='mb-3'>
            <select className="w-full px-1 py-2 text-pink-300 bg-pink-50 border border-pink-200 rounded-md outline-none "
              value={product.category}
              onChange={(e) => {
                setProduct({
                  ...product,
                  category: e.target.value
                })
              }}
            >
              <option disabled>Select Product Category</option>
              {categoryList.map((value, index) => {
                const { name } = value
                return(
                  <option className=" first-letter:uppercase" key={index} value={name}>{name}</option>
                )
              })}
            </select>
          </div>
          <div className='mb-3'>
            <textarea name="description" type='text' placeholder="Product Description" rows="5" className=" w-full px-2 py-1 text-pink-300 bg-pink-50 border border-pink-200 rounded-md outline-none placeholder-pink-300 " value={product.description}
              onChange={(e) => {
                setProduct({
                  ...product,
                  description: e.target.value
                })
              }}
            ></textarea>
          </div>
          <div className='mb-3'>
            <button onClick={addProductFunction} type='button' className='bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md'>Add Product</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Addproductpage