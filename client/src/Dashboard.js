import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get("http://localhost:5000/api/user/me", {
      headers: {
        "x-auth-token": token,
      },
    })
    .then(res => setUser(res.data))
    .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {user ? (
        <p>You are logged in as {user.email}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Dashboard;