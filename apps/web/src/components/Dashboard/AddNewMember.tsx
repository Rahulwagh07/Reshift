import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { useParams } from 'next/navigation';
import { RootState } from '../../redux/store';
import { apiConnector } from '../../lib/apiConnector';

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
        console.log("res", response.data.data);
      } else {
        toast.error("Failed to send invitation");
        console.log("Error in adding the new member:", response.data.message);
      }
    } catch (error) {
      console.error("Error", error);
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
    <div>
      <form onSubmit={handleOnSubmit}>
        <input  
          type="email"
          placeholder="Enter email address"
          className="w-[325px] sm:w-[260px] h-[50px]  px-2 border border-sky-500   focus:outline-none rounded-md mb-4 "
          value={email}
          onChange={handleEmailChange}
        />
        <button type="submit">Send Invitation</button>
      </form>
    </div>
  );
}

export default AddNewMember;
