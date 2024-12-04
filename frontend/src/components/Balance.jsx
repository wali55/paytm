import React from 'react'

const Balance = ({value}) => {
  return (
    <div className="flex">
        <div className="font-bold text-lg">
          Your Balance
        </div>
        <div className="font-bold text-lg ml-4">
        ${value}
        </div>
    </div>
  )
}

export default Balance