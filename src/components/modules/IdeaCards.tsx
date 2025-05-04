import Link from "next/link";

export const IdeaCard = ({ title, description, category }: { title: string, description: string, category: string }) => (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-all">
      <img src="/idea-placeholder.jpg" alt="Idea" className="w-full h-40 object-cover rounded mb-3" />
      <span className="text-xs uppercase text-green-500 font-semibold">{category}</span>
      <h3 className="text-lg font-bold my-1">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
      <Link href="/ideas/idea-id" className="text-green-600 text-sm mt-2 inline-block hover:underline">View Idea</Link>
    </div>
  );
  