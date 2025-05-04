'use client';

import { Input } from '@/components/ui/input';

export const IdeaSearchBar = () => (
  <div className="flex justify-center mt-6 mb-10">
    <Input placeholder="Search by idea name or category..." className="w-full max-w-xl" />
  </div>
);
