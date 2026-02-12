import { Bus, Heart } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-white/5 py-8 px-4 relative z-10">
    <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2 text-muted-foreground text-sm">
        <div className="w-6 h-6 rounded-md bg-gradient-to-br from-primary to-[hsl(210,100%,55%)] flex items-center justify-center">
          <Bus className="w-3 h-3 text-primary-foreground" />
        </div>
        <span>© 2025 K. Ameer Malik Bahad. All rights reserved.</span>
      </div>
      <p className="text-xs text-muted-foreground flex items-center gap-1">
        Built with <Heart className="w-3 h-3 text-[hsl(350,89%,60%)] fill-[hsl(350,89%,60%)]" /> React & Tailwind CSS
      </p>
    </div>
  </footer>
);

export default Footer;
