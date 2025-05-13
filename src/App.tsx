import { useEffect, useState } from "react";
import { onAuthChange } from "./firebase";
import { clearAuth } from "./features/auth/auth.slice";
import { useAppDispatch } from "./hooks/hooks";
import Dashboard from "./ui/dashboard";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { getUserProfile } from "./features/auth/thunk.api";
import AuthRedirect from "./ui/AuthRedirect";
import Utils from "./ui/Utils";
import TherapistMatch from "./ui/TherapistMatch";
import Therapists from "./ui/Therapist";
import Spinner from "./components/Spinner";

function App() {
  const dispatch = useAppDispatch();
  const [authChecked, setAuthChecked] = useState(false);

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
      setAuthChecked(true);
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (!authChecked) {
    return (
      <div className="flex items-center justify-center h-screen text-xl">
        <Spinner variation="screen-large" />
      </div>
    );
  }

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
      <Route
        path="/therapist"
        element={
          <ProtectedRoute>
            <Therapists />
          </ProtectedRoute>
        }
      />
      <Route
        path="/therapist-match"
        element={
          <ProtectedRoute>
            <TherapistMatch />
          </ProtectedRoute>
        }
      />
      <Route
        path="/utils"
        element={
          <ProtectedRoute>
            <Utils />
          </ProtectedRoute>
        }
      />
      <Route path="/auth" element={<AuthRedirect />} />
    </Routes>
  );
}

export default App;
