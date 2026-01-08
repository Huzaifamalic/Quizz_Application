import { useState } from "react";
import { supabase } from "../supabase/client";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


export default function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-cyan-500 px-4">
      <form
        onSubmit={handleSignup}
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md"
      >
        <h2 className="text-3xl font-extrabold text-center text-purple-600 mb-6">
          Create Account 🚀
        </h2>

        <input
          type="text"
          placeholder="Username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-4 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition disabled:opacity-50"
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>

        <p className="text-center text-gray-500 mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-purple-600 cursor-pointer font-semibold hover:underline"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
