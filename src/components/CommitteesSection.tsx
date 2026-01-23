import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Globe, Monitor, Languages } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const committees = [
  {
    name: "UN Security Council",
    abbreviation: "UNSC",
    topic: "Addressing Emerging Threats to International Peace and Security",
    format: "Offline",
    languages: ["English"],
    description:
      "The most powerful UN body, responsible for maintaining international peace and security.",
  },
  {
    name: "UN General Assembly",
    abbreviation: "UNGA",
    topic: "Sustainable Development Goals: Progress and Challenges",
    format: "Offline",
    languages: ["Kazakh", "Russian"],
    description:
      "The main deliberative body where all UN member states have equal representation.",
  },
  {
    name: "UN Human Rights Council",
    abbreviation: "UNHRC",
    topic: "Protecting Human Rights in the Digital Age",
    format: "Online",
    languages: ["Russian", "English"],
    description:
      "Responsible for strengthening the promotion and protection of human rights around the globe.",
  },
  {
    name: "Economic and Social Council",
    abbreviation: "ECOSOC",
    topic: "Global Economic Recovery Post-Pandemic",
    format: "Offline",
    languages: ["Russian"],
    description:
      "Coordinates the economic and social work of the UN and its specialized agencies.",
  },
  {
    name: "Historical Crisis Committee",
    abbreviation: "HCC",
    topic: "The Cuban Missile Crisis (1962)",
    format: "Online",
    languages: ["English"],
    description:
      "A dynamic committee where delegates navigate historical events with unexpected twists.",
  },
  {
    name: "International Court of Justice",
    abbreviation: "ICJ",
    topic: "Territorial Disputes and Maritime Boundaries",
    format: "Offline",
    languages: ["Kazakh", "Russian", "English"],
    description:
      "The principal judicial organ of the UN, settling legal disputes between states.",
  },
];

const getFormatStyle = (format: string) => {
  return format === "Online"
    ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
    : "bg-green-500/20 text-green-400 border-green-500/30";
};

export const CommitteesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="committees"
      ref={ref}
      className="py-24 bg-gradient-to-b from-charcoal to-background"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm font-semibold tracking-widest uppercase">
            Committees
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
            Choose Your Committee
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Select from our diverse range of committees, each offering unique
            challenges and learning opportunities tailored to different experience
            levels.
          </p>
        </motion.div>

        {/* Committees Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {committees.map((committee, index) => (
            <motion.div
              key={committee.abbreviation}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="group"
            >
              <div className="relative p-6 rounded-2xl bg-card border border-border hover:border-gold/30 transition-all duration-500 h-full flex flex-col">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className={getFormatStyle(committee.format)}>
                        {committee.format === "Online" ? (
                          <Monitor size={12} className="mr-1" />
                        ) : (
                          <Globe size={12} className="mr-1" />
                        )}
                        {committee.format}
                      </Badge>
                    </div>
                    <h3 className="font-display text-xl font-semibold text-foreground">
                      {committee.name}
                    </h3>
                    <span className="text-sm text-gold font-medium">
                      {committee.abbreviation}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-sm mb-4 flex-grow">
                  {committee.description}
                </p>

                {/* Topic */}
                <div className="p-3 rounded-lg bg-muted/30 mb-4">
                  <span className="text-xs text-muted-foreground uppercase tracking-wide">
                    Topic
                  </span>
                  <p className="text-sm text-foreground mt-1">{committee.topic}</p>
                </div>

                {/* Languages */}
                <div className="flex items-center gap-2 pt-4 border-t border-border">
                  <Languages size={16} className="text-muted-foreground" />
                  <div className="flex flex-wrap gap-1.5">
                    {committee.languages.map((lang) => (
                      <span
                        key={lang}
                        className="px-2 py-0.5 text-xs rounded-full bg-gold/10 text-gold border border-gold/20"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
