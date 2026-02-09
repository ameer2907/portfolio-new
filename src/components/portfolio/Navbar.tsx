import { Bus, Menu, X, Download } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { id: "hero", label: "Home" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "certifications", label: "Certifications" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "future", label: "Future" },
  { id: "contact", label: "Contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button onClick={() => scrollTo("hero")} className="flex items-center gap-2 text-primary font-heading font-bold text-lg">
            <Bus className="w-5 h-5" />
            <span>AMB</span>
          </button>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="px-3 py-2 text-sm text-muted-foreground hover:text-primary transition-colors rounded-md hover:bg-white/5"
              >
                {link.label}
              </button>
            ))}
            <a
              href="/resume.pdf"
              download
              className="ml-2 flex items-center gap-1.5 px-3 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Resume
            </a>
          </div>

          <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden glass border-t border-white/5 px-4 pb-4">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="block w-full text-left px-3 py-2.5 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </button>
          ))}
          <a
            href="/resume.pdf"
            download
            className="mt-2 flex items-center gap-1.5 px-3 py-2.5 text-sm text-primary"
          >
            <Download className="w-3.5 h-3.5" />
            Download Resume
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
