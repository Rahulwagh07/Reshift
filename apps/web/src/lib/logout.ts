import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import toast from 'react-hot-toast';
import { Dispatch } from 'redux';
import { setToken } from '../redux/slices/authSlice';
import { setUser } from '../redux/slices/profileSlice';

const logout = (dispatch: Dispatch, router: AppRouterInstance) => {
  dispatch(setToken(null));
  dispatch(setUser(null));
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  //to do-> remove token from cookie
  toast.success('Logged Out');
  router.push('/');
};

export default logout;