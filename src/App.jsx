import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Nopage from './pages/nopage/Nopage'
import Homepage from './pages/home/Homepage'
import Productinfo from './pages/productinfo/Productinfo'
import Scrolltop from './component/scrolltop/Scrolltop'
import Cart from './pages/cart/Cart'
import Allproduct from './pages/allproduct/Allproduct'
import Signup from './pages/registration/Signup'
import Login from './pages/registration/Login'
import Userdashboard from './pages/user/Userdashboard'
import Admindashboard from './pages/admin/Admindashboard'
import Addproductpage from './pages/admin/Addproductpage'
import MyState from './context/Mystate'
import { ProtectedRouteForAdmin } from './protectedroute/ProtectedRouteForAdmin'
import { ProtectedRouteForUser } from './protectedroute/ProtectedRouteForUser'
import Updateproductpage from './pages/admin/Updateproductpage'
import { Toaster } from 'react-hot-toast'
import Categorypage from './pages/category/Categorypage'

function App() {

  return (
    <MyState>
      <Router>
        <Scrolltop />
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/*' element={<Nopage />} />
          <Route path='/productinfo/:id' element={<Productinfo />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/allproducts' element={<Allproduct />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/categorypage/:categoryname' element={<Categorypage/>} />
          <Route path='/userdashboard' element={
            <ProtectedRouteForUser>
              <Userdashboard />
            </ProtectedRouteForUser>
          } />
          <Route path='/admindashboard' element={
            <ProtectedRouteForAdmin>
              <Admindashboard />
            </ProtectedRouteForAdmin>
          } />
          <Route path='/addproduct' element={
            <ProtectedRouteForAdmin>
              <Addproductpage />
            </ProtectedRouteForAdmin>
          } />
          <Route path='/updateproduct/:id' element={
            <ProtectedRouteForAdmin>
              <Updateproductpage />
            </ProtectedRouteForAdmin>
          } />
        </Routes>
        <Toaster/>
      </Router>
    </MyState>
  )
}

export default App
