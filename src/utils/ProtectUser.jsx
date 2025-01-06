import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectUser = () => {
    const {userInfo} = useSelector(state => state.auth)

    if(userInfo){
        return <Outlet/>
    }else{
        return <Navigate to='/login' replace={true}/>
    }
//   return (
//     <div>ProtectUser</div>
//   )
}

export default ProtectUser