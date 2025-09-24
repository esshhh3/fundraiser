import { BrowserRouter } from "react-router-dom";
import MainNavBar from "./main/MainNavBar";
import AdminNavbar from "./admin/AdminNavbar";
import DonorNavBar from "./donor/DonorNavBar";
import CreatorNavBar from "./creator/CreatorNavBar";
import { AuthProvider, useAuth } from "./contextapi/AuthContext";

function AppContent() 
{
  const { isAdminLoggedIn, isDonorLoggedIn, isCreatorLoggedIn } = useAuth();

  return (
    <div>
      <BrowserRouter>
        {isAdminLoggedIn ? (
          <AdminNavbar />
        ) : isDonorLoggedIn ? (
          <DonorNavBar />
        ) : isCreatorLoggedIn ? (
          <CreatorNavBar />
        ) : (
          <MainNavBar />
        )}
      </BrowserRouter>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
