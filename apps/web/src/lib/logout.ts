import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import toast from 'react-hot-toast';
import { Dispatch } from 'redux';
import { setToken } from '../redux/slices/authSlice';
import { setUser } from '../redux/slices/profileSlice';

const logout = (dispatch: Dispatch, router: AppRouterInstance) => {
  const deleteCookie = (name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 2024 00:00:00 GMT; path=/;`;
  };

  deleteCookie('token');
  dispatch(setToken(null));
  dispatch(setUser(null));
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  toast.success('Logged Out');
  router.push('/');
};

export default logout;
