import { CVData } from '../types/cv';
import { generateTemplate1HTML } from '../templates/template1';
import { generateTemplate2HTML } from '../templates/template2';
import { generateTemplate3HTML } from '../templates/template3';
import { generateTemplate4HTML } from '../templates/template4';

export const sampleCVData: CVData = {
  fullName: "Sarah Johnson",
  jobTitle: "Senior Frontend Developer",
  phone: "+1 (555) 123-4567",
  email: "sarah.johnson@email.com",
  address: "San Francisco, CA, USA",
  profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop",
  about: "Passionate frontend developer with 5+ years of experience creating responsive web applications using React, TypeScript, and modern CSS frameworks. Strong advocate for user experience and accessibility, with a proven track record of delivering high-quality solutions in fast-paced environments.",
  experiences: [
    {
      company: "TechCorp Solutions",
      position: "Senior Frontend Developer",
      period: "2022 - Present",
      location: "San Francisco, CA",
      description: "Lead frontend development for enterprise SaaS platform serving 10,000+ users. Architected reusable component library and improved application performance by 40%."
    },
    {
      company: "InnovateWeb Agency",
      position: "Frontend Developer",
      period: "2020 - 2022",
      location: "Remote",
      description: "Developed responsive websites and web applications for diverse clients. Collaborated with UX designers to implement pixel-perfect designs and ensure optimal user experience."
    },
    {
      company: "StartupXYZ",
      position: "Junior Frontend Developer",
      period: "2019 - 2020",
      location: "San Francisco, CA",
      description: "Built interactive user interfaces using React and Redux. Contributed to the development of a mobile-first e-commerce platform that increased conversion rates by 25%."
    }
  ],
  education: [
    {
      university: "Stanford University",
      degree: "Bachelor of Science in Computer Science",
      period: "2015 - 2019"
    },
    {
      university: "FreeCodeCamp",
      degree: "Frontend Development Certification",
      period: "2018"
    }
  ],
  expertise: [
    "React & Next.js",
    "TypeScript",
    "HTML5 & CSS3",
    "JavaScript (ES6+)",
    "Responsive Design",
    "Git & Version Control",
    "RESTful APIs",
    "Testing (Jest, Cypress)",
    "Webpack & Build Tools",
    "Figma & Design Systems"
  ],
  languages: [
    "English (Native)",
    "Spanish (Conversational)",
    "French (Basic)"
  ],
  references: [
    {
      name: "Michael Chen",
      position: "Lead Developer at TechCorp",
      phone: "+1 (555) 987-6543",
      email: "m.chen@techcorp.com"
    },
    {
      name: "Emily Rodriguez",
      position: "Product Manager at InnovateWeb",
      phone: "+1 (555) 456-7890",
      email: "emily.r@innovateweb.com"
    }
  ],
  includeHobbies: true,
  hobbies: [
    "Photography",
    "Rock Climbing",
    "Open Source Contributing",
    "UI/UX Design"
  ]
};

export const generateTestTemplates = () => {
  const templates = {
    template1: generateTemplate1HTML(sampleCVData),
    template2: generateTemplate2HTML(sampleCVData),
    template3: generateTemplate3HTML(sampleCVData),
    template4: generateTemplate4HTML(sampleCVData)
  };

  return templates;
};