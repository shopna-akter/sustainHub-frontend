"use server"
import { getCurrentUser } from '@/services/authService/index';
import { Navbar } from './Navbar';

const NavbarWrapper = async () => {
  const user = await getCurrentUser();
  return <Navbar user={user} />;
};

export default NavbarWrapper;