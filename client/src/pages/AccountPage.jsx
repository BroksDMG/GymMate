import React, { useContext } from 'react'
import { UserContex } from '../components/UserContext'
import { Navigate } from 'react-router-dom'

function AccountPage() {
  const {ready,user}= useContext(UserContex)
  if(!ready){
    return 'Loading...';
  }

  if(ready&&!user){
    return <Navigate to={'/login'}/>
  }

  return (
    <div>AccountPage{user?.name}</div>
  )
}

export default AccountPage