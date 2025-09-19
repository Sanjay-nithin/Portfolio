import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Building, ExternalLink, Info, OrigamiIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"; // ✅ animations
import Aws from "@/assets/Aws Certificate.jpg";
import dsa from "@/assets/DSA certificate.jpg";
import python from "@/assets/Python.jpg";
import YASSC from "@/assets/YAASC.jpg"; 
import datascience from "@/assets/Data Science Certificate.jpg";

const Certifications = () => {
  const [selectedCert, setSelectedCert] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const certifications = [
    {
      id: 1,
      name: "Data Science",
      organization: "Atom Systems Pvt.Ltd-Atom Training Labs.",
      issueDate: "June 2025",
      image: datascience,
      description:
        "Joined as a Intern Trainee and learned about data analysis concepts, data exploration, machine learning, and data visualization techniques using Python and its libraries.",
      skills: ["Data Analysis", "Data Exploration", "Machine Learning", "Data Visualization"],
      verificationUrl:
        "https://drive.google.com/file/d/1agMFTDV0VVpbmSxlzT-tqSp44ke1aWJt/view",
      category: "internship",
    },
    {
      id: 2,
      name: "AWS Internship",
      organization: "Career Ladder",
      issueDate: "March 2025",
      image: Aws,
      description:
        "Joined as a Intern Trainee and learned about AWS Cloud concepts, services, and terminology and real time web deployment.",
      skills: ["Cloud Computing", "AWS Services", "Docker", "DevOps"],
      verificationUrl:
        "https://drive.google.com/file/d/1W7V7wCfU6wNbG0uN0IVpL8n5khdJsTSU/view",
      category: "internship",
    },
    {
      id: 3,
      name: "Master the Data Structures and Algorithms",
      organization: "Udemy",
      issueDate: "December 2024",
      image: dsa,
      description:
        "Learned and practised the fundamentals of data structures and algorithms, using JavaScript.",
      skills: ["JavaScript", "DSA", "Problem Solving"],
      verificationUrl:
        "https://www.udemy.com/certificate/UC-fb3c3926-9e25-43a7-9f3a-02ba8db35876/",
      category: "course",
    },
    {
      id: 4,
      name: "100 Days Of Code: The Complete Python Pro Bootcamp",
      organization: "Udemy",
      issueDate: "August 2025",
      image: python,
      description:
        "Learned and practised the fundamentals of Python and its applications in several domains along with version control",
      skills: ["Python", "Webscraping", "Github", "Python Libraries and frameworks"],
      verificationUrl:
        "https://www.udemy.com/certificate/UC-fe6edd48-8b2b-4e60-9812-6e46de9c8d7b",
      category: "course",
    },
    {
      id:5,
      name: "YASSC: Youth Astronomy and Space Science Congress",
      organization: "Tamil Nadu Astronomy and Science Society",
      issueDate: "August 2025",
      image: YASSC,
      description:
        "Participated in the Youth Astronomy and Space Science Congress, a event to present our research paper on presenting a conceptual model of a unified theory of everything in cosmology.",
      skills: ["Research", "Public Speaking", "Cosmology", "Unified Theory"],
      verificationUrl: 
      "https://drive.google.com/file/d/1ReJsgCBORstPU3VcfS-l5mbzHDidd1Ov/view?usp=sharing",
      category: "eca",

    }
  ];

  const categories = [
    { key: "all", label: "All" },
    { key: "internship", label: "Internships" },
    { key: "course", label: "Courses" },
    { key: "eca", label: "Extra Curricular Events" },
    { key: "publications", label: "Research and Publication" },
  ];

  const openModal = (cert) => {
    setSelectedCert(cert);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCert(null);
    setIsModalOpen(false);
  };

  const filteredCerts =
    selectedCategory === "all"
      ? certifications
      : certifications.filter((cert) => cert.category === selectedCategory);

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto relative overflow-hidden">
      {/* Category Navbar */}
      <div className="text-center mb-20 slide-in-up relative">
        <h2 className="text-6xl font-bold gradient-text tracking-tight">
          Achievements & Recognitions
        </h2>
        <p className="mt-8 text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light">
          Through certifications, I showcase my ability to stay updated and excel
          in evolving technologies.
        </p>
      </div>

      {/* Category Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setSelectedCategory(cat.key)}
            className={`px-5 py-2 rounded-full border transition-all duration-300 
              ${
                selectedCategory === cat.key
                  ? "bg-primary text-gray border-primary"
                  : "bg-transparent border-primary/30 text-primary hover:bg-primary/10"
              }
              sm:px-6 sm:py-3
              md:px-8 md:py-4 md:text-base`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid Layout with animation */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence>
          {filteredCerts.map((cert) => (
            <motion.div
              key={cert.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Card
                className="relative bg-card/10 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-500 overflow-hidden rounded-2xl shadow-lg"
              >
                {/* Image */}
                <div className="relative overflow-hidden rounded-t-2xl">
                  <img
                    src={cert.image}
                    alt={cert.name}
                    className="w-full h-72 object-cover object-top rounded-lg shadow-md"
                  />
                </div>

                {/* Info */}
                <div className="p-5">
                  <h3 className="text-lg font-semibold">{cert.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {cert.organization}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {cert.skills.map((skill, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <button
                    onClick={() => openModal(cert)}
                    className="inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors duration-300"
                  >
                    <Info size={16} className="mr-1" /> View Details
                  </button>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Modal with animation */}
      <AnimatePresence>
        {isModalOpen && selectedCert && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-card/90 backdrop-blur-lg rounded-2xl border border-primary/20 shadow-2xl max-w-4xl w-full p-8"
              initial={{ y: "-20%", opacity: 0, scale: 0.8 }}
              animate={{ y: "0%", opacity: 1, scale: 1 }}
              exit={{ y: "-20%", opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, type: "spring" }}
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-muted-foreground hover:text-primary transition-colors duration-300 text-xl font-semibold"
              >
                ✕
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-3xl font-bold mb-4">
                    {selectedCert.name}
                  </h3>
                  <div className="flex items-center mb-3 text-muted-foreground">
                    <Building size={18} className="mr-2 text-primary" />
                    <span>{selectedCert.organization}</span>
                  </div>
                  <p className="text-base mb-4">{selectedCert.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedCert.skills.map((skill, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <Calendar size={16} className="mr-2 text-primary" />
                    Issued: {selectedCert.issueDate}
                  </div>
                  <a
                    href={selectedCert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary hover:text-primary/80 transition-colors duration-300"
                  >
                    <ExternalLink size={16} className="mr-2" /> Verify Certificate
                  </a>
                </div>
                <div className="flex items-center justify-center">
                  <img
                    src={selectedCert.image}
                    alt={selectedCert.name}
                    className="w-full max-h-96 object-contain rounded-xl shadow-lg"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certifications;
