import React from 'react'

const Loading = () => {
  return (
    <div className='w-full h-[80vh] flex justify-center'>
       <span className='w-10 h-10 mt-5 border-4 justify-center text-center rounded-full border-t-black animate-spin border-gray-400'></span>
    </div>
        // <div className='text-center w-full font-bold text-2xl'>Loading...</div>
  )
}

export default Loading