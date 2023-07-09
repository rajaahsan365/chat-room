import React from 'react'

const Card = ({heading=null,children=null}) => {
  return (
    <div className="bg-green-200 min-h-screen flex items-center justify-center">
    <div className="bg-white p-8 rounded-lg flex flex-col items-center gap-4">
      <span className="text-2xl font-bold text-green-800">Chat Room</span>
      {heading && <span className="text-sm text-green-800">{heading}</span>}
        {children && children}
      </div>
      </div>
  )
}

export default Card