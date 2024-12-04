import React from 'react'

const InputBox = ({label, placeholder, onChange, name, value}) => {
  return (
    <div>
        <div className="text-sm font-medium text-left py-2">
            {label}
        </div>
        <input name={name} value={value} onChange={onChange} placeholder={placeholder} className="w-full px-2 py-1 border rounded-md" />
    </div>
  )
}

export default InputBox