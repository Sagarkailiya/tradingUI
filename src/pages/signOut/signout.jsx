// import { auth } from "../../firebase";
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import toast from 'react-hot-toast';

export const handleLogout = async (navigate) =>{
  try {
    await signOut(auth);
    localStorage.removeItem('token');
    toast.success("Logged out Successfully");
    navigate('/signin');

  } catch (error) {
    console.error('Logout error:', error);
    toast.error("Logout failed. Please try again");
    
  }
}