import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section
  className="text-white py-20 bg-cover bg-center"
  style={{ 
 backgroundImage: "url('https://res.cloudinary.com/dandjcp0x/image/upload/v1754974939/krists-luhaers-9h7FNXpXJCo-unsplash_vpafv8.jpg')",
   }}
>
  <div className="max-w-7xl mx-auto px-6 text-center bg-opacity-50 py-10 rounded">
    <h1 className="text-4xl md:text-5xl font-bold mb-4">
      Welcome to Complaint Management System
    </h1>
    <p className="text-lg md:text-xl mb-8">
      Report issues quickly. Track their progress. Get them resolved.
    </p>
    <Link
      to="/create-complaint"
      className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition-colors"
    >
      Register a Complaint
    </Link>
  </div>
</section>


      {/* Section 1 - Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10">Our Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow p-6 text-center">
              <h3 className="text-xl font-semibold mb-2">Easy Complaint Registration</h3>
              <p className="text-gray-600">
                Submit your issues in just a few clicks with our simple and intuitive form.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 text-center">
              <h3 className="text-xl font-semibold mb-2">Real-time Tracking</h3>
              <p className="text-gray-600">
                Stay updated with the status of your complaints at any time.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 text-center">
              <h3 className="text-xl font-semibold mb-2">Admin Response</h3>
              <p className="text-gray-600">
                Get timely responses and resolution messages directly from admins.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 - About */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">About Our System</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Our complaint management system is designed to bridge the gap between
            citizens and authorities. By providing an efficient platform for complaint
            registration, tracking, and resolution, we aim to improve transparency,
            accountability, and community satisfaction.
          </p>
        </div>
      </section>
    </div>
  );
}
