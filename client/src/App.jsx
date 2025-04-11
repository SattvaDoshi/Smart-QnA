import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  RedirectToSignIn,
  SignedIn,
  SignedOut,
  SignIn,
  SignUp,
} from "@clerk/clerk-react";

import MainPage from "./pages/MainPage"; 
import MainPageLatest from "./pages/MainPage2"; 
import Header from "./Components/Header";
import DashBoard from "./pages/DashBoard";
import LandingPage from "./pages/LandingPage";

function ProtectedRoute({ children }) {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/main"
          element={
            <ProtectedRoute>
              <MainPageLatest />
            </ProtectedRoute>
          }
        />

        {/* Clerk SignIn and SignUp */}
        <Route
          path="/sign-in/*"
          element={<SignIn routing="path" path="/sign-in" />}
        />
        <Route
          path="/sign-up/*"
          element={<SignUp routing="path" path="/sign-up" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
