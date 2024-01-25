"use client"
import { getUserDetails } from '@/lib/getUserDetails';
import { User } from '@/types/user';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

function ClientApplication({children} : {children : any}) {
  const router = useRouter();
  useEffect(() => {
    
    if (localStorage.getItem("token")) {
      const token = JSON.stringify(localStorage.getItem("token"))
      const user: User = JSON.parse(JSON.stringify("user"));
      const userId = user._id;
      getUserDetails(token, router, userId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return children;
}

export default ClientApplication