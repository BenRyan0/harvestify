import React from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import {Link} from 'react-router-dom'
import { FaThList } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux'


const Categories = () => {
    const {categories} = useSelector(state=>state.home)
//   const categories = [
//     "Crops",
//     "Livestock",
//     "Aquatic",
//     "Processed",
//     "Fruits",
//     "vegetables"
//     ]

  const responsive = {
    superLargeDesktop : {
        breakpoint : { max: 4000, min: 3000},
        items: 4,
    },
    desktop : {
        breakpoint : { max: 3000, min: 1024},
        items: 4,
    },
    tablet : {
        breakpoint : { max: 1024, min: 464},
        items: 4,
    },
    mdtablet : {
        breakpoint : { max: 991, min: 464},
        items: 4,
    },
    mobile : {
        breakpoint : { max: 640, min: 0},
        items: 2,
    },
   smmobile : {
        breakpoint : { max: 640, min: 0},
        items: 2,
    },
   xsmobile : {
        breakpoint : { max: 440, min: 0},
        items: 1,
    },
}
return (
<div className='w-[85%] bg-transparent mx-auto relative'>
      <Carousel className='rounded-lg'
          autoPlay = {true}
          infinite = {true}
          arrows={true}
          responsive={responsive}
          transitionDuration={500}
      >
          {
               categories.map((c, i)=>
               <Link className='h-[185px] md-lg:h-[100px] border block rounded-md'
                 key={i} to='#'>
                  <div className="w-full h-full relative">
                    <img className='h-full w-full rounded-md' src={c.image} alt="category images" />
                    <div className="absolute bottom-6 w-full mx-auto font-bold left-0 flex flex-col justify-center items-center">
                       <span className='py-[2px] px-6 bg-[#3330305d] text-white'>{c.name}</span>
                       {/* <button className='text-sm md-lg:text-xs font-semibold bg-accent py-1 px-2 rounded-md border-2 border-accent text-white flex items-center gap-1'>
                        <span><FaThList /></span>Check DTI Suggested prices</button> */}
                       {/* <span className='text-sm'>Check Suggested prices</span> */}
                    </div>
                  </div>
               </Link>)
          }
     </Carousel>
</div>
)
}

export default Categories