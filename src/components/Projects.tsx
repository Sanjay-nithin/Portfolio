import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import project1 from "@/assets/project1.jpg";
import project2 from "@/assets/project2.jpg";
import project3 from "@/assets/project3.jpg";
import project4 from "@/assets/project4.jpg";

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github: string;
  demo: string;
}

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = (project: Project): void => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setSelectedProject(null);
    setIsModalOpen(false);
  };

  const projects: Project[] = [
    {
      title: "MythSnare",
      description: "Developed an AI-powered tool that detects misinformation by classifying inputs, verifying factual claims, and analyzing news content. Features include real-time fact-checking, automated news data gathering, and interactive explanations to help users identify misleading information.",
      image: project1,
      technologies: ["Python", "Django", "LLM", "RAG", "Machine Learning", "WebScraping", "Natural Language Processing"],
      github: "https://github.com/Sanjay-nithin/Mythsnare.git",
      demo: "#",
    },
    {
      title: "NutriGlow",
      description: "An AI-driven food recommendation and social platform. Users can share recipes, follow others, and get personalized healthy food suggestions based on diet and lifestyle.",
      image: project2,
      technologies: ["React.js", "Node.js", "MongoDB", "Redux", "Tailwind CSS", "LLM"],
      github: "https://github.com/Sanjay-nithin/Nutriglow.git",
      demo: "#",
    },
    {
      title: "HostelFlow",
      description: "A full-stack hostel service booking system for laundry and room cleaning. Users schedule services, while admins and providers manage bookings via dedicated dashboards.",
      image: project3,
      technologies: ["React.js", "Django", "MongoDB", "JWT", "Tailwind CSS"],
      github: "https://github.com/Sanjay-nithin/HostelFlow.git",
      demo: "#",
    },
    {
      title: "Cipher-Chase",
      description: "A web-based game that is conducted in our college event KALAM, based on cryptography concepts through interactive challenges. Players solve coding problems to unlock levels, learning about morse code and decryption in a fun way.",
      image: project4, // or any other image you want to use
      technologies: ["HTML", "CSS", "JavaScript", "Django", "AWS",], // add relevant technologies
      github: "https://github.com/Sanjay-nithin/Cipher-Chase.git", // add a valid GitHub link
      demo: "#", // or a valid demo link
    }
    
  ];

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-64 h-64 border border-primary/5 rounded-full animate-pulse" />
        <div className="absolute bottom-32 right-1/3 w-48 h-48 bg-accent/5 rotate-45 animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/3 right-20 w-4 h-4 bg-primary/20 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
      </div>

      {/* Section header */}
      <div className="text-center mb-20 slide-in-up relative">
        <h2 className="text-6xl font-bold gradient-text tracking-tight">Featured Projects</h2>
        <p className="mt-8 text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light">
          A showcase of my latest work in AI, machine learning, and full-stack development.
          Each project represents a unique challenge and innovative solution.
        </p>
      </div>

      {/* 3-column grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {projects.map((project) => (
          <Card
            key={project.title}
            className="bg-card/10 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-500 relative overflow-hidden group hover-lift flex flex-col"
          >
            {/* Clickable content */}
            <div onClick={() => openModal(project)} className="flex-1 flex flex-col cursor-pointer">
              {/* Image */}
              <div className="relative overflow-hidden rounded-t-2xl group/image">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-60 object-cover transition-transform duration-700 group-hover/image:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover/image:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-3 left-3 w-4 h-4 bg-primary/20 rounded-full animate-pulse" />
                <div className="absolute bottom-3 right-3 w-3 h-3 bg-accent/20 rounded-full animate-bounce" />
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col justify-between relative">
                <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300 mb-3">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs border border-primary/20 hover:bg-primary/20 transition-all duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="absolute top-4 right-4 w-2 h-2 bg-accent/30 rounded-full animate-pulse" />
                <div className="absolute bottom-4 left-4 w-1 h-1 bg-primary/30 rounded-full animate-ping" />
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex space-x-3 px-6 pb-6 mt-auto">
              <Button variant="outline" className="flex-1 group/btn relative overflow-hidden" asChild>
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <Github size={16} className="mr-2" />
                  <span className="relative z-10">Code</span>
                  <div className="absolute inset-0 bg-primary/10 scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left" />
                </a>
              </Button>
              {project.demo && project.demo !== "#" && (
                <Button variant="gradient" className="flex-1" asChild>
                  <a href={project.demo} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={16} className="mr-2" />
                    Demo
                  </a>
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="relative bg-card/90 backdrop-blur-lg rounded-2xl border border-primary/20 shadow-2xl max-w-4xl w-full p-8 animate-modal-pop">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-muted-foreground hover:text-primary transition-colors duration-300 text-xl font-semibold"
            >
              ✕
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Details */}
              <div>
                <h3 className="text-3xl font-bold text-foreground mb-4">{selectedProject.title}</h3>
                <p className="text-base text-muted-foreground mb-4 leading-relaxed">{selectedProject.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedProject.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs border border-primary/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-3 mt-4">
                  <Button variant="outline" asChild>
                    <a href={selectedProject.github} target="_blank" rel="noopener noreferrer">
                      <Github size={16} className="mr-2" />
                      Code
                    </a>
                  </Button>
                  <Button variant="gradient" asChild>
                    <a href={selectedProject.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={16} className="mr-2" />
                      Demo
                    </a>
                  </Button>
                </div>
              </div>

              {/* Image */}
              <div className="flex items-center justify-center">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full max-h-96 object-contain rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
