import { useState } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { FaPaperPlane } from "react-icons/fa";

export default function CreateComplaint() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    setFile(f || null);
    setPreview(f ? URL.createObjectURL(f) : null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !category.trim()) {
      toast.error("Please fill Title, Description and Category.", { position: "top-right" });
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("location", location);
      if (file) formData.append("photo", file);

      await API.post("/complaints", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Complaint submitted successfully!", { position: "top-right" });

      // Reset form after success
      setTitle("");
      setDescription("");
      setCategory("");
      setFile(null);
      setPreview(null);
      setLocation("");

      setTimeout(() => navigate("/my-complaints"), 1500);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to create complaint", { position: "top-right" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Toast Container */}
      <Toaster />

      <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Municipal Complaint Registration
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <input
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a brief title for your complaint"
          />

          {/* Category */}
          <select
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select a category</option>
            <option value="Roads">Roads</option>
            <option value="Electricity">Electricity</option>
            <option value="Water">Water</option>
            <option value="Sanitation">Sanitation</option>
            <option value="Other">Other</option>
          </select>

          {/* Description */}
          <textarea
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none min-h-[100px]"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Provide detailed information about your complaint"
          />

          {/* Location */}
          <input
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter the location of the issue"
          />

          {/* File Upload */}
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-gray-600 file:mr-4 file:py-2 file:px-4 
                         file:rounded-full file:border-0 
                         file:text-sm file:font-semibold 
                         file:bg-indigo-50 file:text-indigo-700 
                         hover:file:bg-indigo-100 cursor-pointer"
            />
            {preview && (
              <img
                src={preview}
                alt="preview"
                className="mt-3 w-full max-h-64 object-cover rounded-lg shadow-sm border"
              />
            )}
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full font-medium shadow-sm disabled:opacity-60 transition-colors"
            >
              {loading ? "Submitting..." : <>
                <FaPaperPlane /> Submit
              </>}
            </button>

            <button
              type="button"
              onClick={() => {
                setTitle("");
                setDescription("");
                setCategory("");
                setFile(null);
                setPreview(null);
                setLocation("");
              }}
              className="text-gray-500 hover:text-gray-700 text-sm"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
      <br />
      <p class="text-gray-700 text-sm pl-12">
  Your complaint will be reviewed by our team, and appropriate action will be taken.
</p>
    </div>
  );
}
