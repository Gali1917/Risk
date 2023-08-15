import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import SignupPages from "./pages/SignupPages";
import AccountPage from "./pages/AccountPage";
import SigninPage from "./pages/SigninPage";
import Header from "./components/ui/Header";

import { UserProvider } from "./context/providers/userContext";

function App() {
  return (
    <main>
      <Router>
        <UserProvider>
          <Header/>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignupPages />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/signin" element={<SigninPage />} />

          </Routes>
        </UserProvider>
      </Router>
    </main>
  );
}

export default App;
