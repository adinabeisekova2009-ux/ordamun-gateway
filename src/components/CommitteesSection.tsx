import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Users, AlertCircle, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const committees = [
  {
    name: "UN Security Council",
    abbreviation: "UNSC",
    topic: "Addressing Emerging Threats to International Peace and Security",
    difficulty: "Advanced",
    seats: 15,
    seatsLeft: 5,
    description:
      "The most powerful UN body, responsible for maintaining international peace and security.",
  },
  {
    name: "UN General Assembly",
    abbreviation: "UNGA",
    topic: "Sustainable Development Goals: Progress and Challenges",
    difficulty: "Beginner",
    seats: 40,
    seatsLeft: 18,
    description:
      "The main deliberative body where all UN member states have equal representation.",
  },
  {
    name: "UN Human Rights Council",
    abbreviation: "UNHRC",
    topic: "Protecting Human Rights in the Digital Age",
    difficulty: "Intermediate",
    seats: 25,
    seatsLeft: 10,
    description:
      "Responsible for strengthening the promotion and protection of human rights around the globe.",
  },
  {
    name: "Economic and Social Council",
    abbreviation: "ECOSOC",
    topic: "Global Economic Recovery Post-Pandemic",
    difficulty: "Intermediate",
    seats: 30,
    seatsLeft: 14,
    description:
      "Coordinates the economic and social work of the UN and its specialized agencies.",
  },
  {
    name: "Historical Crisis Committee",
    abbreviation: "HCC",
    topic: "The Cuban Missile Crisis (1962)",
    difficulty: "Advanced",
    seats: 20,
    seatsLeft: 7,
    description:
      "A dynamic committee where delegates navigate historical events with unexpected twists.",
  },
  {
    name: "International Court of Justice",
    abbreviation: "ICJ",
    topic: "Territorial Disputes and Maritime Boundaries",
    difficulty: "Advanced",
    seats: 12,
    seatsLeft: 4,
    description:
      "The principal judicial organ of the UN, settling legal disputes between states.",
  },
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Beginner":
      return "bg-green-500/20 text-green-400 border-green-500/30";
    case "Intermediate":
      return "bg-gold/20 text-gold border-gold/30";
    case "Advanced":
      return "bg-burgundy/20 text-burgundy-light border-burgundy/30";
    default:
      return "bg-muted text-muted-foreground";
  }
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
                    <Badge
                      className={`mb-3 ${getDifficultyColor(committee.difficulty)}`}
                    >
                      {committee.difficulty}
                    </Badge>
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

                {/* Seats Info */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users size={16} />
                    <span>{committee.seats} seats</span>
                  </div>
                  <div
                    className={`flex items-center gap-1.5 text-sm ${
                      committee.seatsLeft <= 5
                        ? "text-burgundy-light"
                        : "text-green-400"
                    }`}
                  >
                    {committee.seatsLeft <= 5 ? (
                      <AlertCircle size={14} />
                    ) : (
                      <CheckCircle size={14} />
                    )}
                    <span>
                      {committee.seatsLeft} left
                    </span>
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
