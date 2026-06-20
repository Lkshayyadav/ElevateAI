import { AuthProvider } from './features/auth/auth.context';
import { InterviewProvider } from './features/interview/interview.context';
import AppRoutes from './app.routes.jsx'; // Whatever your routes file is named

export default function App() {
  return (
    <div className="app-wrapper">
       {/* This is now handled by RouterProvider in main.jsx */}
    </div>
  );
}