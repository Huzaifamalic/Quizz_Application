import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/client";

export default function Home() {
  const navigate = useNavigate();

  const startQuiz = async () => {
    const { data } = await supabase.auth.getUser();
    if (!data.user) navigate("/login");
    else navigate("/quiz");
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="bg-white w-full max-w-2xl p-10 rounded-3xl shadow-2xl text-center">

        {/* Badge */}
        <span className="inline-block mb-4 px-4 py-1 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full">
          React + Supabase Quiz
        </span>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-4">
          Test Your React Skills 🚀
        </h1>

        {/* Description */}
        <p className="text-gray-600 text-lg mb-10 leading-relaxed">
          Login to attempt interactive quizzes, track your scores, and improve
          your React knowledge step by step.
        </p>

        {/* CTA */}
        <button
          onClick={startQuiz}
          className="bg-blue-600 text-white px-10 py-4 rounded-xl text-lg font-semibold
                     hover:bg-blue-700 active:scale-95 transition-all duration-200 shadow-lg"
        >
          Start Quiz
        </button>

        {/* Footer text */}
        <p className="mt-6 text-sm text-gray-400">
          Authentication required to continue
        </p>
      </div>
    </div>
  );
}
