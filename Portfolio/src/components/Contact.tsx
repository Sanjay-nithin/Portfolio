import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import emailjs from '@emailjs/browser';
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Replace these with your actual EmailJS credentials
      const serviceId = "service_tmhxhpk";
      const templateId = "template_xu6ic45";
      const publicKey = "Lfq320LXI6t0wDwDt";
      
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email, // user's email
        message: formData.message + " " + formData.email, // message content
        to_email: 'sanjaynithin220@gmail.com', // your email
        reply_to: formData.email, // add this
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "Failed to send message",
        description: "Please try again later or contact me directly via email.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      details: "sanjaynithin220@gmail.com",
      description: "Send me an email anytime!"
    },
    {
      icon: Phone,
      title: "Phone",
      details: "+91 8438827645",
      description: "Let's have a conversation"
    },
    {
      icon: MapPin,
      title: "Location",
      details: "Tiruppur, Tamil Nadu, India",
      description: "Available for remote work"
    }
  ];

  return (
    <section className="py-32 px-6 max-w-7xl mx-auto relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-16 right-16 w-56 h-56 border border-primary/5 rounded-full animate-pulse" />
        <div className="absolute bottom-24 left-16 w-40 h-40 bg-accent/5 rotate-45 animate-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/3 left-1/3 w-8 h-8 bg-primary/10 rounded-full animate-bounce" style={{ animationDelay: '2s' }} />
        
        {/* Flowing connection lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1200 800">
          <path 
            d="M200,600 Q600,200 1000,600" 
            stroke="url(#contactGradient)" 
            strokeWidth="2" 
            fill="none" 
            className="animate-pulse"
          />
          <defs>
            <linearGradient id="contactGradient">
              <stop offset="0%" stopColor="hsl(217, 92%, 76%)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="hsl(270, 95%, 75%)" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="text-center mb-20 slide-in-up relative">
        <div className="relative inline-block">
          <h2 className="text-6xl font-bold gradient-text tracking-tight">Let's Connect</h2>
          <div className="absolute -top-6 -right-12 w-6 h-6 bg-accent/30 rounded-full animate-ping" />
          <div className="absolute -bottom-4 -left-8 w-3 h-3 bg-primary/30 rounded-full animate-pulse" />
        </div>
        <div className="mt-8 relative">
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light">
            Ready to discuss your next project or just want to say hello? 
            I'd love to hear from you and explore how we can work together.
          </p>
          <div className="absolute -top-2 left-1/4 w-1 h-1 bg-accent/50 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
        </div>
      </div>

      {/* Organic flowing layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Contact Information - Flowing left side */}
        <div className="lg:col-span-7 slide-in-left relative">
          <div className="relative mb-12">
            <h3 className="text-4xl font-light mb-8 text-foreground">Get in Touch</h3>
            <div className="absolute -top-2 -left-4 w-16 h-px bg-gradient-to-r from-primary to-transparent" />
            <p className="text-lg text-muted-foreground leading-relaxed font-light">
              Whether you have a project in mind, want to collaborate, or just want to chat about 
              technology and innovation, I'm always open to new opportunities and connections.
            </p>
          </div>

          {/* Floating contact cards */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <div key={info.title} className={`slide-in-up relative group`} style={{ animationDelay: `${index * 0.15}s` }}>
                <Card className="p-6 bg-card/10 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="flex items-start space-x-6 relative z-10">
                    <div className="flex-shrink-0 relative">
                      <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/20 rounded-full group-hover:scale-110 transition-transform duration-300">
                        <info.icon size={24} className="text-primary" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-4 h-4 bg-accent/30 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="text-xl font-light text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                        {info.title}
                      </h4>
                      <p className="text-primary font-medium mb-2 text-lg">{info.details}</p>
                      <p className="text-sm text-muted-foreground font-light">{info.description}</p>
                    </div>
                  </div>
                  
                  {/* Card decorations */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-accent/30 rounded-full animate-pulse" />
                  <div className="absolute bottom-4 left-4 w-1 h-1 bg-primary/30 rounded-full animate-ping" />
                </Card>
                
                {/* External floating elements */}
                {index % 2 === 0 && (
                  <div className="absolute -top-3 -left-3 w-8 h-8 border border-primary/20 rounded-full animate-bounce" style={{ animationDuration: '4s' }} />
                )}
                <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-accent/20 rounded-full animate-pulse" style={{ animationDelay: `${index * 0.5}s` }} />
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form - Floating right side */}
        <div className="lg:col-span-5 slide-in-right">
          <div className="relative">
            <Card className="p-8 bg-card/10 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-50" />
              
              <div className="relative z-10">
                <div className="relative mb-8">
                  <h3 className="text-3xl font-light gradient-text">Send a Message</h3>
                  <div className="absolute -bottom-2 left-0 w-20 h-px bg-gradient-to-r from-primary to-transparent" />
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="relative group">
                    <label htmlFor="name" className="block text-sm font-light text-foreground mb-3">
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="bg-background/30 border-primary/20 focus:border-primary/60 hover:border-primary/40 transition-all duration-300 backdrop-blur-sm"
                      required
                    />
                    <div className="absolute -top-1 -left-1 w-2 h-2 bg-primary/20 rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  <div className="relative group">
                    <label htmlFor="email" className="block text-sm font-light text-foreground mb-3">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      className="bg-background/30 border-primary/20 focus:border-primary/60 hover:border-primary/40 transition-all duration-300 backdrop-blur-sm"
                      required
                    />
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-accent/20 rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  <div className="relative group">
                    <label htmlFor="message" className="block text-sm font-light text-foreground mb-3">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project or just say hello!"
                      rows={6}
                      className="bg-background/30 border-primary/20 focus:border-primary/60 hover:border-primary/40 transition-all duration-300 resize-none backdrop-blur-sm"
                      required
                    />
                    <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-primary/20 rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  <div className="relative">
                    <Button 
                      type="submit" 
                      variant="gradient" 
                      size="lg" 
                      className="w-full hover-lift transform hover:rotate-1 transition-transform duration-300"
                      disabled={isLoading}
                    >
                      <Send size={20} className="mr-2" />
                      {isLoading ? 'Sending...' : 'Send Message'}
                    </Button>
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-accent/40 rounded-full animate-bounce opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </form>
              </div>
              
              {/* Floating form decorations */}
              <div className="absolute top-6 right-6 w-3 h-3 bg-accent/30 rounded-full animate-pulse" />
              <div className="absolute bottom-8 left-8 w-2 h-2 bg-primary/30 rounded-full animate-ping" />
            </Card>
            
            {/* External floating elements around form */}
            <div className="absolute -top-8 -left-8 w-16 h-16 border border-accent/20 rounded-full animate-bounce" style={{ animationDuration: '5s' }} />
            <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-primary/10 rounded-full animate-pulse" />
            <div className="absolute top-1/2 -right-4 w-6 h-6 bg-accent/10 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;