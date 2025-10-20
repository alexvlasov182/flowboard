import { Link } from 'react-router-dom';
import heroImage from '../../assets/page-1.jpg';
import featureImage1 from '../../assets/page-2.png';
import featureImage2 from '../../assets/page-3.png';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <section className="relative flex flex-col-reverse md:flex-row items-center justify-between max-w-7xl mx-auto px-6 py-20 md:py-32">
        <div className="md:w-1/2 text-center md:text-left space-y-6">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            FlowBoard
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-md mx-auto md:mx-0">
            A lightweight Notion-style collaboration tool. Create pages, organize your content, and
            work together effortlessly.
          </p>

          <div className="flex justify-center md:justify-start gap-4 mt-6">
            <Link
              to="/signup"
              className="px-6 py-3 bg-brand-500 text-white rounded-lg hover:bg-brand-600 shadow-lg transition"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="px-6 py-3 border border-brand-500 text-brand-500 rounded-lg hover:bg-brand-50 transition"
            >
              Login
            </Link>
          </div>
        </div>

        <div className="md:w-1/2 mb-12 md:mb-0 flex justify-center">
          <img
            src={heroImage}
            alt="FlowBoard Hero"
            className="w-full max-w-md rounded-2xl shadow-xl"
          />
        </div>
      </section>

      {/* Feature Images Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-xl font-semibold text-gray-900">Organize Everything</h3>
            <p className="text-gray-600">
              Create pages, add content, and structure your workspace just the way you want.
            </p>
          </div>
          <img
            src={featureImage1}
            alt="Feature preview 1"
            className="rounded-2xl shadow-lg w-full"
          />
          <img
            src={featureImage2}
            alt="Feature preview 2"
            className="rounded-2xl shadow-lg w-full"
          />
        </div>
      </section>

      {/* Features Description Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">Collaborate with Teams</h3>
            <p className="text-gray-600">
              Share pages, work together in real-time, and stay aligned across projects.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">Simple & Clean</h3>
            <p className="text-gray-600">
              Minimal interface that focuses on your content, not clutter.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">Works Anywhere</h3>
            <p className="text-gray-600">
              Access your pages on any device, from desktop to mobile, seamlessly.
            </p>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-20 bg-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Start organizing your work today
        </h2>
        <p className="text-gray-600 mb-8 max-w-lg mx-auto">
          Sign up now and experience the ease of managing your ideas, projects, and notes all in one
          place.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/signup"
            className="px-8 py-3 bg-brand-500 text-white rounded-lg hover:bg-brand-600 shadow-lg transition"
          >
            Sign Up Free
          </Link>
          <Link
            to="/login"
            className="px-8 py-3 border border-brand-500 text-brand-500 rounded-lg hover:bg-brand-50 transition"
          >
            Login
          </Link>
        </div>
      </section>
    </div>
  );
}
