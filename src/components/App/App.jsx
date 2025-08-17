import './App.css'
import { Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import HomePage from '../../pages/HomePage/HomePage.jsx';
import LoginPage from '../../pages/LoginPage/LoginPage.jsx';
import RegisterPage from '../../pages/RegisterPage/RegisterPage.jsx';
import NanniesPage from '../../pages/NanniesPage/NanniesPage.jsx';
import { ThemeProvider } from '../../context/ThemeContext.jsx';

function App() {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID_HERE';

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <ThemeProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/nannies" element={<NanniesPage />} />
          </Routes>
        </div>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
