import React , {useEffect, useState, useRef} from 'react'
import { FaCheck } from "react-icons/fa";


const Stepper = ({steps, currentStep}) => {
// const Stepper = ({steps}) => {
    // const steps = ["Step 1", "Step 2", "Step 3"];
    // const currentStep = 1;
  const [newStep, setNewStep] = useState([])
  const stepRef = useRef()
  const updateStep = (stepNumber, steps)=>{
    const newSteps = [...steps]
    let count= 0

    while(count < newSteps.length){
      // Current Step
      if(count === stepNumber){
        newSteps[count] ={
          ...newSteps[count],
          Highlighted: true,
          selected: true,
          completed: true,
        };
        count++;


      // Step Counted
      }else if(count < stepNumber){
        newSteps[count] ={
          ...newSteps[count],
          Highlighted: false,
          selected: true,
          completed: true,
        };
        count++;
      }
      // Step Pending
      else{
        newSteps[count] = {
          ...newSteps[count],
          Highlighted: false,
          selected: false,
          completed: false,
        };
        count++;

      }
     
    }
    return newSteps;
  }
  useEffect(() => {
    // create object 
    const stepState = steps.map((step, index) => {
      return Object.assign({}, {
        description: step, // This stores the description for each step
        completed: false,
        Highlighted: index === 0 ? true : false,
        selected: index === 0 ? true : false,
      });
    });
  
    stepRef.current = stepState;
    const current = updateStep(currentStep - 1, stepRef.current);
    setNewStep(current);
  }, [steps, currentStep]);
  // useEffect(()=>{
  //   // create object 

  //   const stepState = steps.map((step, index)=>{
  //     console.log(step)
  //     Object.assign({},{
  //       description: step,
  //       completed: false,
  //       Highlighted: index === 0 ? true : false,
  //       selected: index === 0 ? true : false,

  //     })
  //   })

  //   stepRef.current = stepState;
  //   const current  = updateStep(currentStep -1, stepRef.current);
  //   setNewStep(current);
  // },[steps,currentStep])

  const displaySteps = newStep.map((step, index) =>{
    return (
      <div key={index} className={index !== newStep.length -1 ? "w-full flex items-center" : "flex items-center"}>
        <div className="relative flex flex-col items-center text-teal-600 ">

             <div className={`rounded-full transition duration-500 ease-in-out border-2 border-gray-300 h-6 w-6 flex items-center justify-center text-center ${step.selected ? " bg-primary text-white font-bold border border-primary": " "}`}>
               {/* {Display Number} */}
               {step.completed ? 
               (
                <span className='text-white font-bold text-xl flex justify-center items-center text-[10px]'><FaCheck color='#fff' size={10} /></span>
               ) : 
               (
                <p className='text-[10px]'>{index + 1}</p>
                
               )
              }
             </div>
              
             <div className={`absolute top-0 text-center mt-8  text-xs font-semibold uppercase ${step.Highlighted ? " text-primary" : "  text-gray-400"}`}>
               {/* {Display Description} */}
               {step.description}
              </div>
         </div>
             <div className={`flex-auto border-t-2 transition duration-500 ease-in-out ${step.completed ? " border-primary" : " border-gray-300"}`}>
               {/* {Display Line} */}
              </div>
     </div>

    )
  });



  return (
    <div className='mx-4 p-4 flex justify-between items-center'>
     {displaySteps}
    </div>
  )
}

export default Stepper