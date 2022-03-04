import React from 'react'
import ProfileInformation from '../Components/ProfileInformation'

const MyProfile = ({ logoutHandler, currentUser }) => {
  return (
    <div className="main-content-container profile-container">
        <ProfileInformation logoutHandler={logoutHandler} currentUser={currentUser}/>
        <p>Table goes here!!!</p>
    </div>
  )
}

export default MyProfile