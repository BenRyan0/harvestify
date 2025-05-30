import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Clusters from './pages/Clusters';
import ClusterListings from './pages/ClusterListings'
// import ustersListiClng from './pages/ClustersListing'
import Login from './pages/Login';
import Register from './pages/Register';
import AllUsers from './pages/AllUsers';
import AllListings from './pages/AllListings';
import Card from './pages/Card';
import Details from './pages/Details';
import Shipping from './pages/Shipping';
import AboutUs from './pages/AboutUs';
import PendingOrder from './pages/PendingOrder';
import DistanceCalculator from './pages/DistanceCalculator';
import DistancePriceCalculator from './pages/distancePriceCalculator';
import { useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { get_categories } from './store/reducers/homeReducer';
import CategoryClusters from './pages/CategoryClusters';
import PendingAccount from './pages/NotActiveAccount';
import SearchListings from './pages/SearchListings';
import Payment from './pages/Payment';
import Dashboard from './pages/Dashboard';
import ProtectUser from './utils/ProtectUser';
import Index from './components/dashboard/Index_';
import ChangePassword from './components/dashboard/ChangePassword';
import Deals from './components/dashboard/Deals';
import Wishlist from './components/dashboard/Wishlist';
import Deal from './components/dashboard/Deal';
import DealProgress from './components/dashboard/DealProgress';
import Chat from './components/dashboard/Chat';
import CancellationPAge from './components/dashboard/Cancellation';
import CancellationDeal from './components/dashboard/cancelDeal';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import React from 'react';


// import Wishlist from './components/dashboard/Wishlist';


function App() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
    libraries:['places']
  })
  

  console.log(process.env.REACT_APP_API_KEY)

  const dispatch = useDispatch()


  useEffect(()=>{
    dispatch(get_categories())
  },[])

  return (
   <BrowserRouter>
        <Routes>  
          <Route path='/register' element = {<Register/>}/> 
          <Route path='/login' element = {<Login/>}/> 
          <Route path='/pending' element = {<PendingAccount/>}/> 
          <Route path='/' element = {<Home/>}/>   
          <Route path='/clusters' element = {<CategoryClusters/>}/>   
          <Route path='/clusters/cluster-details/:clusterId' element = {<ClusterListings/>}/>   
          <Route path='/listings' element = {<Clusters/>}/>  



    


          {/* <Route path='/clusters' element = {<Clusters/>}/>   
          <Route path='/listings?' element = {<CategoryClusters/>}/>    */}
          <Route path='/listings/search?' element = {<SearchListings/>}/>   
          <Route path='/card' element = {<Card/>}/>   
          <Route path='/shipping' element = {<Shipping/>}/>   
          <Route path='/payment' element = {<Payment/>}/>   
          {/* <Route path='/listings' element = {<AllListings/>}/>    */}
          <Route path='/listing/details/:slug' element = {<Details/>}/>   
          <Route path='/pending-order' element = {<PendingOrder/>}/>   
          <Route path='/about-us' element = {<AboutUs/>}/>   
          <Route path='/calc' element = {<DistancePriceCalculator/>}/>   
          {/* <Route path='/clusters-listing/cluster' element = {<Clusters/>}/>    */}
          {/* <Route path='/listings' element = {<AllListings/>}/>    */}
          {/* <Route path='/clusters-listing' element = {<ClustersListing/>}/>    */}



          {/* <Route path='/all-tae' element = {<DistanceCalculator/>}/> ///   */}

          <Route path='/dashboard' element = {<ProtectUser/>}>
            <Route path='' element = {<Dashboard/>}>
               <Route path='' element={<Index/>}/> 
               <Route path='my-orders' element={<Deals/>}/> 
               <Route path='deal/details/:dealId' element={<Deal/>}/> 
               <Route path='deal/detail/:dealId' element={<DealProgress/>}/> 
               <Route path='my-wishlist' element={<Wishlist/>}/> 
               <Route path='change-password' element={<ChangePassword/>}/> 

               <Route path='chat' element={<Chat/>}/> 
               <Route path='chat/:sellerId' element={<Chat/>}/> 
               <Route path='cancellation/:transactionId' element={<CancellationPAge/>}/> 
               <Route path='cancellation-deal/:dealId' element={<CancellationDeal/>}/> 
             
            </Route>
          </Route>
         

        </Routes>
   </BrowserRouter>
  );
}

export default App;
