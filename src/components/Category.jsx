import React, { useEffect, useState } from 'react'
import {useParams,Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { addproduct } from './Redux/Slices/ProductSlice'
import Loading from './Loading'

const Category = () => {
    const {name}=useParams()
    const dispatch=useDispatch()
    const [products, setproducts] = useState('')
    
    useEffect(()=>{
      setproducts('')
        fetch(`https://dummyjson.com/products/category/${name}`)
        .then(res => res.json())
        .then(data =>setTimeout(()=>setproducts(data.products),500))
    },[name])

  return (
    <div className='px-10 max-sm:px-3'>
    {products && <div className='font-extrabold text-[3vmax] name bg-gray-100 uppercase text-center max-sm:mt-10 mb-5 py-1'>{name}</div>}
    <div className='flex max-sm:flex-col items-center max-sm:w-full gap-[4vw]  flex-wrap'>
      {products ? (
         products.map(item=>(
            <Link to={`${item.title}`} key={item.id}><div onClick={()=>dispatch(addproduct({product:item}))} className='category-anime cursor-pointer hover:scale-[1.1] w-[20vw] max-sm:w-[80vw] duration-200' >
               <div className='hover:opacity-60 rounded-xl w-full overflow-hidden'><img className=' aspect-square object-fill' src={item.thumbnail} /></div>
               <p className='text-center mt-2 text-[2vmax] max-sm:text-[5vw] font-semibold'>{item.title.length<=25 ?item.title :`${item.title.slice(0,26)}...`}</p>
               <div className='flex justify-center items-center'><span className=' text-[1.5vax] font-bold'>{Math.floor(item.price * (1-item.discountPercentage/100)) } $</span> <small className='ml-2'><del>{item.price} $</del></small></div>
            </div></Link>
         ))
       ):(
         <Loading />
       )}
      </div>
    </div>
  )
}

export default Category