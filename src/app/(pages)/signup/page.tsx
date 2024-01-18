"use client"
import React from 'react'
import SignupForm from '@/components/auth/SignUpForm'

function Signup() {
   
  return (
      <div>
     
            <div className='flex flex-col items-center justify-center  lg:mt-8'>
              <div className='flex flex-col items-center justify-center lg:shadow-lg dark:bg-slate-800 md:shadow-lg p-24 mb-4 sm:w-[320px]'>
                  <h3 className='font-bold text-lg'>Create an account</h3>
                  <SignupForm/>
              </div>
            </div>
                
            </div>
  )
}

export default Signup