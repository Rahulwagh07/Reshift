"use client"
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { apiConnector } from '../../../lib/apiConnector';
import { useState } from 'react';

const AddMemberPage = () => {
    const { token } = useSelector((state: RootState) => state.auth);
    const [formData, setFormData] = useState({
        email: "",
        secretToken: "",
      })
    const {email, secretToken} = formData

    const handleOnChange = (e:any) => {
        setFormData((prevData) => ({
          ...prevData,
          [e.target.name]: e.target.value,
        }))
      }
    
    const sendInvite = async () => {
      const toastId = toast.loading("processing")
      try {
        const response = await apiConnector("POST", "/api/acceptinvite", 
          {email, secretToken,},
          {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          });
      } catch (error) {
        toast.error("pls try again")
        }
      toast.dismiss(toastId)
    }
    const handleOnSubmit = (e:any) => {
      e.preventDefault()
      // Reset
      setFormData({
      email: "",
      secretToken: "",
      })
      sendInvite();
    }  

    return (
      <div className='flex flex-col items-center justify-center text-black mt-10'>
      <form onSubmit={handleOnSubmit} className="flex w-[400px] flex-col items-center  justify-center gap-4"> 
        <label className="w-full">
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
            className="h-[50px] w-full rounded-md border border-sky-500 focus:outline-none pl-2"
          />
        </label>
        <label className='w-full'>
          <p className="mb-1">
          Secter key <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type="text"
            name="name"
            onChange={handleOnChange}
            placeholder="Enter secret key"
            className="h-[50px] w-full rounded-md border border-sky-500 focus:outline-none pl-2"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-150 h-[50px] sm:h-[42px] sm:w-[260px] py-2 px-10 text-white-25 rounded flex items-center justify-center mb-4"
        >
          Join Team
        </button>
    </form>
  </div>
  );
};

export default AddMemberPage;
