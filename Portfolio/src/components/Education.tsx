import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, GraduationCap, Award } from "lucide-react";

const Education = () => {
  const education = [
    {
      id: 1,
      degree: "Bachelor of Technology in Artificial Intelligence and Data Science",
      institution: "Sri Shakthi Institute of Engineering and Technology",
      location: "Coimbatore, TN, India",
      period: "2023 - Present",
      scoreLabel: "CGPA",
      scoreValue: "8.2/10.0",
      status: "Present",
    },
    {
      id: 2,
      degree: "Higher Secondary Education",
      institution: "Vivekananda Vidhyalaya Matriculation Higher Secondary School",
      location: "Tiruppur, TN, India",
      period: "2022 - 2023",
      scoreLabel: "Percentage",
      scoreValue: "82%",
      status: "Graduated",
    },
    {
      id: 3,
      degree: "Secondary School Education",
      institution: "Vivekananda Vidhyalaya Matriculation Higher Secondary School",
      location: "Tiruppur, TN, India",
      period: "2020 - 2021",
      scoreLabel: "Result",
      scoreValue: "PASS",
      status: "Graduated",
    },
  ];

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-16 w-80 h-80 border border-primary/5 rounded-full animate-pulse" />
        <div className="absolute bottom-24 left-16 w-64 h-64 bg-accent/5 rotate-45 animate-pulse" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-primary/10 rounded-full animate-bounce" style={{ animationDelay: "1s" }} />
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1200 800">
          <path d="M100,500 Q400,100 700,500 Q1000,100 1100,500" stroke="url(#eduGradient)" strokeWidth="2" fill="none" className="animate-pulse" />
          <path d="M200,300 Q500,600 800,300" stroke="url(#eduGradient)" strokeWidth="1" fill="none" className="animate-pulse" style={{ animationDelay: "1s" }} />
          <defs>
            <linearGradient id="eduGradient">
              <stop offset="0%" stopColor="hsl(217, 92%, 76%)" stopOpacity="0.3" />
              <stop offset="50%" stopColor="hsl(270, 95%, 75%)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="hsl(217, 92%, 76%)" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Section header */}
      <div className="text-center mb-20 slide-in-up relative">
        <h2 className="text-6xl font-bold gradient-text tracking-tight">Education</h2>
        <p className="mt-8 text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light">
          My academic journey and continuous learning in computer science, AI, and technologies shaping my expertise.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {education.map((edu, index) => (
          <Card
            key={edu.id}
            className="flex flex-col justify-between bg-card/10 backdrop-blur-sm border-primary/20 hover:border-primary/40 relative overflow-hidden group hover-lift transition-all duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="p-8 flex flex-col justify-between flex-1 space-y-4">
              {/* Degree & institution */}
              <div>
                <h3 className="text-2xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300 mb-2">
                  {edu.degree}
                </h3>
                <div className="flex items-center space-x-2 mb-1">
                  <GraduationCap size={18} className="text-primary" />
                  <span className="text-lg font-medium text-primary">{edu.institution}</span>
                </div>
              </div>

              {/* Details row */}
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground mt-auto pt-2">
                <div className="flex items-center">
                  <MapPin size={16} className="mr-1 text-accent" />
                  <span className="text-sm">{edu.location}</span>
                </div>
                <div className="flex items-center">
                  <Calendar size={16} className="mr-1 text-accent" />
                  <span className="text-sm">{edu.period}</span>
                </div>
                <div className="flex items-center">
                  <Award size={16} className="mr-1 text-accent" />
                  <span className="text-sm">{edu.scoreLabel}: {edu.scoreValue}</span>
                </div>
                <Badge variant="outline" className="text-xs">{edu.status}</Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Education;
