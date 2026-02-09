import { Bus } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-white/5 py-8 px-4">
    <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2 text-muted-foreground text-sm">
        <Bus className="w-4 h-4 text-primary" />
        <span>© 2025 K. Ameer Malik Bahad. All rights reserved.</span>
      </div>
      <p className="text-xs text-muted-foreground">
        Built with React & Tailwind CSS
      </p>
    </div>
  </footer>
);

export default Footer;
