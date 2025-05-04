import { IdeaCard } from "./IdeaCards";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TestimonialsSection = ({ ideas }: { ideas: any[] }) => (
    <section className="py-10 bg-gray-50">
      <h2 className="text-2xl text-center font-semibold mb-6">Top Voted Ideas</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
        {ideas.map((idea, i) => (
          <IdeaCard
            key={i}
            title={idea.title}
            description={idea.description}
            category={idea.category}
          />
        ))}
      </div>
    </section>
  );
  