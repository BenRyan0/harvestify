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
               <Link className='h-[120px] md-lg:h-[80px] border block rounded-md 0 mx-1'
                 key={i} to='#'>
                  <div className="w-full h-full relative">
                  <img
                    className="h-full w-full rounded-md object-cover"
                    style={{ objectPosition: '60% 10%' }} // Horizontal center (50%) and slightly down vertically (10%)
                    src={c.image || '/path/to/fallback-image.jpg'}
                    alt={c.altText || 'Category image'}
                    onError={(e) => { e.target.src = '/path/to/fallback-image.jpg'; }}
                    />


                    {/* <img className='h-full w-full rounded-md object-cover bg-top' src={c.image} alt="category images" /> */}
                    <div className="absolute bottom-6 w-full mx-auto font-bold left-0 flex flex-col justify-center items-center">
                       <span className='py-[2px] px-6 bg-[#3330305d] text-white'>{c.name}</span>
                       
                    </div>
                  </div>
               </Link>)
          }
     </Carousel>
</div>
)
}

export default Categories