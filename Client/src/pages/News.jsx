// src/pages/News.jsx
import { useEffect, useState } from "react";
import API from "../utils/api";

export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    let mounted = true;
    const fetchNews = async () => {
      try {
        const res = await API.get("/news");
        if (!mounted) return;
        setNews(res.data);
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to load news");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchNews();
    return () => (mounted = false);
  }, []);

  if (loading)
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-gray-500">Loading news...</div>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">News & Updates</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">
          {error}
        </div>
      )}

      {news.length === 0 ? (
        <div className="text-gray-600">No news available at the moment.</div>
      ) : (
        <div className="space-y-6">
          {news.map((n) => (
            <article
              key={n._id}
              className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden flex flex-col md:flex-row"
            >
              {/* Image with overlay meta */}
              {n.imageUrl && (
                <div className="relative md:w-1/3">
                  <img
                    src={n.imageUrl}
                    alt={n.title}
className="w-full h-48 object-cover"
                  />
                  <div className="absolute bottom-3 left-3 bg-black/50 text-white text-xs rounded-lg px-3 py-2 space-y-1">
                    
                    <div className="flex items-center gap-2">
                      <span>{new Date(n.createdAt || n.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Text content */}
              <div className="p-5 flex flex-col flex-1 justify-center">
                <h2 className="text-xl font-bold text-gray-900">{n.title}</h2>
                {n.createdBy && (
                  <p className="text-sm text-indigo-600 font-medium mt-1">
                  Auther: Muncipal
                  </p>
                )}
                <p className="text-sm text-gray-600 mt-3 line-clamp-3">
                  {n.content}
                </p>

                <div className="mt-4">
                  <button
                    onClick={() => setSelected(n)}
                    className="inline-block text-indigo-600 hover:underline text-sm font-medium"
                  >
                    Read more →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Read More Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setSelected(null)}
          />
          <div className="relative bg-white rounded-xl max-w-2xl w-full shadow-lg p-6 z-10">
            <div className="flex justify-between items-start gap-4">
              <h3 className="text-xl font-bold">{selected.title}</h3>
              <button
                onClick={() => setSelected(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {selected.imageUrl && (
              <img
                src={selected.imageUrl}
                alt={selected.title}
                className="mt-4 w-full h-56 object-cover rounded"
              />
            )}

            <p className="mt-4 text-gray-700 whitespace-pre-wrap">
              {selected.content}
            </p>

            <p className="mt-4 text-xs text-gray-400">
              Published:{" "}
              {new Date(selected.createdAt || selected.date).toLocaleString()}
            </p>

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setSelected(null)}
                className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
