import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  const API = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setLoading(false);
          return;
        }

        const res = await axios.get(`${API}/api/user/me`, {
          headers: {
            "x-auth-token": token,
          },
        });

        setUser(res.data);
        setLoading(false);

      } catch (err) {
        if (retryCount < 3) {
          console.log("Retrying...");
          setRetryCount(prev => prev + 1);
          setTimeout(fetchUser, 3000);
        } else {
          console.log("Failed after retries");
          setLoading(false);
        }
      }
    };

    fetchUser();
  }, [retryCount]);

  return (
    <div>
      <h1>Dashboard</h1>

      {loading && <p>Waking server... please wait ☕</p>}

      {!loading && user && (
        <p>You are logged in as {user.email}</p>
      )}

      {!loading && !user && (
        <p>Please login again</p>
      )}
    </div>
  );
}

export default Dashboard;