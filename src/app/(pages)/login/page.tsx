 "use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { apiConnector } from '@/lib/apiConnector'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { setToken} from '@/redux/slices/authSlice'
import { setUser } from '@/redux/slices/profileSlice'
import {toast} from "react-hot-toast"
import { User } from '@/types/user'
import { ACCOUNT_TYPE } from '@/lib/constants'

function LoginForm() { 
    const router = useRouter();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const [showPassword, setShowPassword] = useState(false)

    const { email, password } = formData;

    const login = async () => {
        const toastId = toast.loading("processing..")
        try {
            const response = await apiConnector("POST", "/api/auth/login", {
                email,
                password,
            })
            console.log(response)
        
            if (!response.data.success) {
                throw new Error(response.data.message)
            }
          
            const user: User = JSON.parse(JSON.stringify(response.data.user));
            const token: string = JSON.stringify(response.data.token);

            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', token);
            dispatch(setUser(user));
            dispatch(setToken(token));

            toast.success("Logged In")
            if(user.accountType === ACCOUNT_TYPE.ADMIN){
                router.push("/admin/dashboard")
            } else{
                router.push("/dashboard")
            }

        } catch (error) {
            toast.error("Login Failed")
            router.push("/login")
        }
            toast.dismiss(toastId)
        }

    const handleOnChange = (e:any) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]:e.target.value,
        }))
    }

    const handleOnSubmit = (e:any) => {
        e.preventDefault()
        login();
      }

  return (  
     <div className='flex items-center justify-center mt-20'>
        <form
        onSubmit={handleOnSubmit}
        className=''
        >

        <label className="w-full">
                <p className="mb-3 mt-5 leading-[1.375rem] text-black">
                Email Address <sup className="text-pink-200">*</sup>
                </p>
                <input
                required
                type="text"
                name="email"
                value={email}
                onChange={handleOnChange}
                placeholder="Enter email address"
                className="w-[325px] sm:w-[260px] h-[50px]  px-2 border border-sky-500 dark:bg-slate-700  focus:outline-none rounded-md mb-4 "
                />
            </label>

            <label className="relative">
                <p className="mb-3 leading-[1.375rem] text-black">
                Password <sup className="text-pink-200">*</sup>
                </p>
                <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleOnChange}
                placeholder="Enter Password"
                className="w-[325px] sm:w-[260px] h-[50px] px-2 border border-sky-500 dark:bg-slate-700 focus:outline-none rounded-md mb-4"
                />
                <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 z-[10] cursor-pointer mt-3" 
                >
                {showPassword ? (
                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
                </span>
                <Link href={"/forgot-password"} >
                    <span className="mt-2 flex items-center justify-center text-sm font-semibold text-black hover:text-blue-150">Forgot Password</span>
                </Link>
            </label>

            <button
                type="submit"
                className="mt-6 bg-blue-150 rounded-[8px] py-[8px] px-[12px] font-medium text-white-25 w-full"
            >
                Next
            </button>

        </form>
     </div>
  )
}

export default LoginForm