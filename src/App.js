import React from 'react';
import Home from './Component/Home/Home';
import Footer from './Shared/Footer/Footer';
import Header from './Shared/Header/Header';
import {
  Routes,
  Route,
} from "react-router-dom";
import SignIn from './Component/SignIn/SignIn';
import ForgetPassword from './Component/ForgetPassword/ForgetPassword';
import RequireAuth from './Component/RequireAuth/RequireAuth';
import Purchase from './Component/Purchase/Purchase';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import AddTool from './Component/AddTool/AddTool';
import Dashboard from './Dashboard/Dashboard';
import MyOrders from './Dashboard/MyOrders/MyOrders'
import MyProfile from './Dashboard/MyProfile/MyProfile';
import MyReview from './Dashboard/MyReview/MyReview';
import SignUp from './Component/SignUp/SignUp';
import AllUsers from './Dashboard/AllUsers/AllUsers';
import AllOrders from './Dashboard/AllOrders/AllOrders';
import RequireAdmin from './Component/RequireAdmin/RequireAdmin';
import AllTools from './Component/Tools/AllTools';
import ManageTools from './Dashboard/ManageTools/ManageTools';
import NotFoundPage from './Component/NotFoundPage/NotFoundPage';
import Blog from './Component/Blog/Blog';
import About from './Component/About/About';
import Payment from './Dashboard/Payment/Payment';
import MyPortfolio from './Dashboard/MyPortfolio/MyPortfolio';
const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="portfolio" element={<MyPortfolio />}></Route>
        <Route exact path="*" element={<NotFoundPage />}></Route>
        <Route path="signUp" element={<SignUp />}></Route>
        <Route path="blog" element={<Blog />}></Route>
        <Route path="about" element={<About />}></Route>
        <Route path="signIn" element={<SignIn />}></Route>
        <Route path="forgetPassword" element={<ForgetPassword />}></Route>
        {/* <RequireAuth></RequireAuth> */}
        <Route path="tools" element={
          <RequireAuth >
            <AllTools />
          </RequireAuth>
        }>
        </Route>
        <Route path='purchase/:id' element={
          <RequireAuth>
            <Purchase />
          </RequireAuth>
        }>
        </Route>

        <Route path="dashboard" element={<RequireAuth><Dashboard /></RequireAuth>
        }>
          <Route index element={<MyOrders />}></Route>
          <Route path="review" element={<MyReview />}></Route>
          <Route path="profile" element={<MyProfile />}></Route>
          <Route path="payment/:id" element={<RequireAuth><Payment /></RequireAuth>}></Route>
          <Route path="users" element={<RequireAdmin><AllUsers /></RequireAdmin>}></Route>
          <Route path="add-tool" element={<RequireAdmin><AddTool /></RequireAdmin>}></Route>
          <Route path="manage-tool" element={<RequireAdmin><ManageTools /></RequireAdmin>}></Route>
          <Route path="orders" element={<RequireAdmin><AllOrders /></RequireAdmin>}></Route>
        </Route>
      </Routes>
      <ToastContainer />
      <Footer />
    </>
  );
};

export default App;