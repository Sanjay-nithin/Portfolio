import { useState } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Loading from "@/components/Loading";
import MouseTracker from "@/components/MouseTracker";
import Chatbot from "@/components/Chatbot";
import { Toaster } from "@/components/ui/toaster";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("home"); // default: hero

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Map section names to components
  const renderSection = () => {
    switch (activeSection) {
      case "home":
        return <Hero onNavigate={setActiveSection} />;
      case "about":
        return <About />;
      case "education":
        return <Education />;
      case "projects":
        return <Projects />;
      case "certifications":
        return <Certifications />;
      case "contact":
        return <Contact />;
      default:
        return <Hero onNavigate={setActiveSection} />;
    }
  };

  return (
    <>
      {isLoading && <Loading onComplete={handleLoadingComplete} />}
      <MouseTracker />
      <div className="min-h-screen">
        <Navigation onNavigate={setActiveSection} activeSection={activeSection} />
        
        {/* Render only the active component */}
        {renderSection()}

        <Chatbot />
      </div>
      <Toaster />
    </>
  );
};

export default Index;
