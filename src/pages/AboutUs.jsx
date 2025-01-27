import React from 'react'
import Headers from './../components/Headers';
import Footer from './../components/Footer';

const AboutUs = () => {
  return (
    <div>
        <Headers/>
            
      <div class="w-[85%] mx-auto">
      <header class="bg-green-500 text-white text-center py-12 mt-10 rounded-md">
        <h1 class="text-4xl font-bold italic">Harvestify.com</h1>
        <p className='text-xs italic'>Bridging Farmers and Communities, One Harvest at a Time</p>
      </header>

      <section class="text-center py-12 px-4 text-slate-500">
        <h2 class="text-2xl font-bold uppercase text-slate-500">About Us</h2>
        <p class="mt-4 text-slate-500 max-w-2xl mx-auto">
           Welcome to Harvestify, where technology meets agriculture to create opportunities, empower farmers, and bring fresh, locally-sourced produce directly to your fingertips.
        </p>
      </section>
      <section class="text-center py-12 px-4 text-slate-500">
        <h2 class="text-2xl font-bold uppercase text-slate-500">Our Mission</h2>
        <p class="mt-4 text-slate-500 max-w-2xl mx-auto">
          To revolutionize the agricultural marketplace in Davao Oriental. Our platform is designed to connect farmers,  traders, and buyers in a seamless, transparent, and sustainable way.
        </p>
      </section>
      <section class="text-center py-12 px-4 text-slate-500">
        <h2 class="text-2xl font-bold uppercase text-slate-500">Our Vision</h2>
        <p class="mt-4 text-slate-500 max-w-2xl mx-auto">
            We envision a thriving future where farmers are empowered, buyers trust their sources, and local agriculture thrives through innovation and inclusivity. Harvestify is committed to leading this transformation, one transaction at a time.
        </p>
      </section>

      {/* <section class="bg-green-500 text-white py-12 px-4">
        <h2 class="text-2xl font-bold text-center">Our Mission</h2>
        <p class="mt-4 text-center max-w-2xl mx-auto">
           To revolutionize the agricultural marketplace in Davao Oriental. Our platform is designed to connect farmers,  traders, and buyers in a seamless, transparent, and sustainable way.
        </p>
      </section> */}

      {/* <section class="text-center py-12 px-4">
        <h2 class="text-2xl font-bold">Our Healthcare Specialties</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-8">
          <div class="p-4 shadow-lg rounded-lg bg-green-100 hover:bg-green-200 transition-colors">
            <h3 class="text-xl font-bold">Cardiology</h3>
          </div>
          <div class="p-4 shadow-lg rounded-lg bg-green-100 hover:bg-green-200 transition-colors">
            <h3 class="text-xl font-bold">Neurology</h3>
          </div>
          <div class="p-4 shadow-lg rounded-lg bg-green-100 hover:bg-green-200 transition-colors">
            <h3 class="text-xl font-bold">Pediatrics</h3>
          </div>
          <div class="p-4 shadow-lg rounded-lg bg-green-100 hover:bg-green-200 transition-colors">
            <h3 class="text-xl font-bold">Oncology</h3>
          </div>
        </div>
      </section> */}

      {/* <section class="bg-gray-100 py-12 px-4">
        <h2 class="text-2xl font-bold text-center">State-Of-The-Art Technology</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 max-w-5xl mx-auto">
          <div class="p-4 shadow-lg rounded-lg bg-white hover:shadow-xl transition-shadow">
            <h3 class="text-xl font-bold">Advanced Diagnostics</h3>
            <p class="text-gray-700 mt-2">We utilize the latest technology for accurate diagnostics.</p>
          </div>
          <div class="p-4 shadow-lg rounded-lg bg-white hover:shadow-xl transition-shadow">
            <h3 class="text-xl font-bold">Telemedicine</h3>
            <p class="text-gray-700 mt-2">Consult with our specialists from the comfort of your home.</p>
          </div>
          <div class="p-4 shadow-lg rounded-lg bg-white hover:shadow-xl transition-shadow">
            <h3 class="text-xl font-bold">Robotic Surgery</h3>
            <p class="text-gray-700 mt-2">Minimally invasive procedures with precision.</p>
          </div>
          <div class="p-4 shadow-lg rounded-lg bg-white hover:shadow-xl transition-shadow">
            <h3 class="text-xl font-bold">Electronic Health Records</h3>
            <p class="text-gray-700 mt-2">Secure and easy access to your medical records.</p>
          </div>
        </div>
      </section> */}

      {/* <section class="text-center py-12 px-4">
        <h2 class="text-2xl font-bold">Committed To Your Health And Happiness</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-8">
          <div class="p-4 shadow-lg rounded-lg bg-green-100 hover:bg-green-200 transition-colors">
            <h3 class="text-xl font-bold">Book Appointment</h3>
          </div>
          <div class="p-4 shadow-lg rounded-lg bg-green-100 hover:bg-green-200 transition-colors">
            <h3 class="text-xl font-bold">Informed Staff</h3>
          </div>
          <div class="p-4 shadow-lg rounded-lg bg-green-100 hover:bg-green-200 transition-colors">
            <h3 class="text-xl font-bold">Total Health</h3>
          </div>
          <div class="p-4 shadow-lg rounded-lg bg-green-100 hover:bg-green-200 transition-colors">
            <h3 class="text-xl font-bold">Get Consultation</h3>
          </div>
        </div>
      </section> */}

      {/* <section class="bg-green-500 text-white text-center py-12 px-4">
        <h2 class="text-2xl font-bold">Why Choose Harvestify?</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8 max-w-5xl mx-auto">
          <div class="p-4 shadow-lg rounded-lg bg-green-600 hover:bg-green-500 transition-colors">
          <h3 class="mt-4 font-bold uppercase text-xl">Empowering Farmers</h3>
            <p>We give farmers the tools they need to showcase their harvests, manage schedules, and connect directly with buyers, transforming their market access.</p>
            
          </div>
          <div class="p-4 shadow-lg rounded-lg bg-green-600 hover:bg-green-500 transition-colors">
          <h3 class="mt-4 font-bold uppercase text-xl">Simplifying Trade</h3>
            <p>Our user-friendly platform makes it easy to discover, negotiate, and purchase fresh produce, whether you’re at home or on the go.</p>
            
          </div>
          <div class="p-4 shadow-lg rounded-lg bg-green-600 hover:bg-green-500 transition-colors">
          <h3 class="mt-4 font-bold uppercase text-xl">Fostering Sustainability</h3>
            <p>By promoting local sourcing and reducing food waste, we’re building a marketplace that cares for both the community and the environment.</p>
            
          </div>
          <div class="p-4 shadow-lg rounded-lg bg-green-600 hover:bg-green-500 transition-colors px-5">
          <h3 class="mt-4 font-bold uppercase text-xl">Building Community</h3>
            <p>Harvestify is more than a marketplace—it’s a movement to strengthen our local agricultural sector and foster connections between farmers and consumers.</p>
            
          </div>
         
        </div>
      </section> */}

      <section class="text-center py-12 px-4 w-full bg-primary rounded-md text-white">
        <h2 class="text-2xl font-bold uppercase">Why Choose Harvestify?</h2>
        <div class="mt-8">
          <div class="p-4 border rounded-lg shadow-md transition transform hover:scale-95 scale-90 md-lg:px-5 px-32 bg-white text-slate-500">
            <h3 class="text-xl font-bold">Empowering Farmers</h3>
            <p class="mt-2">We give farmers the tools they need to showcase their harvests, manage schedules, and connect directly with buyers, transforming their market access.</p>
          </div>
          <div class="p-4 border rounded-lg shadow-md transition transform hover:scale-95 scale-90 md-lg:px-5 px-32 bg-white text-slate-500">
            <h3 class="text-xl font-bold">Simplifying Trade</h3>
            <p class="mt-2">Our user-friendly platform makes it easy to discover, negotiate, and purchase fresh produce, whether you’re at home or on the go.</p>
          </div>
          <div class="p-4 border rounded-lg shadow-md transition transform hover:scale-95 scale-90 md-lg:px-5 px-32 bg-white text-slate-500">
            <h3 class="text-xl font-bold">Fostering Sustainability</h3>
            <p class="mt-2">By promoting local sourcing and reducing food waste, we’re building a marketplace that cares for both the community and the environment.</p>
          </div>
          <div class="p-4 border rounded-lg shadow-md transition transform hover:scale-95 scale-90 md-lg:px-5 px-32 bg-white text-slate-500">
            <h3 class="text-xl font-bold">Building Community</h3>
            <p class="mt-2">Harvestify is more than a marketplace—it’s a movement to strengthen our local agricultural sector and foster connections between farmers and consumers.</p>
          </div>
        </div>
      </section>
      <section class="text-center py-12 px-4 w-full flex flex-row md-lg:flex-col justify-center items-start gap-16 md-lg:gap-1">
        <div class="px-2 py-4 mt-16 flex flex-col justify-center items-center text-center w-3/12 md-lg:w-full">
            <img class="inline-flex object-cover border-4 border-primaryDark rounded-full shadow-[5px_5px_0_0_rgba(0,0,0,1)] shadow-primaryDark/100 bg-indigo-50 text-primaryDark h-24 w-24 !h-48 !w-48" src="/images/Team/EASHEA.jpg"  alt="" />
        <h1 class="text-xl text-gray-500 font-bold mt-2 text-wrap w-full">
          Eashea Zamantha Carriedo
        </h1>
        <h2 class="text-base md:text-xl text-gray-500 font-bold">
          Lead Software Engineer
        </h2>
        <ul class="flex flex-row justify-center items-center mt-2">
          <li class="mx-2">
            <a href="https://github.com/easheacarriedo"  aria-label="GitHub">
              <svg class="h-[20px] text-primaryDark hover:text-green-700/50" fill="currentColor" role="img" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <title>GitHub</title>
                <path
                  d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12">
                </path>
              </svg> </a>
          </li>

          <li class="mx-2">
            <a href="https://www.facebook.com/sheacarriedo" aria-label="LinkedIn">
              <svg class="h-[24px] pb-[1px] text-primaryDark hover:text-green-700/50" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier">
              <title>Facebook Profile</title>
                 <path d="M12 2.03998C6.5 2.03998 2 6.52998 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.84998C10.44 7.33998 11.93 5.95998 14.22 5.95998C15.31 5.95998 16.45 6.14998 16.45 6.14998V8.61998H15.19C13.95 8.61998 13.56 9.38998 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C15.9164 21.5878 18.0622 20.3855 19.6099 18.57C21.1576 16.7546 22.0054 14.4456 22 12.06C22 6.52998 17.5 2.03998 12 2.03998Z"></path> </g>
              </svg>              
              </a>
          </li>

          <li class="mx-2">
            <a href="mailto:easheacarriedo05@gmail.com" aria-label="LinkedIn">
              <svg class="h-[24px] pb-[1px] text-primaryDark hover:text-green-700/50" fill="currentColor" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier">
                <title>gmail</title> 
                <path d="M30.996 7.824v17.381c0 0 0 0 0 0.001 0 1.129-0.915 2.044-2.044 2.044-0 0-0 0-0.001 0h-4.772v-11.587l-8.179 6.136-8.179-6.136v11.588h-4.772c0 0 0 0-0 0-1.129 0-2.044-0.915-2.044-2.044 0-0 0-0.001 0-0.001v0-17.381c0-0 0-0.001 0-0.001 0-1.694 1.373-3.067 3.067-3.067 0.694 0 1.334 0.231 1.848 0.619l-0.008-0.006 10.088 7.567 10.088-7.567c0.506-0.383 1.146-0.613 1.84-0.613 1.694 0 3.067 1.373 3.067 3.067v0z"></path> </g></svg>
              
              
              </a>
          </li>

       
        </ul>
        </div>

        <div class="px-2 py-4 mt-16 flex flex-col justify-center items-center text-center w-3/12 md-lg:w-full">
            <img class="inline-flex object-cover border-4 border-primaryDark rounded-full shadow-[5px_5px_0_0_rgba(0,0,0,1)] shadow-primaryDark/100 bg-indigo-50 text-primaryDark h-24 w-24 !h-48 !w-48" src="/images/Team/leah.jpg"  alt="" />
        <h1 class="text-xl text-gray-500 font-bold mt-2">
          Leah Mantog
        </h1>
        <h2 class="text-base md:text-xl text-gray-500 font-bold">
          Lead Software Engineer
        </h2>
        <ul class="flex flex-row justify-center items-center mt-2">
          <li class="mx-2">
            <a href="https://github.com/leahmantog"  aria-label="GitHub">
              <svg class="h-[20px] text-primaryDark hover:text-green-700/50" fill="currentColor" role="img" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <title>GitHub</title>
                <path
                  d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12">
                </path>
              </svg> </a>
          </li>

          <li class="mx-2">
            <a href="https://www.facebook.com/leahmantog27" aria-label="LinkedIn">
              <svg class="h-[24px] pb-[1px] text-primaryDark hover:text-green-700/50" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier">
              <title>Facebook Profile</title>
                 <path d="M12 2.03998C6.5 2.03998 2 6.52998 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.84998C10.44 7.33998 11.93 5.95998 14.22 5.95998C15.31 5.95998 16.45 6.14998 16.45 6.14998V8.61998H15.19C13.95 8.61998 13.56 9.38998 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C15.9164 21.5878 18.0622 20.3855 19.6099 18.57C21.1576 16.7546 22.0054 14.4456 22 12.06C22 6.52998 17.5 2.03998 12 2.03998Z"></path> </g>
              </svg>              
              </a>
          </li>

          <li class="mx-2">
            <a href="mailto:leahmantog27@gmail.com" aria-label="LinkedIn">
              <svg class="h-[24px] pb-[1px] text-primaryDark hover:text-green-700/50" fill="currentColor" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier">
                <title>gmail</title> 
                <path d="M30.996 7.824v17.381c0 0 0 0 0 0.001 0 1.129-0.915 2.044-2.044 2.044-0 0-0 0-0.001 0h-4.772v-11.587l-8.179 6.136-8.179-6.136v11.588h-4.772c0 0 0 0-0 0-1.129 0-2.044-0.915-2.044-2.044 0-0 0-0.001 0-0.001v0-17.381c0-0 0-0.001 0-0.001 0-1.694 1.373-3.067 3.067-3.067 0.694 0 1.334 0.231 1.848 0.619l-0.008-0.006 10.088 7.567 10.088-7.567c0.506-0.383 1.146-0.613 1.84-0.613 1.694 0 3.067 1.373 3.067 3.067v0z"></path> </g></svg>
              
              
              </a>
          </li>

       
        </ul>
        </div>
        <div class="px-2 py-4 mt-16 flex flex-col justify-center items-center text-center w-3/12 md-lg:w-full">
            <img class="inline-flex object-cover border-4 border-primaryDark rounded-full shadow-[5px_5px_0_0_rgba(0,0,0,1)] shadow-primaryDark/100 bg-indigo-50 text-primaryDark h-24 w-24 !h-48 !w-48" src="/images/Team/apex.jpg"  alt="" />
        <h1 class="text-xl text-gray-500 font-bold mt-2">
          Ben Ryan Rinconada
        </h1>
        <h2 class="text-base md:text-xl text-gray-500 font-bold">
          Lead Software Engineer
        </h2>
        <ul class="flex flex-row justify-center items-center mt-2">
          <li class="mx-2">
            <a href="https://github.com/BenRyan0"  aria-label="GitHub">
              <svg class="h-[20px] text-primaryDark hover:text-green-700/50" fill="currentColor" role="img" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <title>GitHub</title>
                <path
                  d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12">
                </path>
              </svg> </a>
          </li>

          <li class="mx-2">
            <a href="https://www.facebook.com/nebnyar69" aria-label="LinkedIn">
              <svg class="h-[24px] pb-[1px] text-primaryDark hover:text-green-700/50" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier">
              <title>Facebook Profile</title>
                 <path d="M12 2.03998C6.5 2.03998 2 6.52998 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.84998C10.44 7.33998 11.93 5.95998 14.22 5.95998C15.31 5.95998 16.45 6.14998 16.45 6.14998V8.61998H15.19C13.95 8.61998 13.56 9.38998 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C15.9164 21.5878 18.0622 20.3855 19.6099 18.57C21.1576 16.7546 22.0054 14.4456 22 12.06C22 6.52998 17.5 2.03998 12 2.03998Z"></path> </g>
              </svg>              
              </a>
          </li>

          <li class="mx-2">
            <a href="mailto:benryanrinconada5@gmail.com" aria-label="LinkedIn">
              <svg class="h-[24px] pb-[1px] text-primaryDark hover:text-green-700/50" fill="currentColor" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier">
                <title>gmail</title> 
                <path d="M30.996 7.824v17.381c0 0 0 0 0 0.001 0 1.129-0.915 2.044-2.044 2.044-0 0-0 0-0.001 0h-4.772v-11.587l-8.179 6.136-8.179-6.136v11.588h-4.772c0 0 0 0-0 0-1.129 0-2.044-0.915-2.044-2.044 0-0 0-0.001 0-0.001v0-17.381c0-0 0-0.001 0-0.001 0-1.694 1.373-3.067 3.067-3.067 0.694 0 1.334 0.231 1.848 0.619l-0.008-0.006 10.088 7.567 10.088-7.567c0.506-0.383 1.146-0.613 1.84-0.613 1.694 0 3.067 1.373 3.067 3.067v0z"></path> </g></svg>
              
              
              </a>
          </li>

       
        </ul>
        </div>

        
      </section>
     
    </div>
        <Footer/>
    </div>
  )
}

export default AboutUs