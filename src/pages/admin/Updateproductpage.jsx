import { useNavigate, useParams } from "react-router";
import Mycontext from "../../context/Mycontext";
import { useContext, useEffect, useState } from "react";
import { Timestamp, doc, getDoc, setDoc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";
import Loader from "../../component/loader/Loader";

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

const Updateproductpage = () => {

  const context = useContext(Mycontext);
  const { loading, setLoading, getAllProductFunction } = context;

  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);

  const [product, setProduct] = useState({
    title: "",
    price: "",
    offer: "",
    productImageUrl: "",
    category: "",
    description: "",
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

  const getSingleProductFunction = async () => {
    setLoading(true);

    try {

      const productTemp = await getDoc(doc(fireDB, 'products', id))
      const product = productTemp.data();

      setProduct({
        title: product?.title,
        price: product?.price,
        offer: product?.offer,
        productImageUrl: product?.productImageUrl,
        category: product?.category,
        description: product?.description,
        quantity: product?.quantity,
        time: product?.time,
        date: product?.date
      })
      setLoading(false);

    } catch (error) {
      console.log(error)
      setLoading(false);
    }

  }

  const updateProduct = async () => {
    setLoading(true)
    try {
      await setDoc(doc(fireDB, 'products', id), product)
      toast.success("Product Updated successfully")
      getAllProductFunction();
      setLoading(false)
      navigate('/admindashboard')
    } catch (error) {
      console.log(error)
      setLoading(false)
    }

  }

  useEffect(() => {
    getSingleProductFunction();
  }, []);

  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        {loading && <Loader />}
        <div className="login_Form bg-pink-50 px-8 py-6 border border-pink-100 rounded-xl shadow-md">

          <div className="mb-5">
            <h2 className="text-center text-2xl font-bold text-pink-500">Update Product</h2>
          </div>

          <div className="mb-3">
            <input type="text" name="title" placeholder="Product Title" className='bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300' value={product.title}
              onChange={(e) => {
                setProduct({
                  ...product,
                  title: e.target.value
                })
              }}
            />
          </div>

          <div className="mb-3">
            <input type="text" name="price" placeholder="Product Price" className="bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300" value={product.price}
              onChange={(e) => {
                setProduct({
                  ...product,
                  price: e.target.value
                })
              }}
            />
          </div>

          <div className="mb-3">
            <input type="text" name="offer" placeholder="Product Offer" className="bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300" value={product.offer}
              onChange={(e) => {
                setProduct({
                  ...product,
                  offer: e.target.value
                })
              }}
            />
          </div>

          <div className="mb-3">
            <input type="text" name="productImageUrl" placeholder="ProductImageUrl" className="bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300" value={product.productImageUrl}
              onChange={(e) => {
                setProduct({
                  ...product,
                  productImageUrl: e.target.value
                })
              }}
            />
          </div>

          <div className="mb-3">
            <select className="w-full px-1 py-2 text-pink-300 bg-pink-50 border border-pink-200 rounded-md outline-none" value={product.category}
              onChange={(e) => {
                setProduct({
                  ...product,
                  category: e.target.value
                })
              }}>
              <option disabled>Select Product Category</option>
              {categoryList.map((value, index) => {
                const { name } = value
                return (
                  <option className=" first-letter:uppercase" key={index} value={name}>{name}</option>
                )
              })}
            </select>
          </div>

          <div className="mb-3">
            <textarea name="description" placeholder="Product Description" rows="5" className=" w-full px-2 py-1 text-pink-300 bg-pink-50 border border-pink-200 rounded-md outline-none placeholder-pink-300" value={product.description}
              onChange={(e) => {
                setProduct({
                  ...product,
                  description: e.target.value
                })
              }}
            ></textarea>
          </div>

          <div className="mb-3">
            <button type="button" onClick={updateProduct} className='bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md '>Update Product</button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Updateproductpage