'use client';

import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import { toast } from 'sonner';
import { loginUser } from '@/services/authService';
import { FieldValues } from 'react-hook-form';

const LoginForm = () => {
  const form = useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: FieldValues) => {
    setLoading(true);
    const response = await loginUser(values);
    setLoading(false);

    if (response?.success) {
      toast.success('Login successful!');
      router.push('/dashboard'); // Update route if needed
    } else {
      toast.error(response?.message || 'Login failed');
    }
  };

  return (
    <div className="max-w-md w-full mx-auto space-y-6 bg-white p-8 rounded-lg shadow-md">
      <div className="text-center">
        <Image
          src="https://res.cloudinary.com/dyztyaztu/image/upload/v1746358341/ChatGPT_Image_May_4__2025__05_12_00_PM-removebg-preview_qk5wge.png"
          alt="Sustain Hub Logo"
          width={80}
          height={80}
          className="mx-auto"
        />
        <h1 className="text-3xl font-bold text-[#016630] mt-2">Sustain Hub</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="example@email.com"
                    {...field}
                    className="border border-gray-300"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="******"
                    {...field}
                    className="border border-gray-300"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-[#016630] hover:bg-[#014d27] transition-colors cursor-pointer"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
