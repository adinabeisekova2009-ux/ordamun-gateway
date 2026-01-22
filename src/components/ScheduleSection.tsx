import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, Clock, MapPin } from "lucide-react";

const schedule = [
  {
    day: "Day 1",
    date: "March 14, 2025",
    events: [
      { time: "08:00 - 09:00", title: "Registration & Check-in", location: "Main Lobby" },
      { time: "09:00 - 10:00", title: "Opening Ceremony", location: "Grand Hall" },
      { time: "10:30 - 12:30", title: "Committee Session I", location: "Committee Rooms" },
      { time: "12:30 - 14:00", title: "Lunch Break", location: "Dining Hall" },
      { time: "14:00 - 17:00", title: "Committee Session II", location: "Committee Rooms" },
      { time: "18:00 - 20:00", title: "Welcome Reception", location: "Garden Terrace" },
    ],
  },
  {
    day: "Day 2",
    date: "March 15, 2025",
    events: [
      { time: "09:00 - 12:00", title: "Committee Session III", location: "Committee Rooms" },
      { time: "12:00 - 13:30", title: "Lunch Break", location: "Dining Hall" },
      { time: "13:30 - 16:30", title: "Committee Session IV", location: "Committee Rooms" },
      { time: "17:00 - 18:30", title: "Guest Speaker Panel", location: "Grand Hall" },
      { time: "19:00 - 22:00", title: "Delegate Social Night", location: "Ballroom" },
    ],
  },
  {
    day: "Day 3",
    date: "March 16, 2025",
    events: [
      { time: "09:00 - 12:00", title: "Committee Session V (Final)", location: "Committee Rooms" },
      { time: "12:00 - 13:30", title: "Lunch Break", location: "Dining Hall" },
      { time: "14:00 - 15:30", title: "Resolution Voting", location: "Committee Rooms" },
      { time: "16:00 - 18:00", title: "Closing Ceremony & Awards", location: "Grand Hall" },
      { time: "18:30", title: "Farewell & Departure", location: "Main Lobby" },
    ],
  },
];

export const ScheduleSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="schedule"
      ref={ref}
      className="py-24 bg-background"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm font-semibold tracking-widest uppercase">
            Agenda
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
            Conference Schedule
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Three days of intensive debate, learning, and unforgettable experiences
            await you at OrdaMUN 2025.
          </p>
        </motion.div>

        {/* Schedule Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {schedule.map((day, dayIndex) => (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 * dayIndex }}
              className="relative"
            >
              {/* Day Header */}
              <div className="sticky top-24 z-10 bg-background pb-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-xl bg-gradient-burgundy flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-foreground" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-foreground">
                      {day.day}
                    </h3>
                    <p className="text-sm text-gold">{day.date}</p>
                  </div>
                </div>
              </div>

              {/* Events */}
              <div className="space-y-3">
                {day.events.map((event, eventIndex) => (
                  <motion.div
                    key={event.title}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.4,
                      delay: 0.3 + dayIndex * 0.1 + eventIndex * 0.05,
                    }}
                    className="p-4 rounded-xl bg-card border border-border hover:border-gold/20 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-2 text-xs text-gold mb-2">
                      <Clock size={12} />
                      <span>{event.time}</span>
                    </div>
                    <h4 className="font-medium text-foreground mb-1 group-hover:text-gold transition-colors">
                      {event.title}
                    </h4>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin size={12} />
                      <span>{event.location}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
