import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import SignupPages from "./pages/SignupPages";
import AccountPage from "./pages/AccountPage";

import { UserProvider } from "./context/providers/userContext";

function App() {
  return (
    <main>
      <Router>
        <UserProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignupPages />} />
            <Route path="/account" element={<AccountPage />} />

          </Routes>
        </UserProvider>
      </Router>
    </main>
  );
}

export default App;
