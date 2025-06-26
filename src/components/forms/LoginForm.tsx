import { Formik, Form, Field, ErrorMessage } from 'formik';
import { loginSchema } from '@/schemas/loginSchema';
import { useNavigate } from 'react-router-dom';
import { createUser } from '@/api/user';
import { User } from '@/types/user';
import { useState } from 'react';
import { AxiosError } from 'axios';
const LOCAL_STORAGE_KEY = 'chat_user';

const LoginForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (values: { username: string; email: string }) => {
    setLoading(true);
    try {
      const user: User = await createUser(values.username, values.email);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
      navigate('/chat');
    } catch (error) {
      const err = error as AxiosError<{ detail: string }>;
      if (err.response?.data?.detail) {
        setError(err.response.data.detail);
      } else {
        setError('Something went wrong. Please try again.');
      }

      console.error('Failed to create user:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={{ username: '', email: '' }}
      validationSchema={loginSchema}
      onSubmit={handleSubmit}
    >
      <Form className="space-y-6">
        {/* Username */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-chat-gray-700">Username</label>
          <Field
            name="username"
            type="text"
            className="w-full pl-3 pr-4 py-3 bg-white/50 border text-black border-chat-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-chat-blue-500"
            placeholder="Enter your username"
          />
          <ErrorMessage name="username" component="div" className="text-chat-red-500 text-sm" />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-chat-gray-700">Email</label>
          <Field
            name="email"
            type="email"
            className="w-full pl-3 pr-4 py-3 text-black bg-white/50 border border-chat-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-chat-blue-500"
            placeholder="Enter your email"
          />
          <ErrorMessage name="email" component="div" className="text-chat-red-500 text-sm" />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-chat-blue-500 text-white py-3 rounded-xl shadow-md hover:bg-chat-blue-600 transition"
        >
          {loading ? 'Creating account...' : 'Enter Chat'}
        </button>
        {error && <div className="text-red-600">{error}</div>}
      </Form>
    </Formik>
  );
};

export default LoginForm;
