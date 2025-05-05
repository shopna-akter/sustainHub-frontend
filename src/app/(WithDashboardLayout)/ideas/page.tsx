/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { Button, Table, Modal, Form, Input, Select, message } from 'antd';
import {
  getIdeas,
  addIdea,
  updateIdea,
  deleteIdea,
} from '@/services/ideaService';
type IdeaStatus = 'PENDING' | 'APPROVED' | 'REJECTED';


interface Idea {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  status: IdeaStatus;
}

const IdeaPage = () => {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIdea, setEditingIdea] = useState<Idea | null>(null);
  const [form] = Form.useForm();

  const fetchAllIdeas = async () => {
    setLoading(true);
    try {
      const data = await getIdeas();
      setIdeas(data);
    } catch (err) {
      message.error('Failed to load ideas');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAllIdeas();
  }, []);

  const handleAdd = () => {
    setEditingIdea(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (idea: Idea) => {
    setEditingIdea(idea);
    form.setFieldsValue(idea);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    await deleteIdea(id);
    message.success('Idea deleted');
    fetchAllIdeas();
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (editingIdea) {
        await updateIdea(editingIdea.id, values);
        message.success('Idea updated');
      } else {
        await addIdea(values);
        message.success('Idea added');
      }
      setIsModalOpen(false);
      fetchAllIdeas();
    } catch (error) {
      message.error('Submission failed');
    }
  };

  const columns = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    { title: 'Category', dataIndex: 'categoryId', key: 'categoryId' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    {
      title: 'Actions',
      key: 'action',
      render: (_: any, record: Idea) => (
        <>
          <Button onClick={() => handleEdit(record)} size="small" className="mr-2">
            Edit
          </Button>
          <Button onClick={() => handleDelete(record.id)} danger size="small">
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={handleAdd} className="mb-4">
        Add Idea
      </Button>
      <Table
        columns={columns}
        dataSource={ideas}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
        bordered
      />
      <Modal
        title={editingIdea ? 'Edit Idea' : 'Add Idea'}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleSubmit}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="categoryId" label="Category ID" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="status" label="Status" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="PENDING">Pending</Select.Option>
              <Select.Option value="APPROVED">Approved</Select.Option>
              <Select.Option value="REJECTED">Rejected</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default IdeaPage;
