import React from 'react'

const ChangePassword = () => {
  return (
    <div className='p-4 bg-white w-[40%] md-lg:w-full'>
      <h2 className='text-base font-bold text-slate-600 pb-2'>Change Password</h2>
      <form action="">
        <div className="flex flex-col gap-1 mb-2">
          <label className='font-bold text-slate-500' htmlFor="">OLD PASSWORD</label>
          <input className='outline-none px-3 py-1 border rounded-md text-slate-600' type="password" name="old_password" id="old_password" placeholder='OLD PASSWORD'/>
        </div>
        <div className="flex flex-col gap-1 mb-2">
          <label className='font-bold text-slate-500' htmlFor="">NEW PASSWORD</label>
          <input className='outline-none px-3 py-1 border rounded-md text-slate-600' type="password" name="new_password" id="new_password" placeholder='NEW PASSWORD'/>
        </div>

        <div className="">
          <button className='px-5 py-2 bg-primaryDark font-bold text-slate-200 rounded-md hover:shadow-md'>UPDATE</button>
        </div>
      </form>
    </div>
  )
}

export default ChangePassword