import { useEffect } from "react";
import Auth from "./ui/Auth";
import { onAuthChange } from "./firebase";
import { clearAuth, setUser } from "./features/auth/auth.slice";
import { useAppDispatch } from "./hooks/hooks";
import api from "./services/api.service";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthChange(async (currentUser) => {
      console.log("pathing");
      if (currentUser) {
        const firebaseUid = currentUser.uid;
        try {
          const response = await api.get(`/user/profile/${firebaseUid}/`);
          console.log("response", response);
          const profileData = await response.data;
          dispatch(setUser(profileData));
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      } else {
        clearAuth();
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
      <Auth />
    </>
  );
}

export default App;
