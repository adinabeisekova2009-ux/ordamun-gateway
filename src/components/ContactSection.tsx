import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Instagram, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="contact"
      ref={ref}
      className="py-24 bg-charcoal"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm font-semibold tracking-widest uppercase">
            Get in Touch
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
            Contact Us
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Have questions about OrdaMUN 2025? We're here to help. Reach out to us
            through any of the channels below.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {/* Instagram */}
          <motion.a
            href="https://instagram.com/orda.mun"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="group p-6 rounded-2xl bg-card border border-border hover:border-gold/30 transition-all duration-300 text-center"
          >
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Instagram className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-display font-semibold text-foreground mb-1">
              Instagram
            </h3>
            <p className="text-sm text-gold">@orda.mun</p>
          </motion.a>

          {/* Phone */}
          <motion.a
            href="tel:+77054674869"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group p-6 rounded-2xl bg-card border border-border hover:border-gold/30 transition-all duration-300 text-center"
          >
            <div className="w-14 h-14 rounded-xl bg-burgundy/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Phone className="w-7 h-7 text-burgundy-light" />
            </div>
            <h3 className="font-display font-semibold text-foreground mb-1">
              Phone
            </h3>
            <p className="text-sm text-gold">+7 705 467 4869</p>
          </motion.a>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="group p-6 rounded-2xl bg-card border border-border hover:border-gold/30 transition-all duration-300 text-center"
          >
            <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <MapPin className="w-7 h-7 text-foreground" />
            </div>
            <h3 className="font-display font-semibold text-foreground mb-1">
              Location
            </h3>
            <p className="text-sm text-muted-foreground">Zhezkazgan, Kazakhstan</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
