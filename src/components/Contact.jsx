import React from 'react'
import {AiOutlineMail} from 'react-icons/ai'
import {FaPhone} from 'react-icons/fa'
const Contact = () => {
  return (
    <div className='w-full h-[75vh] flex flex-col gap-7 items-center'>
    <div className='font-extrabold text-[3vmax] w-full name bg-gray-100 text-center max-sm:mt-2 py-1'>Contact</div>
      <p style={{lineHeight:'30px'}} className='w-[60vw] max-sm:w-[90vw]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt commodi dolore nam mollitia necessitatibus, non veritatis voluptates suscipit enim debitis ullam accusantium eum vel quasi fugit excepturi? Culpa, error dolor.</p>
      <div className='bg-[#f7e8c6] shadow-xl flex flex-col gap-3 p-10'>
        <h1 className='font-bold text-center text-3xl'>Details</h1>
        <span><AiOutlineMail className='inline mr-[1vw]' />gsubramanyam933@gmail.com</span>
        <div><FaPhone className='inline mr-[1vw]' />9398534218</div>
        
      </div>
    </div>
  )
}

export default Contact