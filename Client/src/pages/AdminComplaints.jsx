import { useEffect, useState, useMemo } from "react";
import API from "../utils/api";

export default function AdminComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [updatingId, setUpdatingId] = useState(null);
  const perPage = 6;

  useEffect(() => {
    API.get("/complaints")
      .then((res) => setComplaints(res.data))
      .catch((err) => console.error("Error fetching complaints:", err));
  }, []);

  const updateStatus = async (id, status, statusMessage) => {
    setUpdatingId(id);
    try {
      await API.put(`/complaints/${id}/status`, { status, statusMessage });
      setComplaints((prev) =>
        prev.map((c) => (c._id === id ? { ...c, status, statusMessage } : c))
      );
    } catch (err) {
      console.error("Error updating status:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  // Filter complaints
  const filteredComplaints = useMemo(() => {
    return complaints.filter((c) => {
      const matchesSearch =
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.description.toLowerCase().includes(search.toLowerCase()) ||
        (c.location || "").toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filterStatus === "All" ? true : c.status === filterStatus;

      return matchesSearch && matchesFilter;
    });
  }, [complaints, search, filterStatus]);

  // Pagination setup
  const totalPages = Math.ceil(filteredComplaints.length / perPage);
  const paginatedComplaints = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    return filteredComplaints.slice(start, start + perPage);
  }, [filteredComplaints, currentPage, perPage]);

  const statusColors = {
    Pending: "bg-yellow-100 text-yellow-700",
    "In Progress": "bg-blue-100 text-blue-700",
    Resolved: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Complaint List</h2>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search complaints..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="border rounded-full px-5 py-2 flex-1 shadow-sm focus:ring focus:ring-blue-200"
        />

        <select
          value={filterStatus}
          onChange={(e) => {
            setFilterStatus(e.target.value);
            setCurrentPage(1);
          }}
          className="border rounded-full px-5 py-2 shadow-sm focus:ring focus:ring-blue-200"
        >
          <option value="All">All Categories</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Complaint Cards */}
      <div className="flex flex-col gap-6">
        {paginatedComplaints.length > 0 ? (
          paginatedComplaints.map((c) => (
            <div
              key={c._id}
              className="bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col sm:flex-row overflow-hidden"
            >
              {c.photoUrl && (
                <img
                  src={c.photoUrl}
                  alt={c.title}
                  className="w-full sm:w-48 h-48 object-cover"
                />
              )}
              <div className="p-4 flex flex-col flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold">{c.title}</h4>
                  <span
                    className={`px-4 py-1 rounded-full text-sm font-medium ${
                      statusColors[c.status] || "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {c.status}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(c.createdAt).toLocaleString()}
                </p>
                <p className="mt-2 text-sm">
                  <span className="font-medium">Category:</span> {c.category}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Location:</span> {c.location}
                </p>
                <p className="text-sm mb-3">
                  <span className="font-medium">Description:</span>{" "}
                  {c.description}
                </p>

                {/* Admin Message Box */}
                <textarea
                  className="border border-gray-300 rounded-lg p-2 text-sm w-full mb-3 focus:outline-none focus:ring focus:ring-blue-200"
                  placeholder="No message from admin yet"
                  value={c.statusMessage || ""}
                  onChange={(e) =>
                    setComplaints((prev) =>
                      prev.map((complaint) =>
                        complaint._id === c._id
                          ? { ...complaint, statusMessage: e.target.value }
                          : complaint
                      )
                    )
                  }
                />

                {/* Actions */}
                <div className="flex gap-3 mt-auto">
                  <select
                    value={c.status}
                    onChange={(e) =>
                      updateStatus(c._id, e.target.value, c.statusMessage)
                    }
                    className="border rounded-full px-4 py-2 text-sm focus:ring focus:ring-blue-200"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                  <button
                    onClick={() =>
                      updateStatus(c._id, c.status, c.statusMessage)
                    }
                    disabled={updatingId === c._id}
                    className={`px-5 py-2 rounded-full text-sm font-medium text-white transition 
                      ${
                        updatingId === c._id
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700"
                      }`}
                  >
                    {updatingId === c._id ? "Updating..." : "Update"}
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No complaints found.</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-4 py-2 border rounded-full disabled:opacity-50"
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={`px-4 py-2 border rounded-full ${
                currentPage === idx + 1
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {idx + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-4 py-2 border rounded-full disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
