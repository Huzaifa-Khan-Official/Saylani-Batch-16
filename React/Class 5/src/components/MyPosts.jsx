import React from 'react'

function MyPosts({ user }) {
  console.log("user.name ==>", user.name);

  return (
    <div>
      <h1 className='text-3xl font-bold hover:underline bg-blue-50 hover:bg-blue-400 cursor-pointer'>
        My posts
      </h1>
    </div>
  )
}

export default MyPosts