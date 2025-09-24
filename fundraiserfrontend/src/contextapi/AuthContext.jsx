import { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const AuthContext = createContext();

// Provider component to manage login states and user data
export function AuthProvider({ children }) 
{
  // Load initial state from localStorage or default to false/null
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem('isAdminLoggedIn') === 'true';
  });

  const [isDonorLoggedIn, setIsDonorLoggedIn] = useState(() => {
    return localStorage.getItem('isDonorLoggedIn') === 'true';
  });
  
  const [isCreatorLoggedIn, setIsCreatorLoggedIn] = useState(() => {
    return localStorage.getItem('isCreatorLoggedIn') === 'true';
  });

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('isAdminLoggedIn', isAdminLoggedIn);
    localStorage.setItem('isDonorLoggedIn', isDonorLoggedIn);
    localStorage.setItem('isCreatorLoggedIn', isCreatorLoggedIn);
  }, [isAdminLoggedIn, isDonorLoggedIn, isCreatorLoggedIn]);

  return (
    <AuthContext.Provider
      value={{
        isAdminLoggedIn,
        setIsAdminLoggedIn,
        isDonorLoggedIn,
        setIsDonorLoggedIn,
        isCreatorLoggedIn,
        setIsCreatorLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to access the context
export const useAuth = () => useContext(AuthContext);