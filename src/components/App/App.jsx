import './App.css'
import { Routes, Route } from 'react-router-dom';
import HomePage from '../../pages/HomePage/HomePage.jsx';
import LoginPage from '../../pages/LoginPage/LoginPage.jsx';
import RegisterPage from '../../pages/RegisterPage/RegisterPage.jsx';
import { ThemeProvider } from '../../context/ThemeContext.jsx';
import Header from '../Header/Header.jsx';


function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <>
              <HomePage />
            </>
          } />
          <Route path="/login" element={
            <>
              <LoginPage />
            </>
          } />
          <Route path="/register" element={
            <>
              <RegisterPage />
            </>
          } />
        </Routes>
      </div>
    </ThemeProvider>
  )
}

export default App;
