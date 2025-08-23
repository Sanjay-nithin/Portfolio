import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Building, ExternalLink } from "lucide-react";

const Experience = () => {
  const experiences = [
    {
      id: 1,
      title: "Senior AI Developer",
      company: "TechCorp Solutions",
      location: "San Francisco, CA",
      period: "2023 - Present",
      type: "Full-time",
      description: "Leading AI model development and deployment for enterprise clients. Built and optimized machine learning pipelines using TensorFlow and PyTorch, resulting in 40% improved model accuracy.",
      achievements: [
        "Developed and deployed 15+ ML models in production",
        "Led a team of 5 developers on AI projects",
        "Reduced model inference time by 60% through optimization",
        "Implemented MLOps best practices and CI/CD pipelines"
      ],
      technologies: ["Python", "TensorFlow", "PyTorch", "AWS", "Docker", "Kubernetes"],
      companyUrl: "#"
    },
    {
      id: 2,
      title: "Full Stack Developer",
      company: "StartupX",
      location: "Remote",
      period: "2022 - 2023",
      type: "Contract",
      description: "Built scalable web applications using React and Node.js. Collaborated with cross-functional teams to deliver high-quality software solutions for startup clients.",
      achievements: [
        "Developed 8+ responsive web applications",
        "Improved application performance by 45%",
        "Integrated third-party APIs and payment systems",
        "Mentored junior developers and conducted code reviews"
      ],
      technologies: ["React", "Node.js", "TypeScript", "MongoDB", "Express.js", "AWS"],
      companyUrl: "#"
    },
    {
      id: 3,
      title: "AI Research Intern",
      company: "University Research Lab",
      location: "Stanford, CA",
      period: "2021 - 2022",
      type: "Internship",
      description: "Conducted research on deep learning algorithms and natural language processing. Published research papers and presented findings at international conferences.",
      achievements: [
        "Published 2 research papers in top-tier conferences",
        "Developed novel NLP algorithms for sentiment analysis",
        "Collaborated with PhD students on cutting-edge research",
        "Presented research at 3 international conferences"
      ],
      technologies: ["Python", "PyTorch", "Jupyter", "NLTK", "Scikit-learn", "Git"],
      companyUrl: "#"
    }
  ];

  return (
    <section className="py-32 px-6 max-w-7xl mx-auto relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-16 left-16 w-72 h-72 border border-primary/5 rounded-full animate-pulse" />
        <div className="absolute bottom-20 right-20 w-56 h-56 bg-accent/5 rotate-12 animate-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-primary/10 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
        
        {/* Flowing connection lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1200 800">
          <path 
            d="M50,200 Q300,50 600,200 Q900,350 1150,200" 
            stroke="url(#expGradient)" 
            strokeWidth="3" 
            fill="none" 
            className="animate-pulse"
          />
          <defs>
            <linearGradient id="expGradient">
              <stop offset="0%" stopColor="hsl(217, 92%, 76%)" stopOpacity="0.4" />
              <stop offset="50%" stopColor="hsl(270, 95%, 75%)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="hsl(217, 92%, 76%)" stopOpacity="0.4" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="text-center mb-20 slide-in-up relative">
        <div className="relative inline-block">
          <h2 className="text-6xl font-bold gradient-text tracking-tight">Experience</h2>
          <div className="absolute -top-8 -right-20 w-10 h-10 bg-accent/30 rounded-full animate-ping" />
          <div className="absolute -bottom-8 -left-16 w-6 h-6 bg-primary/30 rounded-full animate-pulse" />
        </div>
        <div className="mt-8 relative">
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light">
            My professional journey in AI development, full-stack engineering, and research, 
            building innovative solutions and driving technological advancement.
          </p>
          <div className="absolute -top-2 left-1/3 w-3 h-3 bg-accent/50 rounded-full animate-ping" style={{ animationDelay: '2s' }} />
        </div>
      </div>

      <div className="space-y-12">
        {experiences.map((exp, index) => (
          <div key={exp.id} className={`slide-in-up relative`} style={{ animationDelay: `${index * 0.2}s` }}>
            <Card className="bg-card/10 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-500 relative overflow-hidden group hover-lift">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="p-8 relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                          {exp.title}
                        </h3>
                        <div className="flex items-center mb-2">
                          <Building size={18} className="mr-2 text-primary" />
                          <a 
                            href={exp.companyUrl}
                            className="text-xl font-medium text-primary hover:text-primary/80 transition-colors duration-300 hover:underline"
                          >
                            {exp.company}
                          </a>
                          <ExternalLink size={14} className="ml-2 text-primary/60" />
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                          <div className="flex items-center">
                            <MapPin size={16} className="mr-2 text-accent" />
                            <span>{exp.location}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar size={16} className="mr-2 text-accent" />
                            <span>{exp.period}</span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {exp.type}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <p className="text-muted-foreground leading-relaxed mb-6 font-light">
                      {exp.description}
                    </p>

                    {/* Achievements */}
                    <div className="mb-6">
                      <h4 className="text-lg font-medium text-foreground mb-3">Key Achievements</h4>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, achIndex) => (
                          <li key={achIndex} className="flex items-start">
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                            <span className="text-muted-foreground font-light">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h4 className="text-lg font-medium text-foreground mb-3">Technologies Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, techIndex) => (
                          <Badge key={techIndex} variant="secondary" className="text-xs hover:bg-primary/20 transition-colors duration-300">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card decorations */}
              <div className="absolute top-6 right-6 w-4 h-4 bg-accent/30 rounded-full animate-pulse" />
              <div className="absolute bottom-6 left-6 w-3 h-3 bg-primary/30 rounded-full animate-ping" />
              
              {/* Timeline connector */}
              {index < experiences.length - 1 && (
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-px h-12 bg-gradient-to-b from-primary/40 to-transparent" />
              )}
            </Card>

            {/* External floating elements */}
            {index % 2 === 0 && (
              <div className="absolute -top-6 -left-6 w-12 h-12 border border-primary/20 rounded-full animate-bounce" style={{ animationDuration: '4s' }} />
            )}
            <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-accent/20 rounded-full animate-pulse" style={{ animationDelay: `${index * 0.8}s` }} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;