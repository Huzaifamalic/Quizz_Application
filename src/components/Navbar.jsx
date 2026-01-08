import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabase/client";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-blue-600">
        QuizApp
      </Link>

      <div className="space-x-4">
        {user ? (
          <>
            <Link to="/quiz" className="text-gray-700 hover:text-blue-600">
              Quiz
            </Link>
            <Link to="/history" className="text-gray-700 hover:text-blue-600">
              History
            </Link>
            <button
              onClick={logout}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-gray-700 hover:text-blue-600">
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
