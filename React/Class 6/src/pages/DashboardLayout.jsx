import React from 'react'
import { Outlet } from 'react-router'

function DashboardLayout() {
  return (
    <div>
      <h1>DashboardLayout</h1>
      <ul>
        <li>Home</li>
        <li>Home</li>
        <li>Home</li>
        <li>Home</li>
        <li>Home</li>
      </ul>
      <Outlet />
    </div>
  )
}

export default DashboardLayout