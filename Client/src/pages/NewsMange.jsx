// src/pages/NewsMgmt.jsx
import { useEffect, useState } from "react";
import API from "../utils/api";

export default function NewsMgmt() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ title: "", content: "", image: null });
  const [saving, setSaving] = useState(false);

  const showToast = (type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await API.get("/news");
      const data = Array.isArray(res.data) ? res.data : res.data.data || [];
      setNews(data);
    } catch {
      setError("Failed to fetch news");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchNews(); }, []);

  const resetForm = () => setForm({ title: "", content: "", image: null });

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) {
      showToast("error", "Title and content are required");
      return;
    }
    setSaving(true);
    try {
      const data = new FormData();
      data.append("title", form.title);
      data.append("content", form.content);
      if (form.image) data.append("image", form.image);

      let res;
      if (editingId) {
        res = await API.put(`/news/${editingId}`, data);
        setNews((p) => p.map((n) => (n._id === editingId ? res.data : n)));
        showToast("success", "News updated");
      } else {
        res = await API.post("/news", data);
        setNews((p) => [res.data, ...p]);
        showToast("success", "News created");
      }

      resetForm();
      setModalOpen(false);
      setEditingId(null);
    } catch {
      showToast("error", "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (n) => {
    setEditingId(n._id);
    setForm({ title: n.title, content: n.content, image: null });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this news item?")) return;
    try {
      await API.delete(`/news/${id}`);
      setNews((p) => p.filter((n) => n._id !== id));
      showToast("success", "News deleted");
    } catch {
      showToast("error", "Delete failed");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-6 right-6 z-50 px-4 py-3 rounded-lg shadow-md animate-fadeIn ${
            toast.type === "success"
              ? "bg-green-50 border border-green-200 text-green-700"
              : "bg-red-50 border border-red-200 text-red-700"
          }`}
        >
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage News</h1>
        <button
          onClick={() => { resetForm(); setModalOpen(true); setEditingId(null); }}
          className="px-5 py-2 rounded-full bg-green-600 hover:bg-green-700 text-white shadow"
        >
          + Create News
        </button>
      </div>

      {/* Error */}
      {error && <div className="mb-4 text-red-600">{error}</div>}

      {/* News List */}
      {loading ? (
        <div className="text-gray-500">Loading...</div>
      ) : news.length === 0 ? (
        <div className="text-gray-600">No news items yet.</div>
      ) : (
        <div className="grid gap-4">
          {news.map((n) => (
            <div
              key={n._id}
              className="bg-white border rounded-xl p-4 flex gap-4 items-start shadow-sm hover:shadow-md transition"
            >
              {n.imageUrl ? (
                <img
                  src={n.imageUrl}
                  alt={n.title}
                  className="w-28 h-20 object-cover rounded"
                />
              ) : (
                <div className="w-28 h-20 bg-gray-100 rounded flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold">{n.title}</h3>
                  <small className="text-xs text-gray-400">
                    {new Date(n.createdAt || n.date).toLocaleString()}
                  </small>
                </div>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {n.content}
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <button
                    onClick={() => startEdit(n)}
                    className="px-3 py-1 bg-indigo-600 text-white rounded-full text-sm hover:bg-indigo-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(n._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-full text-sm hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg animate-fadeIn">
            <h2 className="text-xl font-bold mb-4">
              {editingId ? "Edit News" : "Create News"}
            </h2>
            <form onSubmit={handleSave} className="space-y-4">
              <input
                className="w-full border rounded px-3 py-2"
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
              />
              <textarea
                rows={4}
                className="w-full border rounded p-2"
                placeholder="Content"
                value={form.content}
                onChange={(e) =>
                  setForm((p) => ({ ...p, content: e.target.value }))
                }
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setForm((p) => ({ ...p, image: e.target.files[0] || null }))
                }
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-full border"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-4 py-2 rounded-full text-white ${
                    saving
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                  disabled={saving}
                >
                  {saving
                    ? "Saving..."
                    : editingId
                    ? "Update"
                    : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
