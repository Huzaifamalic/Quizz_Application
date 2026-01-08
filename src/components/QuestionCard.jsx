export default function QuestionCard({ data, onAnswer }) {
  return (
    <div className="bg-white/80 backdrop-blur-lg p-6 rounded-xl shadow-xl w-full max-w-xl">
      <h2 className="text-xl font-semibold mb-4">
        {data.question}
      </h2>

      <div className="grid gap-3">
        {data.options.map((opt) => (
          <button
            key={opt}
            onClick={() => onAnswer(opt)}
            className="border border-purple-400 px-4 py-2 rounded-lg hover:bg-purple-600 hover:text-white transition"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
