export default function Result({ score, total }) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-xl text-center">
      <h2 className="text-3xl font-bold text-purple-600">Quiz Completed 🎉</h2>
      <p className="mt-4 text-lg">
        Score: <span className="font-bold">{score}</span> / {total}
      </p>
    </div>
  );
}
