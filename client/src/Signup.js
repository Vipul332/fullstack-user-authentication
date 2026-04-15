import { useState } from 'react';
import axios from 'axios';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const API = process.env.REACT_APP_API_URL;

  const signup = async () => {
    setLoading(true);

    try {
      await axios.post(`${API}/api/auth/signup`, {
        name,
        email,
        password
      });

      alert('Account created');
      window.location.href = '/';

    } catch (err) {
      
      if (!err.response) {
        alert("Server is waking up... please wait 5 seconds and try again");
      } else {
        alert(err.response.data?.message || "Signup failed");
      }
    }

    setLoading(false);
  };

  return (
    <div>
      <h2>Signup</h2>

      <input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={signup} disabled={loading}>
        {loading ? "Creating..." : "Signup"}
      </button>
    </div>
  );
}