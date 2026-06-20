import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ContentProvider } from './context/ContentContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import AdminDashboard from './components/AdminDashboard';
import SiteRenderer from './components/SiteRenderer';
import Login from './pages/Login';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const Shell = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin') || location.pathname.startsWith('/login');

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg flex flex-col">
      {!isAdminRoute ? <Navbar /> : null}
      <main className={isAdminRoute ? 'flex-1' : 'flex-1 pt-16'}>
        <Routes>
          <Route path="/" element={<SiteRenderer page="home" />} />
          <Route path="/selayang-pandang" element={<SiteRenderer page="selayang" />} />
          <Route path="/kabinet" element={<SiteRenderer page="kabinet" />} />
          <Route path="/program-kerja" element={<SiteRenderer page="program" />} />
          <Route path="/konstitusi" element={<SiteRenderer page="konstitusi" />} />
          <Route path="/event" element={<SiteRenderer page="event" />} />
          <Route path="/wilayah" element={<SiteRenderer page="wilayah" />} />
          <Route path="/media-berita" element={<SiteRenderer page="berita" />} />
          <Route path="/kontak" element={<SiteRenderer page="kontak" />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
      {!isAdminRoute ? <Footer /> : null}
      {!isAdminRoute ? <BackToTop /> : null}
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <ContentProvider>
        <Router>
          <Shell />
        </Router>
      </ContentProvider>
    </ThemeProvider>
  );
}

export default App;
