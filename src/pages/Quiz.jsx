import { useEffect, useState } from "react";
import { questions } from "../data/questions";
import Timer from "../components/Timer";
import { supabase } from "../supabase/client";
import { useNavigate } from "react-router-dom";

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const navigate = useNavigate();
  const q = questions[current];

  const handleOption = (option) => {
    if (selected) return;
    setSelected(option);
    if (option === q.answer) setScore(score + 1);
  };

  const nextQuestion = () => {
    setSelected(null);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = async () => {
    setFinished(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      await supabase.from("results").insert([
        {
          user_id: user.id,
          username: user.user_metadata.username,
          score: score,
        },
      ]);
    }
  };

  if (finished) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-2xl shadow w-full max-w-md text-center">
          <h1 className="text-3xl font-bold text-blue-600">Quiz Completed 🎉</h1>
          <p className="mt-4 text-lg">
            Your Score: <b>{score}</b> / {questions.length}
          </p>

          <button
            onClick={() => navigate("/history")}
            className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl"
          >
            View History
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow p-6">

        {/* Header */}
        <div className="flex justify-between mb-4">
          <p className="text-blue-600 font-semibold">
            Question {current + 1}/{questions.length}
          </p>
          <Timer time={300} onTimeUp={finishQuiz} />
        </div>

        {/* Question */}
        <h2 className="text-xl font-bold mb-6">{q.question}</h2>

        {/* Options */}
        <div className="space-y-3">
          {q.options.map((opt, i) => {
            let style =
              "border border-blue-500 text-blue-600 hover:bg-blue-600 hover:text-white";

            if (selected) {
              if (opt === q.answer)
                style = "bg-green-500 text-white";
              else if (opt === selected)
                style = "bg-red-500 text-white";
            }

            return (
              <button
                key={i}
                onClick={() => handleOption(opt)}
                className={`w-full py-3 rounded-xl font-medium transition ${style}`}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        {selected && (
          <button
            onClick={nextQuestion}
            className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl"
          >
            {current + 1 === questions.length ? "Finish Quiz" : "Next Question"}
          </button>
        )}
      </div>
    </div>
  );
}
