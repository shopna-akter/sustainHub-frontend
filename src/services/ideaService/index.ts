/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';
import { revalidatePath } from 'next/cache';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getIdeas = async () => {
  const res = await fetch(`${API_BASE_URL}/ideas`, { cache: 'no-store' });
  return res.json();
};

export const addIdea = async (idea: any) => {
  const res = await fetch(`${API_BASE_URL}/ideas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(idea),
  });
  revalidatePath('/dashboard/ideas');
  return res.json();
};

export const updateIdea = async (id: string, idea: any) => {
  const res = await fetch(`${API_BASE_URL}/ideas/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(idea),
  });
  revalidatePath('/dashboard/ideas');
  return res.json();
};

export const deleteIdea = async (id: string) => {
  await fetch(`${API_BASE_URL}/ideas/${id}`, { method: 'DELETE' });
  revalidatePath('/dashboard/ideas');
};
