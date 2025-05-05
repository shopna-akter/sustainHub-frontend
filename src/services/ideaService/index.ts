"use server"
import { api } from '@/lib/api';

export const getPublicIdeas = async () => {
  const { data } = await api.get('/ideas?status=APPROVED');
  return data;
};

export const createIdea = async (formData: FormData) => {
  const { data } = await api.post('/ideas', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

export const submitForReview = async (ideaId: string) => {
  await api.put(`/ideas/${ideaId}/submit`);
};