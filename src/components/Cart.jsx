import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {CiCircleRemove} from 'react-icons/ci'
import { removeitem } from './Redux/Slices/CartSlice'

const Cart = () => {
  const [cart, setcart] = useState('')
  const [coupon,setcoupon]=useState(true)
  const [total,settotal]=useState(0)
  const cartitems=useSelector(state=>state.Cart)
  const [quantity, setquantity] = useState({})
  
  const dispatch=useDispatch()
 
  useEffect(()=>{
      setcart(cartitems)
      settotal(0)
      setquantity({})
      cartitems.forEach(item=>{
        let q=item.cart.quantity
        setquantity(prev=>({...prev,[item.cart.title]:q}))
        let tot=quantity[item.cart.title]*Math.floor(item.cart.price * (1-item.cart.discountPercentage/100))
        if(!tot){
           tot=q*Math.floor(item.cart.price * (1-item.cart.discountPercentage/100))
        }
        settotal(prev=>prev+tot)
      })
  },[cartitems])
    
    const add=(name)=>{
      setquantity(prev=>({...prev,[name.title]:prev[name.title]+1}))
      let tot=Math.floor(name.price * (1-name.discountPercentage/100))
      settotal(prev=>prev+tot)
    }

    const neg=(name)=>{
      setquantity(prev=>({...prev,[name.title]:prev[name.title]-1>0 ?prev[name.title]-1:1}))
      let tot=Math.floor(name.price * (1-name.discountPercentage/100))
      settotal(prev=>Math.max(tot,prev-tot))
    }

    const remove=(id)=>{
      dispatch(removeitem(id))
      if(cart.length==1){
        window.scrollTo(0,0)
      }
    }


  return (
    <div className={`w-full ${cart.length<=0 &&'h-[80vh]'}`}>
    <h1 className='font-extrabold text-[3vmax] name bg-gray-100 uppercase text-center max-sm:mt-10 mb-5 py-1'>Cart {cart.length<=0 ?'Is Empty':null}</h1>
    {cart.length>0 &&(<div className='flex max-sm:flex-col justify-between gap-[10vw] px-[5vw] max-sm:p-2'>
        <div className='border-[1px] flex flex-col border-gray-300'>
          <div className=' py-2 px-[6vw] font-bold text-lg bg-gray-400 w-full '>
            <span className='ml-[5vw]'>Product</span>
            <span className='ml-[16vw]'>Quantity</span>
            <span className='ml-[5vw] max-sm:ml-[13vw]'>price</span>
          </div>
          <div className='cart-scroll max-sm:max-h-[39vh] h-[59vh] overflow-auto'>
         {cart && cart.map((item,id)=>(
           <div key={item.cart.id} className='flex justify-between border-b-[1px] border-gray-300 p-3 items-center'>
             <img src={item.cart.thumbnail} className='w-[10vw] rounded-lg max-sm:w-[20vw] max-sm:h-[10vh] h-[15vh] object-fill' />
             <h3 className='font-semibold w-[15vw] max-sm:text-sm text-lg'>{item.cart.title}</h3>
             <div className='flex text-gray-700 gap-1 items-center'>
                <button onClick={()=>neg(item.cart)} className='text-xl border-[1px] w-7 border-gray-400'>-</button>
                <span className='text-lg border-[1px] text-center w-7 h-[30px] border-gray-400'>{quantity[item.cart.title]}</span>
                <button onClick={()=>add(item.cart)} className='text-xl border-[1px] w-7 border-gray-400'>+</button>
              </div>
             <span className='font-bold'>{Math.floor(item.cart.price * (1-item.cart.discountPercentage/100))} $</span>
             <CiCircleRemove onClick={()=>remove(id)} className='text-2xl text-gray-500 hover:text-inherit' />
           </div>
         ))}
         </div>
       </div>
       <div className='border-[1px] w-[25vw] h-max max-sm:w-full max-sm:mb-8 border-gray-300'>
          <h1 className='font-bold text-lg px-3 py-2 bg-[#f0e2bb]'>Cart totals</h1>
          <div className='p-3'>
            <div className='flex border-b-[1px] py-2 font-bold border-gray-300 justify-between'><span className='font-normal'>subtotal :</span>{total} $</div>
            <div className='flex border-b-[1px] py-2 font-bold mb-7 border-gray-300 justify-between'><span className='text-medium font-normal'>Total :</span>{total} $</div>
            {coupon ? <span onClick={()=>setcoupon(prev=>!prev)} className='cursor-pointer'>Have a coupon code?</span>:(
              <div className='flex justify-between gap-[2vmin] '>
                <input type="text" className='outline-none font-light border-[1px] w-full p-1 border-gray-300 ' placeholder='Coupon code' />
                <button onClick={()=>setcoupon(prev=>!prev)} className='py-2 px-[2vmax] text-white bg-black'>Apply</button>
              </div>
            )}
            <button className='p-2 mt-3 w-full text-white bg-black'>Proceed to checkout</button>
          </div>
       </div>
    </div>)}
    </div>
  )
}

export default Cart
