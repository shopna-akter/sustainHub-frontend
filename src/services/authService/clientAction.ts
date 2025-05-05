'use client';
import { logoutUser } from './index';

export const handleLogout = async () => {
  await logoutUser();
  window.location.href = '/login';
};
