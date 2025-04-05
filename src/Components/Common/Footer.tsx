import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-6">

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 sm:p-5 bg-gray-900 text-white">

        {/* Left Section */}
        <div>
          <h3 className="text-lg font-bold mb-4">Students Gigs</h3>
          <p>
            Join us in creating a smarter, more independent generation by
            connecting students with real-world opportunities!
          </p>
        </div>


        {/* Middle Section */}
        <div className="sm:text-center">
          <h3 className="text-lg font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="https://gigs.studentsgigs.com/findtalent" className="hover:text-gray-400">
                Hire Students
              </a>
            </li>
            <li>
              <Link to={'/jobfilter'} className="hover:text-gray-400">
                Explore Jobs
              </Link>
            </li>
            <li>
              <Link to={'/contact'} className="hover:text-gray-400">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Address Section */}
        <div>
          <h3 className="text-lg font-bold mb-4">Our Address</h3>
          <p>StudentsGigs is an initiative of Medresearch India Pvt. Ltd.</p>
          <p className="mt-2">Medresearch India Pvt. Ltd.</p>
          <p>RKP/569H, Usha Building, Parammal Road</p>
          <p>Ramanattukara, Kozhikode, Kerala, India. PIN 673633</p>
          <a href="https://wa.me/919072399100" target="_blank" rel="noopener noreferrer" className="mt-2 block hover:text-indigo-400">
            📞 +91 90723 99100
          </a>
          <a href="mailto:studentsgigs@gmail.com" className="block hover:text-indigo-400">
            📧 studentsgigs@gmail.com
          </a>

        </div>

        {/* Right Section */}
        <div>

          <h3 className="text-lg font-bold mb-4">Connect With Us</h3>

          <div className="flex space-x-4 mb-4">

            <a href="https://www.facebook.com/studentsgigs.in" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook fa-lg"></i>
            </a>

            <a href="https://www.instagram.com/studentgigs.in" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram fa-lg"></i>
            </a>

            <a href="https://www.threads.net/@studentgigs.in" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-threads fa-lg"></i>
            </a>

            <a href="https://x.com/studentgigsone" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-x-twitter fa-lg"></i>
            </a>

            <a href="https://www.linkedin.com/company/studentsgigs/about/?viewAsMember=true" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin fa-lg"></i>
            </a>

            <a href="https://in.pinterest.com/studentgigsone/" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-pinterest fa-lg"></i>
            </a>

          </div>


        </div>
      </div>



      {/* Call-to-Action */}
      <div className="text-center mt-10">
        <Link to={'/plans'}>
          <button className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600">
            Get Started
          </button>
        </Link>
      </div>



      {/* Horizontal Line */}
      <div className="mt-10 border-t border-gray-700"></div>



      {/* Copyright Section */}
      <div className="mt-4 text-center text-sm px-4">
        <p>&copy; {new Date().getFullYear()} Job Portal. All Rights Reserved.</p>

        <div className="flex flex-wrap justify-center gap-2 py-1 text-xs sm:text-sm">
          <Link to={'/privacypolicy'} className="hover:text-gray-400">
            Privacy Policy
          </Link>

          <span className="hidden sm:inline">|</span>

          <Link to={'/termscondition'} className="hover:text-gray-400">
            Terms & Conditions
          </Link>

          <span className="hidden sm:inline">|</span>

          <Link to={'/refundpolicy'} className="hover:text-gray-400">
            Refund Policy
          </Link>
        </div>

        <p className="text-xs sm:text-sm">Powered by Exmedia</p>
      </div>


    </footer>
  );
};

export default Footer;
