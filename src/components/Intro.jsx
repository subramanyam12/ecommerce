import React from 'react'


const Intro = () => {
  return (
    <div className='px-10 max-sm:px-1 max-sm:h-[150vw] h-[90vh]'>
    <div className='max-sm:mt-3 h-full max-sm:px-0 font-serif flex max-sm:flex-col justify-around items-center w-full intro'>
        <div className='flex flex-col intro-text items-center'>
          <p className='text-center text-[4vw] max-sm:text-[9vw] font-semibold'>welcome to <span className='block text-[5vw] max-sm:text-[11vw] max-sm:-m-3 font-extrabold -my-5 text-orange-500'>A-Z</span> Store</p>
           <button className='bg-black text-lg px-[2vw] py-1 font-bold text-white'>Collection</button>
        </div>
        <img className='w-[45vw] intro-img max-sm:w-full object-fill' src='intro.png' />
    </div>
    </div>
  )
}

export default Intro
