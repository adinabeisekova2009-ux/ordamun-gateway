import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckCircle, Upload, CreditCard, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const committees = [
  { value: "unsc", label: "UN Security Council (UNSC)" },
  { value: "unga", label: "UN General Assembly (UNGA)" },
  { value: "unhrc", label: "UN Human Rights Council (UNHRC)" },
  { value: "ecosoc", label: "Economic and Social Council (ECOSOC)" },
  { value: "hcc", label: "Historical Crisis Committee (HCC)" },
  { value: "icj", label: "International Court of Justice (ICJ)" },
];

const experienceLevels = [
  { value: "none", label: "No prior experience" },
  { value: "1-2", label: "1-2 conferences" },
  { value: "3-5", label: "3-5 conferences" },
  { value: "5+", label: "5+ conferences" },
];

export const RegistrationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    school: "",
    city: "",
    experience: "",
    committee: "",
    role: "delegate",
    paymentProof: null as File | null,
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFormData((prev) => ({ ...prev, paymentProof: e.target.files![0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Registration Submitted!",
      description: "Thank you for registering. We'll contact you shortly with confirmation.",
    });
    // Reset form
    setStep(1);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      school: "",
      city: "",
      experience: "",
      committee: "",
      role: "delegate",
      paymentProof: null,
    });
  };

  const canProceedStep1 =
    formData.fullName && formData.email && formData.phone && formData.school && formData.city;
  const canProceedStep2 = formData.experience && formData.committee;

  return (
    <section
      id="register"
      ref={ref}
      className="py-24 bg-gradient-to-b from-background via-charcoal to-background relative overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-burgundy/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-gold/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="text-gold text-sm font-semibold tracking-widest uppercase">
            Join Us
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
            Register for OrdaMUN 2025
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Complete your registration in three simple steps and secure your place
            at Central Asia's premier Model United Nations conference.
          </p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center gap-4 mb-12"
        >
          {[
            { num: 1, label: "Personal Info", icon: User },
            { num: 2, label: "Committee", icon: CheckCircle },
            { num: 3, label: "Payment", icon: CreditCard },
          ].map((s, index) => (
            <div
              key={s.num}
              className={`flex items-center ${
                index < 2 ? "flex-1 max-w-[200px]" : ""
              }`}
            >
              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                  step >= s.num
                    ? "bg-gold/20 text-gold"
                    : "bg-muted/30 text-muted-foreground"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    step > s.num
                      ? "bg-gold text-background"
                      : step === s.num
                      ? "bg-gold/20 text-gold border border-gold"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step > s.num ? <CheckCircle size={14} /> : s.num}
                </div>
                <span className="text-sm font-medium hidden sm:block">
                  {s.label}
                </span>
              </div>
              {index < 2 && (
                <div
                  className={`flex-1 h-px mx-2 ${
                    step > s.num ? "bg-gold" : "bg-border"
                  }`}
                />
              )}
            </div>
          ))}
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-2xl mx-auto"
        >
          <form onSubmit={handleSubmit}>
            <div className="p-8 rounded-2xl bg-card border border-border">
              {/* Step 1: Personal Info */}
              {step === 1 && (
                <div className="space-y-6">
                  <h3 className="font-display text-2xl font-semibold text-foreground mb-6">
                    Personal Information
                  </h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) =>
                          handleInputChange("fullName", e.target.value)
                        }
                        placeholder="John Doe"
                        className="bg-muted/30 border-border focus:border-gold"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        placeholder="john@example.com"
                        className="bg-muted/30 border-border focus:border-gold"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        placeholder="+7 (777) 123-4567"
                        className="bg-muted/30 border-border focus:border-gold"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City / Country *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) =>
                          handleInputChange("city", e.target.value)
                        }
                        placeholder="Almaty, Kazakhstan"
                        className="bg-muted/30 border-border focus:border-gold"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="school">School / University *</Label>
                    <Input
                      id="school"
                      value={formData.school}
                      onChange={(e) =>
                        handleInputChange("school", e.target.value)
                      }
                      placeholder="Nazarbayev University"
                      className="bg-muted/30 border-border focus:border-gold"
                    />
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button
                      type="button"
                      variant="gold"
                      onClick={() => setStep(2)}
                      disabled={!canProceedStep1}
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: Committee Selection */}
              {step === 2 && (
                <div className="space-y-6">
                  <h3 className="font-display text-2xl font-semibold text-foreground mb-6">
                    Committee Selection
                  </h3>

                  <div className="space-y-2">
                    <Label>MUN Experience *</Label>
                    <Select
                      value={formData.experience}
                      onValueChange={(value) =>
                        handleInputChange("experience", value)
                      }
                    >
                      <SelectTrigger className="bg-muted/30 border-border">
                        <SelectValue placeholder="Select your experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        {experienceLevels.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            {level.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Preferred Committee *</Label>
                    <Select
                      value={formData.committee}
                      onValueChange={(value) =>
                        handleInputChange("committee", value)
                      }
                    >
                      <SelectTrigger className="bg-muted/30 border-border">
                        <SelectValue placeholder="Select a committee" />
                      </SelectTrigger>
                      <SelectContent>
                        {committees.map((committee) => (
                          <SelectItem key={committee.value} value={committee.value}>
                            {committee.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>


                  <div className="flex justify-between pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(1)}
                    >
                      Back
                    </Button>
                    <Button
                      type="button"
                      variant="gold"
                      onClick={() => setStep(3)}
                      disabled={!canProceedStep2}
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Payment */}
              {step === 3 && (
                <div className="space-y-6">
                  <h3 className="font-display text-2xl font-semibold text-foreground mb-6">
                    Payment
                  </h3>

                  <div className="p-6 rounded-xl bg-muted/30 border border-border">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-muted-foreground">
                        Registration Fee
                      </span>
                      <span className="text-2xl font-display font-bold text-gold">
                        2000 ₸
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Includes: Conference materials, meals, certificate of
                      participation, and social events.
                    </p>

                    <div className="p-4 rounded-lg bg-burgundy/10 border border-burgundy/20">
                      <h4 className="font-medium text-foreground mb-2">
                        Payment Details
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Bank: Kaspi Bank
                        <br />
                        Account: 4400 4302 2812 1395
                        <br />
                        Name: Adina. B
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Upload Payment Proof</Label>
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={handleFileChange}
                        className="hidden"
                        id="paymentProof"
                      />
                      <label
                        htmlFor="paymentProof"
                        className="flex items-center justify-center gap-3 p-6 rounded-xl border-2 border-dashed border-border hover:border-gold/50 cursor-pointer transition-colors bg-muted/20"
                      >
                        <Upload className="w-5 h-5 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {formData.paymentProof
                            ? formData.paymentProof.name
                            : "Click to upload screenshot or PDF"}
                        </span>
                      </label>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Or paste a link to your payment confirmation
                    </p>
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(2)}
                    >
                      Back
                    </Button>
                    <Button type="submit" variant="gold">
                      Complete Registration
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};
