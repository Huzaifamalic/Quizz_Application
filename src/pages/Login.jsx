import { useState } from "react";
import { supabase } from "../supabase/client";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";


export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  setLoading(false);

  if (error) {
    toast.error(error.message);   // ❌ alert hata diya
  } else {
    toast.success("Login successful 🎉");
    navigate("/quiz");
  }
};


  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-blue-600 text-center mb-6">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-3 border rounded"
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 p-3 border rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-gray-500 mt-4">
          New user?{" "}
          <Link
            to="/signup"
            className="text-blue-600 font-semibold hover:underline"
          >
            Create account
          </Link>
        </p>
      </form>
    </div>
  );
}
