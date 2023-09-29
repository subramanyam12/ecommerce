import React, { useEffect, useState,memo } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { addtocart } from './Redux/Slices/CartSlice'
import Loading from './Loading'

const Productshow = () => {
    const [product, setproduct] = useState('')
    const imgindexlist=[0,1,2,3]
    const [imgindex, setimgindex] = useState(0)
    const [quantity, setquantity] = useState(1)
    const [cartbool, setcartbool] = useState(true)
    const cartitems=useSelector(state=>state.Cart)
    

    const dispatch=useDispatch()
    const items=useSelector(state=>state.Product[0]?.product)
    
    useEffect(()=>{
      if(items){
      localStorage.setItem('prod',JSON.stringify(items))
    }
      let dt=localStorage.getItem('prod')
      setTimeout(()=>setproduct(JSON.parse(dt)),1000)
    },[items])

   
    const carthandle=()=>{

        let newprod={...product,quantity}
        dispatch(addtocart({cart:newprod}))
        setcartbool(false)
    }

    const addedcheck=()=>{
        let bool=true
        if(cartitems){
            cartitems.forEach(item=>{
              if(item.cart.id===product.id){
                    bool=false
              }
            })
        }
        return bool 
    }

  return (
    <div >
    {product ? (<div className='flex h-[75vh] max-sm:h-auto max-sm:flex-col max-sm:gap-5 mt-16 items-center justify-evenly w-full'>
        <div className='product-left flex flex-col  w-[30vw] max-sm:w-[85vw] gap-[5vh]'>
            <img src={product.images[imgindex]} className='w-full rounded-xl h-[28vw] max-sm:h-[70vw] object-fill' />
            <div className='flex justify-center max-sm:gap-[2.5vh] gap-[2vw]'>
                {imgindexlist.map(index=>(
                <div key={index} onClick={()=>setimgindex(index)}><img className={`w-14 max-sm:w-[15vw] object-fill ${index===imgindex && 'border-[1px] opacity-60 scale-[1.2] border-gray-600'} duration-300 rounded-lg h-16`} src={product.images[imgindexlist[index]]} /></div>
                ))}
            </div>
        </div>
        <div className='product-right flex flex-col gap-2'>
            <span className='uppercase font-medium'>{product.category}</span>
            <h1 className='mt-2 max-sm:mt-0 text-[2vw] max-sm:text-[8vw] font-bold'>{product.title}</h1>
            <div className='flex gap-3 items-center'>
                <span className=' text-[1.7vw] max-sm:text-[6vw] font-bold'>{Math.floor(product.price * (1-product.discountPercentage/100)) } $</span>
                 <small className=' text-[1.3vw] max-sm:text-[4vw]'><del>{product.price} $</del></small>
                 <span className='text-[1.3vmax]max-sm:text-[4vw] text-gray-500'>& Free Shipping</span>
            </div>
            <p className='w-[40vw] max-sm:w-[85vw] my-5 text-gray-500'>{product.description}</p>
            <div className='border-b-[1px] border-gray-300'></div>

            <div className='flex my-[1vw] max-sm:justify-center gap-8'>
                <div className='flex text-gray-700 gap-2 items-center'>
                   <button onClick={()=>setquantity(prev=>prev-1)} className='text-2xl border-[1px] w-9 border-gray-400'>-</button>
                   <span className='text-xl border-[1px] max-sm:pt-1 text-center w-9 h-[34px] border-gray-400'>{quantity}</span>
                   <button onClick={()=>setquantity(prev=>prev+1)} className='text-2xl border-[1px] w-9 border-gray-400'>+</button>
                </div>
                {cartbool && addedcheck() ?<button onClick={carthandle} className='bg-gray-800 font-bold px-3 py-1 max-sm:px-5 max-sm:py-2 text-white'>Add to cart</button>:<button onClick={carthandle} className='bg-green-600 font-bold px-3 py-1 text-white'>Added</button>}
            </div>
            <div className='border-b-[1px] border-gray-300'></div>
            <span className='text-gray-700 font-semibold'><small className='font-normal'>category :</small>{product.category}</span>
           
        </div>
    </div>):(<Loading />)}
    </div>
  )
}

export default memo(Productshow)