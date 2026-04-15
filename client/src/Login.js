import { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const API = process.env.REACT_APP_API_URL;

  const login = async () => {
    setLoading(true);

    try {
      const res = await axios.post(`${API}/api/auth/login`, {
        email,
        password
      });

      localStorage.setItem('token', res.data.token);
      alert('Login successful');

      window.location.href = '/dashboard';

    } catch (err) {
      // 👇 Better error handling
      if (!err.response) {
        alert("Server is waking up... please wait 5 seconds and try again");
      } else {
        alert(err.response.data?.message || "Login failed");
      }
    }

    setLoading(false);
  };

  return (
    <div>
      <h2>Login</h2>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={login} disabled={loading}>
        {loading ? "Loading..." : "Login"}
      </button>

      <p onClick={() => window.location.href='/signup'}>
        Don't have an account? Signup
      </p>
    </div>
  );
}