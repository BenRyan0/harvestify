import React, { useState, useEffect } from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Link } from 'react-router-dom'
const DaysCounter = ({ startDate, endDate, createdAt,textSize }) => {
  // Convert startDate, endDate, and createdAt to Date objects
  const start = new Date(startDate);
  const end = new Date(endDate);
  const created = new Date(createdAt);
  const current = new Date(); // Replace with new Date() for real-time behavior

  // Calculate the number of days until the start date
  const daysUntilStart = Math.ceil((start - current) / (1000 * 60 * 60 * 24));

  // Calculate total days from createdAt to startDate
  const totalDays = Math.ceil((start - created) / (1000 * 60 * 60 * 24));

  // Calculate the percentage of days until the start date compared to total days
  const percentage = (daysUntilStart / totalDays) * 100;
  const flippedPercentage = percentage >= 100 ? 0 : 100 - percentage;

  const [showSecond, setShowSecond] = useState(false);
  useEffect(() => {
    if (flippedPercentage >= 100) {
      setShowSecond(true);
    } else {
      setShowSecond(false);
    }
  }, [flippedPercentage]);

  // Determine the color based on the flipped percentage
  const getPathColor = (percentage) => {
    if (percentage >= 80) {
      return 'gray';
    } else if (percentage >= 60) {
      return 'orange';
    } else {
      return 'green';
    }
  };


  const pathColor = getPathColor(flippedPercentage);

  // Second progress bar logic (Days left from current date to end date)
  const totalDaysBetweenStartAndEnd = Math.ceil((end - start) / (1000 * 60 * 60 * 24)); // Total days between start and end date
  const daysLeftUntilEnd = Math.ceil((end - current) / (1000 * 60 * 60 * 24)); // Days left until the end date

  // Calculate percentage of time remaining
  const progressDaysLeft = Math.min(100, Math.max(0, (daysLeftUntilEnd / totalDaysBetweenStartAndEnd) * 100));
  const flippedProgressDaysLeft = progressDaysLeft >= 100 ? 0 : 100 - progressDaysLeft;

  const pathColor_ = getPathColor(flippedProgressDaysLeft);

  return (
    <div className="flex flex-col gap-1 text-[9px] ">
      <div className="flex justify-center items-center ">
      <CircularProgressbarWithChildren
        className='bg-white border-2 rounded-full p-[1px] border-slate-600'
        value={flippedPercentage}
        styles={buildStyles({
          pathColor: pathColor,
          trailColor: '#fff',
          background: pathColor,
        })}
      >
        <div className='flex gap-[2px]  flex-col text-center transition-all duration-700'>
          <span className={`${textSize}`} style={{ color: pathColor }}>
            {daysUntilStart > 0 ? `${daysUntilStart } ${daysUntilStart === 1 ? 'Day' : 'Days'}` : 'Ended'}
          </span>
        </div>
      </CircularProgressbarWithChildren>
      </div>

      {showSecond && 
        <CircularProgressbarWithChildren
          className='bg-white border-2 rounded-full p-[1px] border-slate-600 '
          value={flippedProgressDaysLeft}
          styles={buildStyles({
            pathColor: pathColor_,
            trailColor: '#fff',
            background: pathColor_,
          })}
        >
          <div className='flex gap-[2px] flex-col text-center transition-all duration-700'>
            <span className='flex flex-col ' style={{ color: pathColor_ }}>
              <div className="">{daysLeftUntilEnd > 0 ? `${daysLeftUntilEnd -1} ${daysLeftUntilEnd === 1 ? 'Day' : 'Days'}` : ''}
              </div>
              <div className="">{daysLeftUntilEnd > 0 ? `${daysLeftUntilEnd === 1 ? 'Harvest time' : 'Harvest time'}` : 'Ended'}
              </div>
             
            
            </span>
          </div>
        </CircularProgressbarWithChildren>
      }
    </div>
  );
};

export default DaysCounter;
