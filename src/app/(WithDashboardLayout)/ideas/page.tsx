import { IdeaCRUD } from '@/components/modules/idea/IdeaCrud';

const page = () => {
    return (
        <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">My Ideas</h1>
      <IdeaCRUD />
    </div>
    );
};

export default page;