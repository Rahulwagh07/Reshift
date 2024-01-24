"use client"
import { Dispatch } from "@reduxjs/toolkit"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import logout from "./logout"
import { setUser } from "@/redux/slices/profileSlice"
import { apiConnector } from "./apiConnector"
import { User } from "@/types/user"

export function getUserDetails(token: string, router : AppRouterInstance, userId: string) {
    return async (dispatch: Dispatch) => {
      try {
        const response = await apiConnector("GET", '/api/getuserdetails', {userId}, {
          Authorization: `Bearer ${token}`,
        })
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        const user: User = JSON.parse(JSON.stringify(response.data.user));
        localStorage.setItem('user', JSON.stringify(user));
        dispatch(setUser(user));
       
      } catch (error) {
        logout(dispatch, router);
      }
    }
  }

  