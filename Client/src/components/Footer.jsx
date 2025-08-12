export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-white">My Website</span>. All rights reserved.
        </p>

        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors duration-200">Terms</a>
          <a href="#" className="hover:text-white transition-colors duration-200">Contact</a>
        </div>
      </div>
    </footer>
  );
}
