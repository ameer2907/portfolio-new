import { useState } from "react";
import JourneyStop from "./JourneyStop";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Linkedin, Github, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContactSection = ({ isActive }: { isActive?: boolean }) => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast({ title: "Please fill all fields", variant: "destructive" });
      return;
    }
    toast({ title: "Message sent!", description: "Thanks for reaching out. I'll get back to you soon." });
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <JourneyStop id="contact" icon="📬" title="Get In Touch" subtitle="Let's connect and build something amazing" isActive={isActive} accentColor="hsl(190,100%,50%)">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="space-y-6">
          <div className="glass-hover rounded-2xl p-6 space-y-4">
            <a href="tel:9087223978" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
              <Phone className="w-4 h-4 text-primary" />
              <span className="text-sm">9087223978</span>
            </a>
            <a href="mailto:ameermalikbahad07@gmail.com" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
              <Mail className="w-4 h-4 text-primary" />
              <span className="text-sm">ameermalikbahad07@gmail.com</span>
            </a>
          </div>

          <div className="flex gap-3">
            <a href="#" className="flex-1 glass-hover rounded-xl p-4 flex flex-col items-center gap-2 hover:text-primary transition-colors">
              <Linkedin className="w-5 h-5" />
              <span className="text-xs">LinkedIn</span>
            </a>
            <a href="#" className="flex-1 glass-hover rounded-xl p-4 flex flex-col items-center gap-2 hover:text-primary transition-colors">
              <Github className="w-5 h-5" />
              <span className="text-xs">GitHub</span>
            </a>
          </div>

          <div className="glass-hover rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Globe className="w-4 h-4 text-primary" />
              <span className="text-sm font-heading font-medium">Languages</span>
            </div>
            <p className="text-xs text-muted-foreground">Tamil (Native) • English (Intermediate)</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="glass-hover rounded-2xl p-6 space-y-4">
          <Input
            placeholder="Your Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="bg-white/5 border-white/10 focus:border-primary"
          />
          <Input
            type="email"
            placeholder="Your Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="bg-white/5 border-white/10 focus:border-primary"
          />
          <Textarea
            placeholder="Your Message"
            rows={4}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="bg-white/5 border-white/10 focus:border-primary"
          />
          <Button type="submit" className="w-full glow">
            Send Message
          </Button>
        </form>
      </div>
    </JourneyStop>
  );
};

export default ContactSection;
