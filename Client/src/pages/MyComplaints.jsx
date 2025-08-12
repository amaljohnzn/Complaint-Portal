import { useEffect, useState } from "react";
import API from "../utils/api";

export default function MyComplaints() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    API.get("/complaints/my").then((res) => setComplaints(res.data));
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Complaint List</h2>
      {complaints.length === 0 ? (
        <p className="text-gray-600">No complaints submitted yet.</p>
      ) : (
        <div className="space-y-6">
          {complaints.map((c) => (
            <div
              key={c._id}
              className="bg-white rounded-2xl shadow-md p-4 flex gap-6 items-start hover:shadow-lg transition"
            >
              {/* Image Section */}
              {c.photoUrl && (
                <img
                  src={c.photoUrl}
                  alt="Complaint"
                  className="w-40 h-28 rounded-xl object-cover flex-shrink-0"
                />
              )}

              {/* Details Section */}
              <div className="flex flex-col flex-grow">
                <div className="flex justify-between items-start">
                  <h4 className="text-lg font-semibold">{c.title}</h4>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      c.status === "Resolved"
                        ? "bg-green-100 text-green-700"
                        : c.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : c.status === "In Progress"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {c.status}
                  </span>
                </div>

                <p className="text-xs text-gray-500 mb-1">
                  Submitted on{" "}
                  {c.dateSubmitted
                    ? new Date(c.dateSubmitted).toLocaleString()
                    : "Unknown date"}
                </p>

                <div className="flex justify-between text-sm text-gray-600">
                  <p>
                    <strong>Category:</strong> {c.category || "N/A"}
                  </p>
                  <p>
                    <strong>Location:</strong> {c.location || "Not specified"}
                  </p>
                </div>

                <p className="mt-2 text-gray-700">{c.description}</p>

                <p className="mt-2 text-sm text-gray-500">
                  <strong>Admin Message:</strong>{" "}
                  <span className="italic">
                    {c.statusMessage?.trim() || "No message from admin yet"}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
