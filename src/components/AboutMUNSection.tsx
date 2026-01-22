import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Globe, Users, Award, Mic } from "lucide-react";

const features = [
  {
    icon: Globe,
    title: "Global Perspective",
    description:
      "Gain insights into international relations, diplomacy, and how nations collaborate to solve global challenges.",
  },
  {
    icon: Users,
    title: "Networking",
    description:
      "Connect with like-minded students, future leaders, and professionals from around the world.",
  },
  {
    icon: Mic,
    title: "Public Speaking",
    description:
      "Develop confidence in articulating your ideas, debating complex issues, and persuading others.",
  },
  {
    icon: Award,
    title: "Leadership Skills",
    description:
      "Build essential skills in negotiation, critical thinking, and collaborative problem-solving.",
  },
];

export const AboutMUNSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about-mun"
      ref={ref}
      className="py-24 bg-gradient-to-b from-background to-charcoal"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm font-semibold tracking-widest uppercase">
            Discover
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
            What is Model United Nations?
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
            Model United Nations (MUN) is an educational simulation where students
            step into the shoes of diplomats, representing countries and debating
            real-world issues in mock United Nations committees. It's where future
            leaders are forged.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="group"
            >
              <div className="relative p-8 rounded-2xl bg-card border border-border hover:border-gold/30 transition-all duration-500 h-full">
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors">
                  <feature.icon className="w-7 h-7 text-gold" />
                </div>

                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                {/* Decorative line */}
                <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <blockquote className="text-xl md:text-2xl font-display italic text-muted-foreground max-w-2xl mx-auto">
            "The United Nations was not created to take mankind to heaven, but to
            save humanity from hell."
          </blockquote>
          <cite className="block mt-4 text-gold font-medium">
            — Dag Hammarskjöld, Former UN Secretary-General
          </cite>
        </motion.div>
      </div>
    </section>
  );
};
