/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { api } from '@/lib/api';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

interface Idea {
  id: string;
  title: string;
  problem: string;
  solution: string;
  description: string;
  category: string;
  status: 'DRAFT' | 'PENDING' | 'APPROVED' | 'REJECTED';
  isPaid: boolean;
  price?: number;
}

export const IdeaCRUD = () => {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIdea, setEditingIdea] = useState<Idea | null>(null);

  // Form state (simplified for demo)
  const [formData, setFormData] = useState({
    title: '',
    problem: '',
    solution: '',
    description: '',
    category: '',
    isPaid: false,
    price: 0,
  });

  useEffect(() => {
    fetchIdeas();
  }, []);

  const fetchIdeas = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/ideas/me'); 
      setIdeas(data);
    } catch (error) {
      toast.error('Failed to fetch ideas');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      if (editingIdea) {
        await api.put(`/ideas/${editingIdea.id}`, formData);
        toast.success('Idea updated successfully');
      } else {
        await api.post('/ideas', formData);
        toast.success('Idea created successfully' );
      }
      setIsModalOpen(false);
      fetchIdeas();
    } catch (error ) {
      toast.error('Operation failed');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/ideas/${id}`);
      toast.success('Idea deleted');
      fetchIdeas();
    } catch (error) {
      toast.error('Error while deleting Idea');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Button onClick={() => { setEditingIdea(null); setIsModalOpen(true); }} className="mb-4">
        Add New Idea
      </Button>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ideas.map((idea) => (
            <TableRow key={idea.id}>
              <TableCell>{idea.title}</TableCell>
              <TableCell>{idea.category}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  idea.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                  idea.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {idea.status}
                </span>
              </TableCell>
              <TableCell>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => { 
                    setEditingIdea(idea); 
                    setFormData({
                      title: idea.title,
                      problem: idea.problem,
                      solution: idea.solution,
                      description: idea.description,
                      category: idea.category,
                      isPaid: idea.isPaid,
                      price: idea.price || 0,
                    });
                    setIsModalOpen(true);
                  }}
                >
                  Edit
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-red-600 hover:text-red-800"
                  onClick={() => handleDelete(idea.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modal for Add/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h2 className="text-xl font-bold mb-4">
              {editingIdea ? 'Edit Idea' : 'Add New Idea'}
            </h2>
            
            <div className="space-y-4">
              <Input 
                placeholder="Title" 
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
              
              <Textarea
                placeholder="Problem Statement"
                value={formData.problem}
                onChange={(e:any) => setFormData({...formData, problem: e.target.value})}
              />
              
              <Textarea
                placeholder="Proposed Solution"
                value={formData.solution}
                onChange={(e :any) => setFormData({...formData, solution: e.target.value})}
              />
              
              <Select
                value={formData.category}
                onValueChange={(value : any) => setFormData({...formData, category: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Energy">Energy</SelectItem>
                  <SelectItem value="Waste">Waste</SelectItem>
                  <SelectItem value="Transportation">Transportation</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="isPaid"
                  checked={formData.isPaid}
                  onChange={(e) => setFormData({...formData, isPaid: e.target.checked})}
                />
                <label htmlFor="isPaid">Paid Idea</label>
              </div>
              
              {formData.isPaid && (
                <Input 
                  type="number" 
                  placeholder="Price" 
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                />
              )}
            </div>
            
            <div className="flex justify-end space-x-2 mt-6">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>
                {editingIdea ? 'Update' : 'Create'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};