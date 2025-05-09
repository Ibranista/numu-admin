import { useEffect } from "react";
import { onAuthChange } from "./firebase";
import { clearAuth } from "./features/auth/auth.slice";
import { useAppDispatch } from "./hooks/hooks";
import Dashboard from "./ui/dashboard";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { getUserProfile } from "./features/auth/thunk.api";
import AuthRedirect from "./ui/AuthRedirect";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthChange(async (currentUser) => {
      if (currentUser) {
        try {
          await dispatch(getUserProfile(currentUser.uid));
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      } else {
        dispatch(clearAuth());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/auth" element={<AuthRedirect />} />
    </Routes>
  );
}

export default App;
