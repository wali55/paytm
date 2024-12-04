import React from 'react'

const AppBar = () => {
  return (
    <div className="shadow h-14 flex justify-between items-center px-5">
        <div>
            <p className="font-medium">PayTM App</p>
        </div>
        <div className="flex items-center">
            <p>Hello, User</p>
            <div className="ml-2 rounded-full justify-center items-center h-8 w-8 flex bg-gray-200">
                U
            </div>
        </div>
    </div>
  )
}

export default AppBar