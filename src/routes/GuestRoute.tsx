// src/routes/GuestRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '@/utils/auth';

const GuestRoute: React.FC = () => {
  return isAuthenticated() ? <Navigate to="/chat" replace /> : <Outlet />;
};

export default GuestRoute;
