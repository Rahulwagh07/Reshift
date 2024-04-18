import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { useParams } from 'next/navigation';
import { RootState } from '../../redux/store';
import { apiConnector } from '../../lib/apiConnector';
import { IoSendOutline } from "react-icons/io5";

function AddNewMember() {
  const { token } = useSelector((state: RootState) => state.auth);
  const [email, setEmail] = useState('');
  const params = useParams<{ projectId: string }>();
  const projectId = params.projectId;

  const addMember = async (email: string) => {
    const toastId = toast.loading("Sending invitation...");
    try {
      const response = await apiConnector("POST", "/api/admin/addmember", { email, projectId }, {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      });
      if (response.data.success === true) {
        toast.success("Invitation sent successfully");
      } else {
        toast.error("Failed to send invitation");
      }
    } catch (error) {
      toast.error("Failed to send invitation");
    }
    toast.dismiss(toastId);
  }

  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMember(email);
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
      <form onSubmit={handleOnSubmit} className='mt-8 flex flex-col gap-4 items-center'>
        <h2 className='text-2xl font-semibold'>Send Invite to add new member for your project</h2>
        <input  
          type="email"
          placeholder="Enter email address"
          className="w-[325px] sm:w-[260px] h-[50px]  px-2 border border-sky-500   focus:outline-none rounded-md mb-4 "
          value={email}
          onChange={handleEmailChange}
        />
        <button type="submit" className='border border-blue-150 rounded-md px-4 py-2 flex items-center gap-2'> <span>Send</span> <IoSendOutline/></button>
      </form>
  );
}

export default AddNewMember;
