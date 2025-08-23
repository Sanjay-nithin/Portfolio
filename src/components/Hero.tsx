import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail } from "lucide-react";
import heroBackground from "@/assets/hero-bg.jpg";
import resume from "@/assets/Sanjay Nithin Resume.pdf";
import ShinyText from "@/components/ui/shinytext";
import TextType from "@/components/ui/texttype"; 
import profile from "@/assets/profile.jpg";
import LeetcodeIcon from "@/components/ui/reacticon"; // Assuming you have a LeetcodeIcon component

interface HeroProps {
  onNavigate: (section: string) => void;
}

const Hero: FC<HeroProps> = ({ onNavigate }) => {
  return (
      <section className="min-h-screen relative flex items-center justify-center overflow-hidden px-6 md:px-12 md:pt-24">
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${heroBackground})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/90" />
      </div>

      {/* Floating shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 border border-primary/20 rotate-45 animate-pulse" />
        <div
          className="absolute top-40 right-20 w-24 h-24 border border-accent/30 rounded-full animate-bounce"
          style={{ animationDuration: "3s" }}
        />
        <div
          className="absolute bottom-32 left-1/4 w-16 h-16 bg-primary/10 rotate-12 animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div className="absolute top-1/3 right-1/3 w-20 h-20 border-2 border-accent/20 rotate-45" />

        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800">
          <path
            d="M0,400 Q300,200 600,400 T1200,400"
            stroke="url(#gradient1)"
            strokeWidth="2"
            fill="none"
            className="animate-pulse"
          />
          <path
            d="M0,300 Q400,100 800,300 T1200,300"
            stroke="url(#gradient2)"
            strokeWidth="1"
            fill="none"
            opacity="0.5"
          />
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(217, 92%, 76%)" stopOpacity={0} />
              <stop offset="50%" stopColor="hsl(217, 92%, 76%)" stopOpacity={0.5} />
              <stop offset="100%" stopColor="hsl(270, 95%, 75%)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(270, 95%, 75%)" stopOpacity={0} />
              <stop offset="50%" stopColor="hsl(270, 95%, 75%)" stopOpacity={0.3} />
              <stop offset="100%" stopColor="hsl(217, 92%, 76%)" stopOpacity={0} />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Main content */}
<div className="relative z-10 flex flex-col items-center text-center 
            md:flex-row md:text-left md:items-start md:justify-between 
            lg:flex-row lg:items-center lg:space-x-16 max-w-7xl w-full mx-auto">

  {/* Profile Image + Links */}
  <div className="order-1 md:order-2 w-full md:w-1/2 flex flex-col items-center mb-12 md:mb-0">
    {/* Capsule Image */}
    <div className="w-56 h-36 sm:w-72 sm:h-44 md:w-80 md:h-52 lg:w-[30rem] lg:h-[18rem] rounded-[9999px] overflow-hidden border-4 border-primary/30 shadow-lg">
      <img
        src={profile}
        alt="Profile"
        className="w-full h-full object-cover"
      />
    </div>

    {/* Social Links */}
    <div className="flex space-x-6 sm:space-x-9 mt-6 bg-background/70 px-4 sm:px-6 py-6 sm:py-9 rounded-xl shadow-lg backdrop-blur-md">
      {[
        { icon: Github, link: "https://github.com/Sanjay-nithin" },
        { icon: Linkedin, link: "http://www.linkedin.com/in/sanjay-nithin-s-0522bb326" },
        { icon: LeetcodeIcon, link: "https://leetcode.com/u/ads_230126/" },
        { icon: Mail, link: "mailto:sanjaynithin220@gmail.com" }

      ].map(({ icon: Icon, link }, idx) => (
        <a
          key={idx}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground/60 hover:text-primary transition-transform duration-500 hover:scale-125"
        >
          <Icon size={28} />
        </a>
      ))}
    </div>
  </div>

  {/* Text content */}
  <div className="order-2 md:order-1 w-full md:w-1/2 space-y-6">
    <ShinyText
      text="Hii, I'm Sanjay Nithin"
      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-2"
      disabled={false} 
      speed={3} 
    />
    <br />
    <TextType
      text={["AI Developer", "Full Stack Developer", "Passionate Learner"]}
      as="h2"
      className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-secondary tracking-tight"
      typingSpeed={60}
      initialDelay={500}
      pauseDuration={1500}
      deletingSpeed={30}
      loop
      showCursor
      cursorCharacter="_"
      cursorClassName="text-primary"
    />

    <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed font-light max-w-lg mx-auto md:mx-0">
    AI & Data Science student passionate about data analytics, machine learning, and full-stack development—building intelligent solutions from the ground up.
    </p>

    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-4 justify-center md:justify-start">
      <Button
        variant="hero"
        size="lg"
        className="w-auto self-center sm:self-start hover-lift transform hover:-rotate-1 transition-transform duration-300"
        onClick={() => onNavigate('projects')}
      >
        Explore My Work
      </Button>
      <a href={resume} download className="self-center sm:self-start">
        <Button
          variant="outline"
          size="lg"
          className="w-auto hover-lift transform hover:-rotate-1 transition-transform duration-300"
        >
          Download Resume
        </Button>
      </a>
    </div>
  </div>
</div>

    </section>
  );
};

export default Hero;
