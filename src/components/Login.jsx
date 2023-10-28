import React, { useState,useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import {useCookies} from 'react-cookie'

const Login = () => {
  const [inputdata, setinputdata] = useState({username:'',password:'',password2:''})
  const [islogin, setislogin] = useState(true)
  const [passmatch, setpassmatch] = useState(true);
  const [error, seterror] = useState('')
  const [isloading, setisloading] = useState(false)

  const navigate=useNavigate()
  const [token,settoken] = useCookies(['mytoken']) 
  

  useEffect(()=>{
    if(token['mytoken']){
       navigate('home')
    }
  },[token])
 
  const productpost=(name)=>{
    return(
    //fetch(`http://127.0.0.1:8000/${name}/`,{
    fetch(`https://gantasiddu.pythonanywhere.com/${name}/`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({username:inputdata.username,password:inputdata.password})
    })
    .then(res=>res.json())
    )
  }
  

  const inputhandle=(name,data)=>{
    setinputdata(prev=>({...prev,[name]:data}))
  }

  const formhandle=(e)=>{
    e.preventDefault()
    seterror("")
    let time=setTimeout(()=>seterror("Network is slow please check your internet..."),5000)
    if(!islogin && inputdata.password!==inputdata.password2){
      seterror("Passwords didn't match")
      setpassmatch(false)
      clearTimeout(time)
      return
    }
    setisloading(true)
    productpost(islogin ?'auth' :'users')
    .then(data=>{
      if(data?.non_field_errors){
        setpassmatch(false)
        seterror(data.non_field_errors[0])
      }
      else if(typeof data?.username==='object'){
        setpassmatch(false)
        seterror(data.username[0])
      }
      else if(data && islogin){
        settoken('mytoken',data.token)
      }
      else if(data){
        productpost('auth')
        .then(resp=>settoken('mytoken',resp.token))
      }
      setisloading(false)
      clearTimeout(time)
    })
  }

  const logintoreg=()=>{
    setinputdata({username:'',password:'',password2:''})
    setislogin(!islogin)
    seterror(true)
    setisloading(false)
  }
 
  return (
    <div className='flex flex-col gap-3 h-[80vh] items-center'>
    <h1 className='font-extrabold w-full text-center text-[3vmax] name bg-[#f1f0f0] uppercase max-sm:mt-2 py-1'>{islogin ? 'Login' :'Register'}</h1>
    <form onSubmit={formhandle} className='flex login flex-col gap-4 rounded-xl p-7 bg-[#f0e3c8] shadow-xl items-center'>
      <label>
        <span className='font-semibold text-[17px]'>Username: </span><br />
        <input type="text" name='username' autoComplete='false' value={inputdata.username} onChange={(e)=>inputhandle(e.target.name,e.target.value)} className='outline-none rounded-lg w-[25vw] max-sm:w-[80vw] p-[6px] border-[1px] border-gray-700' placeholder='username' required />
      </label>
      <label>
        <span className='font-semibold text-[17px]'>Password: </span><br />
        <input type="password" name='password' value={inputdata.password} onChange={(e)=>inputhandle(e.target.name,e.target.value)} className='outline-none rounded-lg w-[25vw] max-sm:w-[80vw] p-[6px] border-[1px] border-gray-700' placeholder='password' required />
      </label>
      
      {!islogin &&(
        <>
      <label>
        <span className='font-semibold text-[17px]'>Confirm Password: </span><br />
        <input type="password" name='password2' value={inputdata.password2} onChange={(e)=>inputhandle(e.target.name,e.target.value)} className='outline-none rounded-lg w-[25vw] max-sm:w-[80vw] p-[6px] border-[1px] border-gray-700' placeholder='confirm password' required />
      </label>
      </>
      )}
      <span className={`text-red-500 font-medium text-[15px] -mt-3 ${passmatch ? 'invisible':'visible'}`}>{error}.</span>
    
      <button className='bg-blue-500 btn text-white font-bold w-[9vw] max-sm:w-[24vw] flex justify-center py-1 text-xl'>
      {!isloading ? <span>{islogin ? "Login" : "Register"}</span> :<p className="w-6 h-6 my-[2px] rounded-full border-t-[3px] border-l-2 animate-spin border-white"></p>}
      </button>
     <div>{islogin ? "Don't" :'Already'} Have An Account ,<span className='font-bold cursor-pointer text-green-700 text-lg border-b-[1px] border-black' onClick={logintoreg}>{islogin ? 'Register':'Login'}</span> Here</div>
    </form>
    </div>
  )
}

export default Login