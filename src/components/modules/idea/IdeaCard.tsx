import { type Idea } from '@/types';
import Link from 'next/link';

export const IdeaCard = ({ idea }: { idea: Idea }) => (
  <div className="rounded-lg border p-4 shadow-sm">
    <h3 className="text-lg font-medium">{idea.title}</h3>
    <p className="text-muted-foreground line-clamp-2 text-sm">
      {idea.description}
    </p>
    <div className="mt-4 flex items-center justify-between">
      <VoteButtons ideaId={idea.id} initialVotes={idea.votes} />
      <Link 
        href={`/ideas/${idea.id}`} 
        className="text-primary hover:underline"
      >
        View Details
      </Link>
    </div>
  </div>
);