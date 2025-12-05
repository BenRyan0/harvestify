import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Clusters from './pages/Clusters';
import ClusterListings from './pages/ClusterListings'
import Login from './pages/Login';
import Register from './pages/Register';
import Card from './pages/Card';
import Details from './pages/Details';
import Shipping from './pages/Shipping';
import AboutUs from './pages/AboutUs';
import PendingOrder from './pages/PendingOrder';
import DistancePriceCalculator from './pages/distancePriceCalculator';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect} from 'react';
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
import { useJsApiLoader } from '@react-google-maps/api'
import { wakeBackend } from './store/reducers/authReducer';


// import Wishlist from './components/dashboard/Wishlist';


function App() {
   const dispatch = useDispatch()
   const {isBackendUp} = useSelector((state)=> state.auth)
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
    libraries:['places']
  })

  useEffect(()=>{
    if(isBackendUp){
 dispatch(get_categories())
    }
   
  },[])

  useEffect(()=>{
    let retryInterval;

    if(!isBackendUp){
      dispatch(wakeBackend());


      retryInterval = setInterval(() => {
        dispatch(wakeBackend())
      }, 30000);
    }



    return()=>{
      if(retryInterval) clearInterval(retryInterval)
    }
  },[isBackendUp, dispatch])



  console.log("process.env.REACT_APP_API_KEY")
  console.log(process.env.REACT_APP_API_KEY)

if(!isBackendUp){
  return(
      <div className="loading-screen h-screen bg-green-800/90 flex justify-center items-center">
        <div className="relative inline-flex">
          <div className="rounded-full bg-green-400 h-[50px] w-[50px] inline-block mr-2">
            <img
              src="/logo512.png"
              className="w-full h-full"
              alt=""
            />
          </div>
          <div className="absolute animate-ping rounded-full bg-green-400 h-[50px] w-[50px] mr-2"></div>
        </div>
        <div className="absolute bottom-20 bg-white p-2 rounded-sm max-w-[400px]">
          <h2 className="font-bold text-[10px]">Disclaimer: </h2>
          <p className="text-center pt-2 text-[9px]">Our backend runs on Render’s free tier, which goes to sleep when inactive. This can cause the first request to load slowly. We added a loading screen to show while the server wakes up. After that, everything will run normally.</p>
        </div>
      </div>
  )
}

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
          <Route path='/listings/search?' element = {<SearchListings/>}/>   
          <Route path='/card' element = {<Card/>}/>   
          <Route path='/shipping' element = {<Shipping/>}/>   
          <Route path='/payment' element = {<Payment/>}/>   
          <Route path='/listing/details/:slug' element = {<Details/>}/>   
          <Route path='/pending-order' element = {<PendingOrder/>}/>   
          <Route path='/about-us' element = {<AboutUs/>}/>   
          <Route path='/calc' element = {<DistancePriceCalculator/>}/>   
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
