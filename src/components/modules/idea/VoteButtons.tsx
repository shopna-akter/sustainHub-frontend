'use client';

import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';
import { useState } from 'react';

export const VoteButtons = ({ 
  ideaId, 
  initialVotes 
}: { 
  ideaId: string; 
  initialVotes: { up: number; down: number }; 
}) => {
  const [votes, setVotes] = useState(initialVotes);

  const handleVote = async (type: 'up' | 'down') => {
    try {
      await api.post('/votes', { ideaId, type });
      setVotes(prev => ({
        ...prev,
        [type]: prev[type] + 1
      }));
    } catch (error) {
      console.error('Vote failed:', error);
    }
  };

  return (
    <div className="flex gap-2">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => handleVote('up')}
      >
        👍 {votes.up}
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => handleVote('down')}
      >
        👎 {votes.down}
      </Button>
    </div>
  );
};