import { IdeaCard } from '@/components/modules/idea/IdeaCard';
import { getPublicIdeas } from '@/services/ideaService';

const IdeasPage = async () => {
  const ideas = await getPublicIdeas();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {ideas.map((idea) => (
        <IdeaCard key={idea.id} idea={idea} />
      ))}
    </div>
  );
};

export default IdeasPage;