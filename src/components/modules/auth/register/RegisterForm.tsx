'use client';

import Image from 'next/image';
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
import { registerUser } from '@/services/authService/index';
import { FieldValues } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

const RegisterForm = () => {
    const form = useForm();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (values: FieldValues) => {
        setLoading(true);

        if (values.password !== values.confirmPassword) {
            form.setError('confirmPassword', {
                type: 'manual',
                message: 'Passwords do not match',
            });
            toast.error('Passwords do not match');
            setLoading(false);
            return;
        }

        const response = await registerUser(values);
        setLoading(false);

        if (response?.success) {
            toast.success('Registration successful!');
            router.push('/login');
        } else {
            toast.error(response?.message || 'Registration failed');
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
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="John Doe" {...field} className="border border-gray-300" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="example@email.com" {...field} className="border border-gray-300" />
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
                                    <Input type="password" placeholder="******" {...field} className="border border-gray-300" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="******" {...field} className="border border-gray-300" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="w-full bg-[#016630] hover:bg-[#014d27] cursor-pointer transition-colors"
                        disabled={loading}
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default RegisterForm;
