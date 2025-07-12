import { Recycle, Instagram, Twitter, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Recycle className="h-8 w-8 text-accent" />
              <h3 className="text-2xl font-bold">ReWear</h3>
            </div>
            <p className="text-white/80 mb-4">
              Sustainable fashion for a better tomorrow. Join our community of conscious consumers.
            </p>
            <div className="flex space-x-4">
              <button className="bg-transparent hover:bg-accent text-white hover:text-accent rounded-full p-2 transition-colors">
                <Instagram className="h-5 w-5" />
              </button>
              <button className="bg-transparent hover:bg-accent text-white hover:text-accent rounded-full p-2 transition-colors">
                <Twitter className="h-5 w-5" />
              </button>
              <button className="bg-transparent hover:bg-accent text-white hover:text-accent rounded-full p-2 transition-colors">
                <Facebook className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/80 hover:text-accent transition-colors">Browse Items</a></li>
              <li><a href="#" className="text-white/80 hover:text-accent transition-colors">How it Works</a></li>
              <li><a href="#" className="text-white/80 hover:text-accent transition-colors">Categories</a></li>
              <li><a href="#" className="text-white/80 hover:text-accent transition-colors">Join Community</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/80 hover:text-accent transition-colors">Help Center</a></li>
              <li><a href="#" className="text-white/80 hover:text-accent transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-white/80 hover:text-accent transition-colors">Safety Guidelines</a></li>
              <li><a href="#" className="text-white/80 hover:text-accent transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4">Stay Updated</h4>
            <p className="text-white/80 mb-4">
              Get the latest sustainable fashion tips and ReWear updates.
            </p>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button className="bg-accent text-white px-4 py-2 rounded-lg font-semibold hover:bg-accent/90 transition-colors text-sm">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-white/60">
            © 2024 ReWear. All rights reserved. Made by TEAM 0759 for a sustainable future.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;