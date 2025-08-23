import { Card } from "@/components/ui/card";
import { Brain, Code, Database, Server, ArrowDown, Wrench, ChartNoAxesCombined, Cloudy } from "lucide-react";

const About = () => {
  const data = [
    {
      title: "Programming Languages",
      skills: [
        { name: "Python", level: 98 },
        { name: "C", level: 89 },
        { name: "Java", level: 70 },
        { name: "JavaScript", level: 70 },
        { name: "SQL", level: 87 }
      ]
    },
    {
      title: "AI & Agents",
      skills: [
        { name: "LLM", level: 85 },
        { name: "RAG", level: 80 },
        { name: "Transformers", level: 75 },
        { name: "n8n", level: 80 },
        { name: "Langchain", level: 75 },
      ],
    },
    {
      title: "Machine Learning and Deep Learning",
      skills: [
        { name: "Scikit-Learn", level: 90 },
        { name: "Pytorch", level: 89 },
        { name: "TensorFlow", level: 90 },
        { name: "Computer Vision", level: 90 },
        { name: "Natural Language Processing", level: 92 }
      ]
    },
    {
      title: "Full Stack Development",
      skills: [
        { name: "React", level: 90 },
        { name: "Node.js", level: 85 },
        { name: "JavaScript", level: 88 },
        { name: "Django", level: 80 },
        { name: "Express.js", level: 78 },
        { name: "Redux", level: 79 }
      ],
    },
    {
      title: "Data Analysis and Exploration",
      skills: [
        { name: "Pandas", level: 88 },
        { name: "NumPy", level: 85 },
        { name: "Matplotlib", level: 80 },
        { name: "Seaborn", level: 90 },
        { name: "PowerBI", level: 79 },
      ],
    },
    {
      title: "Cloud Computing and DevOps",
      skills: [
        { name: "AWS", level: 80 },
        { name: "Docker", level: 78 },
        { name: "Netlify", level: 75 },
        { name: "Render", level: 72 },
        { name: "Linux", level: 80 },
        { name: "Nginx", level: 70 },
      ],
    },
    {
      title: "Database",
      skills: [
        { name: "Postgresql", level: 89 },
        { name: "MySql", level: 89 },
        { name: "MongoDB", level: 92 },
        { name: "Sqlite", level: 90 }
      ]
    },
    {
      title: "Tools & Technologies",
      skills: [
        { name: "Git", level: 90 },
        { name: "GitHub", level: 85 },
        { name: "VS Code", level: 95 },
        { name: "Jupyter Notebook", level: 90 },
      ]
    }
  ];

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-20 w-40 h-0 border border-primary/10 rounded-full animate-pulse" />
        <div className="absolute bottom-20 left-10 w-32 h-32 bg-accent/5 rotate-45 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/4 w-6 h-6 bg-primary/20 rounded-full animate-bounce" style={{ animationDelay: '2s' }} />
      </div>

      {/* About header */}
      <div className="text-center mb-10 slide-in-up relative">
        <div className="relative inline-block">
          <h2 className="text-6xl font-bold gradient-text tracking-tight">About Me</h2>
          <div className="absolute -top-4 -right-8 w-4 h-4 bg-accent/40 rounded-full animate-ping" />
          <div className="absolute -bottom-3 -left-6 w-2 h-2 bg-primary/40 rounded-full animate-pulse" />
        </div>
        <div className="mt-8 relative">
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-dark">
            Passionate about pushing the boundaries of technology through AI and innovative solutions. 
            Currently studying and building the future of intelligent applications.
          </p>
          <div className="absolute -top-4 left-1/3 w-1 h-1 bg-accent/50 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
        </div>
      </div>

      {/* Journey + Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center mb-24">
        <div className="lg:col-span-7 slide-in-left relative">
          <div className="relative">
            <h3 className="text-4xl font-dark mb-8 text-foreground">My Journey</h3>
            <div className="absolute -top-2 -left-4 w-12 h-px bg-gradient-to-r from-primary to-transparent" />
          </div>

          <div className="space-y-6 relative">
            <p className="text-lg text-muted-foreground leading-relaxed font-dark">
              As a dedicated student in the field of <strong>Artificial Intelligence and Data Science</strong>,
              I'm constantly exploring new technologies and methodologies to solve real-world problems.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed font-dark">
              My expertise spans from developing sophisticated machine learning models to creating
              intuitive user interfaces, always with a focus on performance, scalability, and user experience.
            </p>

            {/* Floating traits */}
            <div className="flex flex-wrap gap-4 pt-6">
              {["Innovation", "Problem Solving", "Continuous Learning", "Team Collaboration"].map((trait) => (
                <div key={trait} className="relative group">
                  <span className="px-6 py-3 bg-primary/10 text-primary rounded-full text-sm font-dark border border-primary/20 hover:bg-primary/20 transition-all duration-300 block">
                    {trait}
                  </span>
                  <div className="absolute inset-0 bg-primary/20 rounded-full scale-0 group-hover:scale-110 transition-transform duration-300 -z-10" />
                </div>
              ))}
            </div>

            <div className="absolute -right-8 top-1/2 w-32 h-px bg-gradient-to-r from-accent/50 to-transparent" />
          </div>
        </div>

        <div className="lg:col-span-5 slide-in-right">
          <Card className="p-8 bg-card/20 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-500 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <h3 className="text-3xl font-dark mb-8 text-center gradient-text">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-8">
                {[
                  { number: "5", label: "Projects Completed", color: "text-primary" },
                  { number: "20+", label: "Technologies Mastered", color: "text-accent" },
                  { number: "2+", label: "Years Experience", color: "text-primary" },
                  { number: "∞", label: "Learning Mindset", color: "text-accent" }
                ].map((stat) => (
                  <div key={stat.label} className="text-center relative group/stat">
                    <div className={`text-4xl font-dark mb-2 ${stat.color} group-hover/stat:scale-110 transition-transform duration-300`}>
                      {stat.number}
                    </div>
                    <div className="text-sm text-muted-foreground font-dark">{stat.label}</div>
                    <div className="absolute inset-0 bg-primary/10 rounded-lg scale-0 group-hover/stat:scale-100 transition-transform duration-300 -z-10" />
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute top-4 right-4 w-2 h-2 bg-accent/30 rounded-full animate-pulse" />
            <div className="absolute bottom-6 left-6 w-1 h-1 bg-primary/30 rounded-full animate-ping" />
          </Card>
      
          <div className="absolute -top-6 -left-6 w-12 h-12 border border-accent/20 rounded-full animate-bounce" style={{ animationDuration: '3s' }} />
          <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-primary/10 rounded-full animate-pulse" />
        </div>
      </div>
      {/* Center Arrow */}
      <div className="relative flex justify-center my-16">
        <div className="animate-bounce">
          <span>Scroll</span>
          <ArrowDown size={32} className="text-primary/70" />
        </div>
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-px h-16 bg-gradient-to-b from-primary/50 to-transparent" />
      </div>

      {/* Core Skills Section */}
      <div className="relative mt-24">
        <h3 className="text-5xl font-dark text-center mb-16 gradient-text">Skills</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.map((category, idx) => {
            const icons = [Code, Brain, Brain, Server, ChartNoAxesCombined, Cloudy, Database, Wrench];
            const IconComponent = icons[idx] || Server;
            return (
              <div
                key={category.title}
                className="p-6 bg-card/10 backdrop-blur-sm rounded-xl border border-primary/20 hover:border-primary/40 transition-all duration-500 space-y-4 slide-in-up relative overflow-hidden group"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full text-primary/80 group-hover:scale-110 transform transition-transform duration-500">
                    <IconComponent size={32} />
                  </div>
                </div>

                <h4 className="text-xl md:text-2xl font-dark gradient-text text-center mb-2">{category.title}</h4>

                <div className="space-y-3">
                  {category.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-dark text-foreground">{skill.name}</span>
                        <span className="text-sm font-dark text-primary">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-primary/10 rounded-full h-2 relative overflow-hidden">
                        <div
                          className="absolute left-0 top-0 h-full bg-gradient-to-r from-primary via-accent to-primary rounded-full animate-pulse"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="w-1/2 h-px bg-gradient-to-r from-primary/40 to-transparent mt-4 mx-auto" />
                <div className="absolute top-2 right-2 w-2 h-2 bg-accent/30 rounded-full animate-ping" />
                <div className="absolute bottom-2 left-2 w-1 h-1 bg-primary/30 rounded-full animate-pulse" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;
