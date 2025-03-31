import React from 'react'
import { useState, useEffect } from 'react'
import Mycontext from './Mycontext'
import { collection, onSnapshot, deleteDoc, doc, orderBy, query, } from 'firebase/firestore'
import { fireDB } from '../firebase/FirebaseConfig'
import toast from 'react-hot-toast'

function MyState({ children }) {
  const [loading, setLoading] = useState(false);

  const [getAllProduct, setGetAllProduct] = useState([]);

  const getAllProductFunction = async () => {
    setLoading(true);

    try {

      const q = query(
        collection(fireDB, "products"),
        orderBy('time')
      );
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productArray = [];
        QuerySnapshot.forEach((doc) => {
          productArray.push({ ...doc.data(), id: doc.id });
        });
        setGetAllProduct(productArray);
        setLoading(false);
      })
      return () => data;
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const [getAllOrder, setGetAllOrder] = useState([]);

  const getAllOrderFunction = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(fireDB, "order"),
        orderBy('time')
      );
      const data = onSnapshot(q, (QuerySnapshot) => {
        let orderArray = [];
        QuerySnapshot.forEach((doc) => {
          orderArray.push({ ...doc.data(), id: doc.id });
        });
        setGetAllOrder(orderArray);
        setLoading(false);
      });
      return () => data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const deleteproduct = async (id) => {
    setLoading(true)
    try {
      await deleteDoc(doc(fireDB, 'order', id))
      toast.success('Order Deleted successfully')
      getAllOrderFunction();
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const [getAllUser, setGetAllUser] = useState([]);

  const getAllUserFunction = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(fireDB, "user"),
        orderBy('time')
      );
      const data = onSnapshot(q, (QuerySnapshot) => {
        let userArray = [];
        QuerySnapshot.forEach((doc) => {
          userArray.push({ ...doc.data(), id: doc.id });
        });
        setGetAllUser(userArray);
        setLoading(false);
      });
      return () => data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllProductFunction();
    getAllOrderFunction();
    getAllUserFunction();
  }, [])

  return (
    <Mycontext.Provider value={{ loading, setLoading, getAllProduct, getAllProductFunction, getAllOrder, deleteproduct, getAllUser }}>
      {children}
    </Mycontext.Provider>
  )
}
export default MyState;