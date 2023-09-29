import React, { useState,useEffect } from 'react'
import {BiSearchAlt2,BiCart} from 'react-icons/bi'
import {RiMenu3Fill} from 'react-icons/ri'
import {IoIosCloseCircleOutline} from 'react-icons/io'
import { Outlet, Link,useNavigate } from "react-router-dom";
import Footer from './Footer'
import { useSelector } from 'react-redux';
import {CgSelect} from 'react-icons/cg'
import {useCookies} from 'react-cookie'


const Navbar = () => {
    const [menubool, setmenubool] = useState(true)
    const [hidemenu, sethidemenu] = useState(true)
    const [category, setcategory] = useState('')
    const [input, setinput] = useState('')
    const cartitems=useSelector(state=>state.Cart)
    const [token,settoken,removetoken] = useCookies(['mytoken'])
    const navigate=useNavigate() 
    
   
    
    useEffect(()=>{
      fetch('https://dummyjson.com/products/categories')
      .then(res => res.json())
      .then(data => setcategory(data))
    },[input])

    useEffect(()=>{
      if(!token['mytoken']){
        navigate('/ecommerce')
      }
    },[token])

    window.addEventListener('scroll',(e)=>{
      if(window.scrollY>80 && e.target.location.pathname==='/home'){
        sethidemenu(false)
      }else{
        sethidemenu(true)
      }
    })

    window.addEventListener('click',(e)=>{
      if(e.target.textContent==='Collection'){
        setmenubool(false)
        sethidemenu(false)
      }
    })

    const categorymenu=()=>{
      sethidemenu(!hidemenu)
      setmenubool(true)
    }
     
    const mainmenu=()=>{
      setmenubool(!menubool)
      sethidemenu(true)
    }

    const close=()=>{
      setmenubool(true)
      sethidemenu(true)
    }

    const logout=()=>{
      setmenubool(true)
      sethidemenu(true)
      removetoken(['mytoken'])
    }

    const inputcheck=()=>{
      let inputname='Products Not Found'
      category && input && category.map(item=>{
        if(item.includes(input)){
          inputname=item
          return
        }
      })
      return inputname
    }

    
    
  return (
    <div className='w-[100vw]'>
    <nav className={` flex ${token['mytoken'] ?'justify-between':'gap-[10vw] mb-2'} max-sm:justify-between sticky px-10 max-sm:px-3 top-0 items-center font-sans z-10 h-[12vh] max-sm:h-full bg-white w-full`}>
    <Link to={token['mytoken'] ? 'home':'/ecommerce'} onClick={close}><img className='absolute max-sm:-top-6 cursor-pointer max-sm:w-28 -top-10' src='http://localhost:5173/atoz.png' width='150' /></Link>
        <div className={` cursor-pointer z-20 items-center ml-14 max-sm:flex-col max-sm:bg-gray-200 max-sm:pt-5 max-sm:absolute max-sm:w-full max-sm:right-1 max-sm:top-5 max-sm:gap-1 ${menubool && 'max-sm:scale-0 origin-top-right'} font-light text-[17px] flex gap-[3vw]`}>
        {token['mytoken'] ?(
          <>
           <Link to='home' onClick={close} className='max-sm:border-b-[1px] max-sm:py-1 max-sm:text-center max-sm:font-medium max-sm:w-full max-sm:border-gray-400'>Home</Link>
           <span className='max-sm:border-b-[1px] relative max-sm:py-1 max-sm:ml-2 max-sm:text-center max-sm:font-medium max-sm:w-full max-sm:border-gray-400'>
            <h5 className={`${!hidemenu && category && '-ml-[9px] font-bold'}`} onClick={()=>sethidemenu(prev=>!prev)}>products <CgSelect className='inline'/></h5>
            <ul className={` absolute w-56 py-2 h-[90vh] category-scroll overflow-auto max-sm:left-0 -left-16 max-sm:w-full top-8 ${hidemenu && 'hidden'} bg-white border-[1px] border-gray-300`}>
               {category && category.map((item,id)=>(
                <Link key={id} to={`category/${item}`}><li onClick={categorymenu} className=' px-3 text-center hover:bg-gray-500 hover:text-white hover:font-semibold py-1'>{item}</li></Link>
               ))}
            </ul>
           </span>
           </>   
            ):null}
            <Link to='about' onClick={close} className='max-sm:border-b-[1px] max-sm:py-1 max-sm:text-center max-sm:font-medium max-sm:w-full max-sm:border-gray-400'>about</Link>
           <Link to='contact' onClick={close} className='max-sm:border-b-[1px] max-sm:py-1 max-sm:text-center max-sm:font-medium max-sm:w-full max-sm:border-gray-400'>contact</Link>
        </div>
        
        
            {token['mytoken'] ?(
          <>
            <div className='flex max-sm:mt-16 max-sm:w-full ml-[5vw] items-center'>
              <input type="text" value={input} onKeyDown={(e)=>e.key==='Enter'&&e.target.nextElementSibling.click()} onChange={(e)=>setinput(e.target.value)} className='bg-transparent z-10 rounded-l-lg  w-[26vw] max-sm:w-full border-gray-500 text-lg  outline-none px-3 py-1 border-[1px]' placeholder='Enter your Product...' />
              <Link to={`category/${inputcheck()}`} onClick={()=>setinput('')} className='text-2xl py-[7px] px-4 rounded-r-lg text-gray-100  bg-gray-500'><BiSearchAlt2 /></Link>
            </div>
            
        <div className={`flex gap-[3vw] b-gray-200 font-light max-sm:flex-col max-sm:bg-gray-200 max-sm:absolute max-sm:w-full right-1 top-[189px] max-sm:py-1 z-10 max-sm:gap-1 ${menubool && 'max-sm:scale-0 origin-top-right'} cursor-pointer text-[17px] items-center`}>
           <Link to='cart' onClick={close} className='flex justify-center relative gap-1 max-sm:py-1 items-center max-sm:border-b-[1px] max-sm:font-medium max-sm:w-full max-sm:border-gray-400'>Cart <span className='text-2xl'><small className='absolute -top-1 max-sm:top-0 -right-2 max-sm:right-[40.5vw] text-sm text-white rounded-full h-[18px] w-[18px] text-center font-bold bg-black '>{cartitems.length}</small><BiCart /></span></Link>
            <button onClick={logout} className=' max-sm:py-1  max-sm:text-center max-sm:font-medium max-sm:w-full'>log out</button>
        </div>
        </>   
            ):null}
        {menubool ?<RiMenu3Fill onClick={mainmenu} className={`${!token['mytoken'] ? 'mt-5' : 'max-sm:-mt-6' } text-2xl hidden cursor-pointer z-10 max-sm:block`} />:<IoIosCloseCircleOutline onClick={mainmenu}  className={`${!token['mytoken'] ? 'mt-5' : 'max-sm:-mt-6' } text-2xl hidden cursor-pointer z-30 max-sm:block`} />}
    </nav>
    <Outlet />
    <Footer />
    </div>
  )
}

export default Navbar