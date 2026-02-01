import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Heart, Lightbulb } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To cultivate diplomatic thinking and global awareness among Central Asian youth, empowering them to become agents of positive change in their communities and beyond.",
  },
  {
    icon: Heart,
    title: "Our Values",
    description:
      "Integrity, respect for diversity, collaborative spirit, and commitment to excellence. We believe every voice matters in shaping our collective future.",
  },
  {
    icon: Lightbulb,
    title: "Our Vision",
    description:
      "To establish OrdaMUN as the leading platform for young diplomats in the region, fostering a new generation of thoughtful, engaged global citizens.",
  },
];

export const AboutOrdaMUNSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about-ordamun"
      ref={ref}
      className="py-24 bg-charcoal relative overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-burgundy/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gold text-sm font-semibold tracking-widest uppercase">
              About Us
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
              Welcome to <span className="text-gradient-gold">OrdaMUN</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              OrdaMUN brings together ambitious students from across Kazakhstan and
              Central Asia for an immersive diplomatic experience. Our conference
              combines rigorous academic debate with professional development and
              meaningful networking opportunities.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Named after the historical "Orda" – the heart of governance and
              diplomacy in Central Asian tradition – we honor our heritage while
              preparing delegates for the challenges of tomorrow's global stage.
            </p>

          </motion.div>

          {/* Right - Values Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.15 }}
                className="flex gap-5 p-6 rounded-2xl bg-card/50 border border-border hover:border-gold/30 transition-all duration-300"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-burgundy/20 flex items-center justify-center">
                  <value.icon className="w-6 h-6 text-burgundy-light" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
