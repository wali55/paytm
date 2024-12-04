import React from 'react'

const Button = ({label, onClick}) => {
  return (
    <button onClick={onClick} className="my-4 font-medium w-full px-3 py-2 rounded-md bg-gray-900 hover:bg-gray-800 text-white">{label}</button>
  )
}

export default Button