import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const schema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type LoginFormData = z.infer<typeof schema>;

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-1">Email</label>
          <input
            type="email"
            id="email"
            {...register('email')}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="password" className="block mb-1">Password</label>
          <input
            type="password"
            id="password"
            {...register('password')}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;