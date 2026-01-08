import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";

export default function History() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    const { data } = await supabase
      .from("results")
      .select("*")
      .order("created_at", { ascending: false });

    setResults(data || []);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Quiz History</h1>

      <div className="grid md:grid-cols-2 gap-4">
        {results.map((r) => (
          <div key={r.id} className="bg-white p-4 rounded-xl shadow">
            <h2 className="font-semibold text-blue-600">{r.username}</h2>
            <p className="text-gray-700">Score: {r.score}</p>
            <p className="text-sm text-gray-400">
              {new Date(r.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
