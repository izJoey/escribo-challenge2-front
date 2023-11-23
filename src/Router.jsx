import { Route, Routes } from "react-router-dom";
import { SignIn } from "./pages/signIn";
import { SignUp } from "./pages/signUp";
import { Feed } from "./pages/feed";
import { UserProvider } from "./UserContext";

export function Router() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/cadastro" element={<SignUp />} />
        <Route path="/feed" element={<Feed />} />
      </Routes>
    </UserProvider>
  );
}
