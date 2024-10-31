import { useState, useEffect } from 'react';
import axios from 'axios';

const useCurrentUser = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/api/session-context/current-user', {
          withCredentials: true,
        });
        setUser(response.data.username);
        setRole(response.data.role);
      } catch (err) {
        setUser(null);
        setRole(null);
      }
    };

    fetchUser();
  }, []);

  return { user, role };
};

export default useCurrentUser;
