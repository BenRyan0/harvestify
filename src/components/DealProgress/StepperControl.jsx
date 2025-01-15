import React from 'react';
import { FaChevronLeft, FaChevronRight, FaCheck } from "react-icons/fa";
import { toast } from 'react-hot-toast';

// const StepperControl = ({ handleClick, currentStep, steps, submitData, userData }) => {
const StepperControl = ({ handleClick,  submitData, userData,steps,currentStep }) => {
    // const currentStep = 1
    // const steps = ["01", "02", "03"]
  const formValidation = () => {
    if (currentStep === 1) {
      if (
        userData.firstName &&
        userData.lastName &&
        userData.email &&
        userData.phoneNumber &&
        userData.profileImage &&
        userData.sex &&
        userData.birthDate
      ) {
        handleClick("next");
      } else {
        toast.error("All Inputs are required");
      }
    } else if (currentStep === 2) {
      // Add your validation logic for step 2
      handleClick("next");
    } else if (currentStep === 3) {
      // Final step: Submit data
      submitData();
      handleClick("next");
    }
  };

  return (
    <div className="stepper-control">
      {currentStep === steps.length ? (
        <div className="summary-container"> {/* Optional Summary for Final Step */}</div>
      ) : (
        <div className="container flex justify-around md:mt-6 mt-10 mb-8">
          {/* Back Button */}
          <button
            onClick={() => handleClick("back")}
            className={`uppercase py-2 px-4 font-semibold cursor-pointer text-slate-600 transition duration-200 ease-in-out ${
              currentStep === 1 ? "opacity-20 cursor-not-allowed hover:bg-transparent hover:text-slate-400" : ""
            }`}
            disabled={currentStep === 1}
          >
            <p className="flex justify-center items-center gap-1">
            <FaChevronLeft />  Back 
            </p>
          </button>

          {/* Next/Confirm Button */}
          <button
            onClick={formValidation}
            className=" uppercase py-2 px-4 font-semibold cursor-pointer text-slate-600 transition duration-200 ease-in-out"
          >
            {currentStep === steps.length - 1 ? (
              <p className="flex justify-center items-center gap-1">
                Confirm <FaCheck />
              </p>
            ) : (
              <p className="flex justify-center items-center gap-1">
                Next <FaChevronRight />
              </p>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default StepperControl;
