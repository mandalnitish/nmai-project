import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* ================= LAYOUT ================= */
import Navbar from "./components/Navbar";
import SecondaryBar from "./components/SecondaryBar";
import Footer from "./components/Footer";

/* ================= PAGES ================= */
import Home from "./pages/Home";
import CurrentAffairs from "./pages/CurrentAffairs";
import ArticleDetail from "./pages/ArticleDetail";
import CategoryPage from "./pages/CategoryPage";
import MCQPractice from "./pages/MCQPractice";
import DailyQuiz from "./pages/DailyQuiz";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";

/* ================= EBOOKS ================= */
import EbookMonthlyMCQs from "./pages/ebooks/EbookMonthlyMCQs";
import EbookArticlesMCQs from "./pages/ebooks/EbookArticlesMCQs";
import EbookYearlyPDF from "./pages/ebooks/EbookYearlyPDF";

/* ================= EXAMS ================= */
import ExamPage from "./pages/exams/ExamPage";

/* ================= LEGAL ================= */
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Disclaimer from "./pages/Disclaimer";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import TermsOfService from "./pages/TermsOfService";

/* ================= CONTEXT ================= */
import { AuthProvider, useAuth } from "./context/AuthContext";

/* ================= STYLES ================= */
import "./App.css";

/* ================= REACT QUERY ================= */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

/* ================= PRIVATE ROUTE ================= */
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div style={{ padding: "2rem", textAlign: "center" }}>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

/* ================= ADMIN ROUTE ================= */
const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div style={{ padding: "2rem", textAlign: "center" }}>Loading...</div>;
  }

  return user?.role === "admin" ? children : <Navigate to="/" replace />;
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="app-wrapper">
            <Navbar />
            <SecondaryBar />

            <main className="main-content">
              <Routes>

                {/* ===== PUBLIC ===== */}
                <Route path="/" element={<Home />} />
                <Route path="/current-affairs" element={<CurrentAffairs />} />
                <Route path="/article/:slug" element={<ArticleDetail />} />
                <Route path="/category/:category" element={<CategoryPage />} />
                <Route path="/mcq-practice" element={<MCQPractice />} />
                <Route path="/daily-quiz" element={<DailyQuiz />} />

                {/* ===== AUTH ===== */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* ===== USER ===== */}
                <Route
                  path="/profile"
                  element={
                    <PrivateRoute>
                      <Profile />
                    </PrivateRoute>
                  }
                />

                {/* ===== ADMIN ===== */}
                <Route
                  path="/admin/*"
                  element={
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  }
                />

                {/* ===== E-BOOKS ===== */}
                <Route path="/ebooks/monthly-mcqs" element={<EbookMonthlyMCQs />} />
                <Route path="/ebooks/ca-articles-mcqs" element={<EbookArticlesMCQs />} />
                <Route path="/ebooks/yearly-pdf" element={<EbookYearlyPDF />} />

                {/* ===== EXAMS ===== */}
                <Route path="/exams/:examSlug" element={<ExamPage />} />

                {/* ===== LEGAL ===== */}
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/disclaimer" element={<Disclaimer />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />

                {/* ===== 404 ===== */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>

            <Footer />

            <ToastContainer
              position="top-right"
              autoClose={3000}
              newestOnTop
              pauseOnHover
            />
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

/* ================= 404 ================= */
function NotFound() {
  return (
    <div style={{ padding: "3rem", textAlign: "center" }}>
      <h2>404 – Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
}
