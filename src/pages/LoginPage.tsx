import LoginForm from '@/components/forms/LoginForm';

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-chat-blue-50 to-chat-purple-50 p-4 relative">
      <div className="relative z-10 w-full max-w-md bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6 text-chat-blue-800">Welcome to AI Chat</h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
