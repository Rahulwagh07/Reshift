import React from 'react'
import { useRouter } from 'next/navigation';
import { apiConnector } from '@/config/apiConnector';
import { useState } from 'react'; 
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { toast } from 'react-hot-toast';
 
function SignupForm() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
      })

    const [showPassword, setShowPassword] = useState(false)

    const {name, email, password} = formData

    const handleOnChange = (e:any) => {
        setFormData((prevData) => ({
          ...prevData,
          [e.target.name]: e.target.value,
        }))
      }
    
    const signUp = async () => {
      const toastId = toast.loading("processing..")
      try {
          const response = await apiConnector("POST", "/api/auth/signup", {
              name,
              email,
              password,
          })
          
          if (!response.data.success) { 
            if(response.data.userExist === true){
              toast.success("Already Registed with us..please Login")
              router.push("/login")
            }
            throw new Error(response.data.message)
          }
          router.push("/login")
      } catch (error) {
        console.log(error)
          router.push("/signup")
        }
      toast.dismiss(toastId)
    }

      //form Submission
    const handleOnSubmit = (e:any) => {
        e.preventDefault()
        // Reset
        setFormData({
        name: "",
        email: "",
        password: "",
        })
        signUp();
    }
        
    
     
  return (
    <div className='flex flex-col items-center justify-center text-black mt-2'>
       
        <form onSubmit={handleOnSubmit} className="flex w-full flex-col items-center  justify-center gap-4">
         
          <label className='w-full mr-4 ml-4 sm:mr-0'>
            <p className="mb-1">
            Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="name"
              value={name}
              onChange={handleOnChange}
              placeholder="Enter first name"
              className="h-[50px] sm:h-[42px] sm:w-[260px] rounded-md border border-sky-500 dark:bg-slate-700 focus:outline-none pl-2"
            />
          </label>
      
        <label className="w-full mr-4 ml-4 sm:mr-0">
          <p className="mb-1">
            Email Address <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type="text"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter email address"
            className="h-[50px] sm:h-[42px] sm:w-[260px] rounded-md border border-sky-500 dark:bg-slate-700 focus:outline-none pl-2"
          />
        </label>
        <div className="w-full mr-4 ml-4 sm:mr-0">
        <label className="relative">
            <p className="mb-1">
              Create Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter Password"
              className="h-[50px] sm:h-[42px] sm:w-[260px] rounded-md border border-sky-500 dark:bg-slate-700 focus:outline-none pl-2"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-2 top-[38px] z-[10] cursor-pointer mt-1"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
        </div>
       
        <button
          type="submit"
          className="bg-blue-150 h-[50px] sm:h-[42px] sm:w-[260px] py-2 px-10 text-white-25 rounded flex items-center justify-center mb-4"
        >
        Next  
        </button>
       
      </form>
    </div>
  )
}

export default SignupForm