import React from 'react'
import MyPosts from './MyPosts'
import Profile from './Profile'

function Dashboard({ user }) {
  return (
    <div>
      <MyPosts user={user} />
      <Profile user={user} />
    </div>
  )
}

export default Dashboard