import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Headers from '../components/Headers'
import Banner from '../components/Banner'
import Categories from '../components/Categories'
import FeaturedListings from '../components/listings/FeaturedListings'
import Listings from '../components/listings/Listings'
import Footer from '../components/Footer'
import { get_categories, get_listings } from '../store/reducers/homeReducer'

import { useTranslation } from 'react-i18next';


const Home = () => {
  const dispatch = useDispatch()
  const {t} = useTranslation()

  const {categories,allListings,featuredListings, latestListings,topRatedListings,discounted_listings} = useSelector(state=>state.home)

  useEffect(() => {
    dispatch(get_listings());
  }, []); 


  return (
    <div className='w-full bg-main'>
        <Headers categories={categories}/>
        <Banner/>
        <div className=''>
          <Categories categories={categories}/>
          
        </div>
        <div className="py-[45px]">
          {/* <FeaturedListings listings={featuredListings}/> */}
          <FeaturedListings listings={allListings}/>
        </div>
        <div className="py-10">
          <div className="w-[85%] flex flex-wrap mx-auto">
            <div className="grid w-full grid-cols-3 xl:grid-cols-2 lg:grid-cols-2 md-lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1 xs:grid-cols-1 gap-2">
              <div className="overflow-hidden">
                  <Listings listings={latestListings}  title={t("latestProducts")}/>
              </div>
              <div className="overflow-hidden">
                  <Listings listings={topRatedListings} title={t("")}/>
              </div>
              <div className="overflow-hidden">
                  <Listings listings={discounted_listings} title='Discounted Listings'/>
              </div>
              {/* <div className="overflow-hidden">
                  <Listings  title='Listings Near Me'/>
              </div> */}
            </div>

          </div>
        </div>
        <Footer/>
    </div>
  )
}
document.title = "𝘏𝘢𝘳𝘷𝘦𝘴𝘵𝘪𝘧𝘺"
export default Home