// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatPage from '@/pages/ChatPage';
import LoginPage from '@/pages/LoginPage';
import NotFound from '@/pages/NotFound';
import ProtectedRoute from '@/routes/ProtectedRoute';
import GuestRoute from '@/routes/GuestRoute';

function App() {
  return (
    <Router>
      <div className="h-screen bg-[#f8f9fb] text-white overflow-auto">
        <Routes>
          {/* Only accessible if NOT logged in */}
          <Route element={<GuestRoute />}>
            <Route path="/" element={<LoginPage />} />
          </Route>

          {/* Only accessible if logged in */}
          <Route element={<ProtectedRoute />}>
            <Route path="/chat" element={<ChatPage />} />
          </Route>

          {/* 404 Not Found fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
