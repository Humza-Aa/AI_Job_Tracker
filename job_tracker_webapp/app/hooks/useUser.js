import { useState, useEffect } from 'react';

const useUser = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('http://localhost:5000/auth/isauthenticated', {
          method: 'GET',
          credentials: 'include',
        });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
      // console.log()
    };

    fetchUser();
  }, []);

  return { user, isAuthenticated, loading };
};

export default useUser;