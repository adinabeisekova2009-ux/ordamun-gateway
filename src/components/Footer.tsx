import { motion } from "framer-motion";
import { Instagram, Mail, ArrowUp } from "lucide-react";
import ordamunLogo from "@/assets/ordamun-logo.jpg";

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Logo & Copyright */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img 
                src={ordamunLogo} 
                alt="OrdaMUN Logo" 
                className="h-10 w-auto"
              />
              <span className="font-display text-lg font-semibold text-foreground">
                Orda<span className="text-gold">MUN</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 OrdaMUN. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Shaping future leaders through diplomacy
            </p>
          </div>

          {/* Social & Back to Top */}
          <div className="flex items-center justify-end gap-4">
            <a
              href="https://instagram.com/ordamun"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-gold/20 transition-colors"
            >
              <Instagram className="w-4 h-4 text-muted-foreground hover:text-gold" />
            </a>
            <a
              href="mailto:info@ordamun.kz"
              className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-gold/20 transition-colors"
            >
              <Mail className="w-4 h-4 text-muted-foreground hover:text-gold" />
            </a>
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full bg-gold flex items-center justify-center hover:bg-gold-light transition-colors ml-4"
            >
              <ArrowUp className="w-4 h-4 text-background" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
