// Simple test script to generate PDF templates
// Run with: node test-templates.js

const fs = require('fs');
const path = require('path');

// Sample CV Data
const sampleCVData = {
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

// Template 1 - Sidebar
function generateTemplate1HTML(cvData) {
  const profileImage = cvData.profileImage 
    ? `<img src="${cvData.profileImage}" style="width:80px;height:80px;border-radius:50%;object-fit:cover;display:block;margin:0 auto 16px;"/>` 
    : '';

  return `
    <!doctype html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        @page { 
          size: A4; 
          margin: 15mm; 
          -webkit-print-color-adjust: exact; 
          color-adjust: exact; 
        }
        @media print {
          body { margin: 0; }
          .page-break { page-break-before: always; }
        }
        body { 
          font-family: Arial, sans-serif; 
          margin: 0; 
          padding: 0; 
          color: #333;
          font-size: 11px;
          line-height: 1.3;
        }
        .page { 
          display: flex; 
          min-height: 257mm; /* A4 height minus margins */
          max-height: 257mm;
          page-break-after: always;
        }
        .sidebar { 
          width: 35%; 
          background: #374151; 
          padding: 15px; 
          color: #fff;
          box-sizing: border-box;
        }
        .main { 
          width: 65%; 
          padding: 15px; 
          box-sizing: border-box;
          overflow: hidden;
        }
        .section-title { font-weight:bold; font-size:14px; margin:16px 0 8px 0; }
        .underline { height:1px; background:#fff; margin-bottom:12px; }
        .contact-item { margin-bottom:8px; }
        .contact-label { font-size:10px; color:#d1d5db; }
        .contact-value { font-size:11px; color:#fff; }
        .name { font-size:28px; font-weight:bold; margin-bottom:4px; }
        .job-title { font-size:14px; color:#6b7280; margin-bottom:16px; }
        .about { font-size:11px; line-height:1.5; margin-bottom:16px; }
        .exp-item { margin-bottom:12px; }
        .exp-position { font-weight:bold; font-size:12px; }
        .exp-period { font-size:10px; color:#666; }
        .exp-company { font-size:10px; color:#666; }
        .exp-desc { font-size:10px; margin-top:4px; line-height:1.4; }
        .list-item { font-size:11px; margin-bottom:4px; }
      </style>
    </head>
    <body>
      <div class="page">
        <div class="sidebar">
          ${profileImage}
          
          <div class="section-title">Contact</div>
          <div class="underline"></div>
          <div class="contact-item">
            <div class="contact-label">Phone</div>
            <div class="contact-value">${cvData.phone || 'N/A'}</div>
          </div>
          <div class="contact-item">
            <div class="contact-label">Email</div>
            <div class="contact-value">${cvData.email || 'N/A'}</div>
          </div>
          <div class="contact-item">
            <div class="contact-label">Address</div>
            <div class="contact-value">${cvData.address || 'N/A'}</div>
          </div>

          ${cvData.education.length > 0 ? `
            <div class="section-title">Education</div>
            <div class="underline"></div>
            ${cvData.education.map(edu => `
              <div style="margin-bottom:12px;">
                <div style="font-size:10px;color:#d1d5db">${edu.period}</div>
                <div style="font-weight:bold;font-size:11px">${edu.degree}</div>
                <div style="font-size:10px;color:#d1d5db">${edu.university}</div>
              </div>
            `).join('')}
          ` : ''}

          ${cvData.expertise.length > 0 ? `
            <div class="section-title">Expertise</div>
            <div class="underline"></div>
            ${cvData.expertise.map(skill => `<div class="list-item">• ${skill}</div>`).join('')}
          ` : ''}

          ${cvData.languages.length > 0 ? `
            <div class="section-title">Languages</div>
            <div class="underline"></div>
            ${cvData.languages.map(lang => `<div class="list-item">${lang}</div>`).join('')}
          ` : ''}
        </div>

        <div class="main">
          <div class="name">${cvData.fullName || 'Your Name'}</div>
          <div class="job-title">${cvData.jobTitle || 'Your Job Title'}</div>
          <div style="height:1px;background:#e5e7eb;margin-bottom:16px"></div>

          ${cvData.about ? `<div class="about">${cvData.about}</div>` : ''}

          ${cvData.experiences.length > 0 ? `
            <div style="font-weight:bold;font-size:16px;margin:16px 0 12px 0">Experience</div>
            ${cvData.experiences.map(exp => `
              <div class="exp-item">
                <div class="exp-position">${exp.position}</div>
                <div class="exp-period">${exp.period}</div>
                <div class="exp-company">${exp.company}${exp.location ? ' | ' + exp.location : ''}</div>
                ${exp.description ? `<div class="exp-desc">${exp.description}</div>` : ''}
              </div>
            `).join('')}
          ` : ''}

          ${cvData.references.some(ref => ref.name) ? `
            <div style="font-weight:bold;font-size:16px;margin:16px 0 12px 0">References</div>
            <div style="display:flex;flex-wrap:wrap;gap:16px;">
              ${cvData.references.filter(ref => ref.name).map(ref => `
                <div style="flex:1;min-width:200px;">
                  <div style="font-weight:bold;font-size:11px">${ref.name}</div>
                  <div style="font-size:10px;color:#666">${ref.position}</div>
                  <div style="font-size:10px;color:#666">Phone: ${ref.phone}</div>
                  <div style="font-size:10px;color:#666">Email: ${ref.email}</div>
                </div>
              `).join('')}
            </div>
          ` : ''}
        </div>
      </div>
    </body>
    </html>
  `;
}

// Template 2 - Modern
function generateTemplate2HTML(cvData) {
  const profileImage = cvData.profileImage ? `<img src="${cvData.profileImage}" class="profile-img"/>` : '';

  return `
    <!doctype html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        @page { size: A4; margin: 20mm; }
        body { font-family: Arial, sans-serif; margin:0; padding:0; color:#333; line-height:1.4; }
        .header { text-align:center; border-bottom:2px solid #3b82f6; padding-bottom:20px; margin-bottom:24px; }
        .profile-img { width:100px; height:100px; border-radius:50%; object-fit:cover; margin:0 auto 16px; display:block; }
        .name { font-size:32px; font-weight:bold; margin-bottom:8px; color:#1f2937; }
        .job-title { font-size:18px; color:#3b82f6; margin-bottom:12px; }
        .contact-row { display:flex; justify-content:center; gap:20px; flex-wrap:wrap; font-size:12px; color:#6b7280; }
        .section { margin-bottom:24px; }
        .section-title { font-size:18px; font-weight:bold; color:#1f2937; border-bottom:1px solid #e5e7eb; padding-bottom:6px; margin-bottom:12px; }
        .about-text { font-size:12px; text-align:justify; }
        .exp-item, .edu-item { margin-bottom:16px; }
        .exp-header { display:flex; justify-content:space-between; align-items:baseline; margin-bottom:4px; }
        .exp-position { font-weight:bold; font-size:14px; }
        .exp-period { font-size:12px; color:#6b7280; }
        .exp-company { font-size:12px; color:#6b7280; margin-bottom:6px; }
        .exp-desc { font-size:11px; }
        .skills-grid { display:flex; flex-wrap:wrap; gap:8px; }
        .skill-tag { background:#f3f4f6; padding:4px 8px; border-radius:4px; font-size:11px; }
        .refs-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
        .ref-item { font-size:11px; }
        .ref-name { font-weight:bold; margin-bottom:2px; }
      </style>
    </head>
    <body>
      <div class="header">
        ${profileImage}
        <div class="name">${cvData.fullName || 'Your Name'}</div>
        <div class="job-title">${cvData.jobTitle || 'Your Job Title'}</div>
        <div class="contact-row">
          <span>${cvData.phone || 'Phone'}</span>
          <span>${cvData.email || 'Email'}</span>
          <span>${cvData.address || 'Address'}</span>
        </div>
      </div>

      ${cvData.about ? `
        <div class="section">
          <div class="section-title">About</div>
          <div class="about-text">${cvData.about}</div>
        </div>
      ` : ''}

      ${cvData.experiences.length > 0 ? `
        <div class="section">
          <div class="section-title">Professional Experience</div>
          ${cvData.experiences.map(exp => `
            <div class="exp-item">
              <div class="exp-header">
                <div class="exp-position">${exp.position}</div>
                <div class="exp-period">${exp.period}</div>
              </div>
              <div class="exp-company">${exp.company}${exp.location ? ' | ' + exp.location : ''}</div>
              ${exp.description ? `<div class="exp-desc">${exp.description}</div>` : ''}
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${cvData.education.length > 0 ? `
        <div class="section">
          <div class="section-title">Education</div>
          ${cvData.education.map(edu => `
            <div class="edu-item">
              <div style="display:flex;justify-content:space-between;align-items:baseline;">
                <div style="font-weight:bold;font-size:14px;">${edu.degree}</div>
                <div style="font-size:12px;color:#6b7280;">${edu.period}</div>
              </div>
              <div style="font-size:12px;color:#6b7280;">${edu.university}</div>
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${cvData.expertise.length > 0 || cvData.languages.length > 0 ? `
        <div class="section">
          <div class="section-title">Skills & Languages</div>
          ${cvData.expertise.length > 0 ? `
            <div style="margin-bottom:12px;">
              <div style="font-weight:bold;margin-bottom:6px;">Technical Skills</div>
              <div class="skills-grid">
                ${cvData.expertise.map(skill => `<div class="skill-tag">${skill}</div>`).join('')}
              </div>
            </div>
          ` : ''}
          ${cvData.languages.length > 0 ? `
            <div>
              <div style="font-weight:bold;margin-bottom:6px;">Languages</div>
              <div class="skills-grid">
                ${cvData.languages.map(lang => `<div class="skill-tag">${lang}</div>`).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      ` : ''}

      ${cvData.references.some(ref => ref.name) ? `
        <div class="section">
          <div class="section-title">References</div>
          <div class="refs-grid">
            ${cvData.references.filter(ref => ref.name).map(ref => `
              <div class="ref-item">
                <div class="ref-name">${ref.name}</div>
                <div>${ref.position}</div>
                <div>Phone: ${ref.phone}</div>
                <div>Email: ${ref.email}</div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}
    </body>
    </html>
  `;
}

// Template 3 - Professional
function generateTemplate3HTML(cvData) {
  return `
    <!doctype html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        @page { size: A4; margin: 0; }
        body { font-family: Arial, sans-serif; margin:0; padding:0; color:#1a1a1a; }
        .cv-container { background:#fff; }
        .header { border-bottom:1px solid #e5e5e5; padding:48px 32px 32px 32px; text-align:center; }
        .name { font-size:36px; font-weight:700; letter-spacing:2px; margin-bottom:8px; color:#1a1a1a; }
        .job-title { font-size:18px; color:#737373; margin-bottom:24px; letter-spacing:1px; }
        .contact-container { display:flex; justify-content:center; align-items:center; flex-wrap:wrap; }
        .contact-text { font-size:14px; color:#737373; margin:0 4px; }
        .content { padding:40px 32px; }
        .section { margin-bottom:32px; }
        .section-title { font-size:20px; font-weight:600; margin-bottom:8px; color:#1a1a1a; letter-spacing:0.5px; }
        .section-underline { height:2px; background:#0066cc; width:100%; margin-bottom:16px; }
        .body-text { font-size:14px; line-height:22px; color:#1a1a1a; }
        .job-container { margin-bottom:16px; }
        .job-title-text { font-size:16px; font-weight:600; color:#1a1a1a; margin-bottom:4px; }
        .job-date { font-size:14px; color:#737373; margin-bottom:12px; }
        .bullet-list { margin-top:8px; }
        .bullet-item { font-size:14px; line-height:22px; color:#1a1a1a; margin-bottom:8px; }
        .two-column-section { display:flex; justify-content:space-between; margin-bottom:32px; gap:32px; }
        .column { flex:1; }
      </style>
    </head>
    <body>
      <div class="cv-container">
        <div class="header">
          <div class="name">${cvData.fullName || 'YOUR NAME'}</div>
          <div class="job-title">${cvData.jobTitle || 'Your Job Title'}</div>
          <div class="contact-container">
            <span class="contact-text">${cvData.phone || 'Phone'}</span>
            <span class="contact-text"> | </span>
            <span class="contact-text">${cvData.email || 'Email'}</span>
            <span class="contact-text"> | </span>
            <span class="contact-text">${cvData.address || 'Address'}</span>
          </div>
        </div>

        <div class="content">
          ${cvData.about ? `
            <div class="section">
              <div class="section-title">PROFILE</div>
              <div class="section-underline"></div>
              <div class="body-text">${cvData.about}</div>
            </div>
          ` : ''}

          ${cvData.experiences.length > 0 ? `
            <div class="section">
              <div class="section-title">WORK EXPERIENCE</div>
              <div class="section-underline"></div>
              ${cvData.experiences.map(exp => `
                <div class="job-container">
                  <div class="job-title-text">${exp.company || 'Company Name'}</div>
                  <div class="job-date">${exp.period || 'Date Range'}</div>
                  <div class="bullet-list">
                    <div class="bullet-item">• Position: ${exp.position || 'Position Title'}</div>
                    ${exp.location ? `<div class="bullet-item">• Location: ${exp.location}</div>` : ''}
                    ${exp.description ? `<div class="bullet-item">• ${exp.description}</div>` : ''}
                  </div>
                </div>
              `).join('')}
            </div>
          ` : ''}

          <div class="two-column-section">
            ${cvData.education.length > 0 ? `
              <div class="column">
                <div class="section-title">EDUCATION</div>
                <div class="section-underline"></div>
                ${cvData.education.map(edu => `
                  <div class="job-title-text">${edu.university || 'University'}</div>
                  <div class="job-date">${edu.period || 'Year'}</div>
                  <div class="body-text">${edu.degree || 'Degree'}</div>
                `).join('')}
              </div>
            ` : `
              <div class="column">
                <div class="section-title">EDUCATION</div>
                <div class="section-underline"></div>
                <div class="job-title-text">University</div>
                <div class="job-date">Year</div>
                <div class="body-text">Degree</div>
              </div>
            `}

            <div class="column">
              <div class="section-title">SKILLS</div>
              <div class="section-underline"></div>
              <div class="bullet-list">
                ${cvData.expertise.length > 0 ? 
                  cvData.expertise.map(skill => `<div class="bullet-item">• ${skill}</div>`).join('') :
                  '<div class="bullet-item">• Add your skills</div>'
                }
                ${cvData.languages.length > 0 ? 
                  cvData.languages.map(lang => `<div class="bullet-item">• ${lang}</div>`).join('') : ''
                }
              </div>
            </div>
          </div>

          ${cvData.references.some(ref => ref.name) ? `
            <div class="section">
              <div class="section-title">REFERENCES</div>
              <div class="section-underline"></div>
              <div class="bullet-list">
                ${cvData.references.filter(ref => ref.name).map(ref => `
                  <div class="bullet-item">• ${ref.name} - ${ref.position}</div>
                  <div class="bullet-item">  Phone: ${ref.phone} | Email: ${ref.email}</div>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    </body>
    </html>
  `;
}

// Template 4 - Timeline
function generateTemplate4HTML(cvData) {
  const profileImg = cvData.profileImage 
    ? `<img src="${cvData.profileImage}" class="avatar"/>`
    : '';

  return `
    <!doctype html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        @page { size: A4; margin: 0; }
        body { 
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
          margin: 0; 
          padding: 0; 
          background: #FAFAFA; 
          color: #34495E;
          line-height: 1.5;
        }
        .container {
          min-height: 297mm;
          background: #FAFAFA;
        }
        
        /* Header Section */
        .header {
          background: #F5F5F5;
          padding: 24px;
          text-align: center;
          margin-bottom: 16px;
        }
        .avatar-container {
          margin-bottom: 16px;
        }
        .avatar {
          width: 96px;
          height: 96px;
          border-radius: 50%;
          border: 4px solid #E0E0E0;
          object-fit: cover;
          display: block;
          margin: 0 auto;
        }
        .name {
          font-size: 32px;
          font-weight: bold;
          color: #2C3E50;
          margin-bottom: 4px;
          letter-spacing: 1px;
        }
        .job-title {
          font-size: 18px;
          color: #7F8C8D;
          margin-bottom: 16px;
          font-weight: 500;
        }
        .contact-info {
          text-align: center;
        }
        .contact-text {
          font-size: 14px;
          color: #34495E;
          margin: 4px 0;
          display: block;
        }
        
        /* Section Styles */
        .section {
          background: #FFFFFF;
          padding: 24px;
          margin-bottom: 16px;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .section-title {
          font-size: 22px;
          font-weight: bold;
          color: #2C3E50;
          text-align: center;
          margin-bottom: 20px;
          letter-spacing: 2px;
          text-transform: uppercase;
        }
        .about-text {
          font-size: 15px;
          color: #34495E;
          line-height: 24px;
          text-align: center;
        }
        
        /* Timeline Styles */
        .timeline-item {
          display: flex;
          margin-bottom: 24px;
          position: relative;
        }
        .timeline-period {
          font-size: 14px;
          font-weight: 600;
          color: #7F8C8D;
          width: 100px;
          text-align: right;
          padding-right: 16px;
          flex-shrink: 0;
        }
        .timeline-content {
          flex: 1;
          position: relative;
          padding-left: 20px;
        }
        .timeline-dot {
          position: absolute;
          left: -7px;
          top: 4px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #3498DB;
        }
        .timeline-line {
          position: absolute;
          left: -1px;
          top: 16px;
          width: 2px;
          height: calc(100% + 8px);
          background: #E0E0E0;
        }
        .timeline-title {
          font-size: 15px;
          font-weight: bold;
          color: #34495E;
          margin-bottom: 8px;
          text-transform: uppercase;
        }
        .timeline-description {
          font-size: 14px;
          color: #7F8C8D;
          line-height: 21px;
        }
        
        /* Skills Grid */
        .skills-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }
        .skill-item {
          background: #EDF2F7;
          padding: 10px 16px;
          border-radius: 8px;
          width: calc(50% - 6px);
        }
        .skill-text {
          font-size: 14px;
          font-weight: 500;
          color: #34495E;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <!-- Header Section -->
        <div class="header">
          <div class="avatar-container">
            ${profileImg}
          </div>
          
          <div class="header-info">
            <div class="name">${cvData.fullName || 'Your Name'}</div>
            <div class="job-title">${cvData.jobTitle || 'Your Job Title'}</div>
            
            <div class="contact-info">
              <span class="contact-text">📱 ${cvData.phone || 'Your Phone Number'}</span>
              <span class="contact-text">✉️ ${cvData.email || 'your.email@example.com'}</span>
              <span class="contact-text">📍 ${cvData.address || 'Your Address'}</span>
            </div>
          </div>
        </div>

        ${cvData.about ? `
          <!-- About Me Section -->
          <div class="section">
            <div class="section-title">About Me</div>
            <div class="about-text">${cvData.about}</div>
          </div>
        ` : ''}

        ${cvData.education.length > 0 ? `
          <!-- Education Section -->
          <div class="section">
            <div class="section-title">Education</div>
            
            ${cvData.education.map((edu, index) => `
              <div class="timeline-item">
                <div class="timeline-period">${edu.period || 'Year'}</div>
                <div class="timeline-content">
                  <div class="timeline-dot"></div>
                  ${index < cvData.education.length - 1 ? '<div class="timeline-line"></div>' : ''}
                  <div>
                    <div class="timeline-title">
                      ${edu.university || 'University'} | ${edu.degree || 'Degree'}
                    </div>
                    <div class="timeline-description">
                      Completed ${edu.degree || 'degree program'} at ${edu.university || 'university'} with focus on academic excellence and practical application of knowledge.
                    </div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        ` : ''}

        ${cvData.experiences.length > 0 ? `
          <!-- Work Experience Section -->
          <div class="section">
            <div class="section-title">Work Experience</div>
            
            ${cvData.experiences.map((exp, index) => `
              <div class="timeline-item">
                <div class="timeline-period">${exp.period || 'Period'}</div>
                <div class="timeline-content">
                  <div class="timeline-dot"></div>
                  ${index < cvData.experiences.length - 1 ? '<div class="timeline-line"></div>' : ''}
                  <div>
                    <div class="timeline-title">
                      ${exp.company || 'Company'} | ${exp.position || 'Position'}
                    </div>
                    <div class="timeline-description">
                      ${exp.description || `Worked as ${exp.position || 'professional'} at ${exp.company || 'company'}${exp.location ? ' in ' + exp.location : ''}, contributing to various projects and organizational goals.`}
                    </div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        ` : ''}

        ${(cvData.expertise.length > 0 || cvData.languages.length > 0) ? `
          <!-- Skills Section -->
          <div class="section">
            <div class="section-title">Skills</div>
            <div class="skills-grid">
              ${cvData.expertise.length > 0 ? 
                cvData.expertise.map(skill => `
                  <div class="skill-item">
                    <div class="skill-text">• ${skill}</div>
                  </div>
                `).join('') : 
                `<div class="skill-item"><div class="skill-text">• Add your skills</div></div>`
              }
              ${cvData.languages.length > 0 ? 
                cvData.languages.map(lang => `
                  <div class="skill-item">
                    <div class="skill-text">• ${lang}</div>
                  </div>
                `).join('') : ''
              }
            </div>
          </div>
        ` : ''}

        ${cvData.references.some(ref => ref.name) ? `
          <!-- References Section -->
          <div class="section">
            <div class="section-title">References</div>
            ${cvData.references.filter(ref => ref.name).map(ref => `
              <div class="timeline-item">
                <div class="timeline-content">
                  <div class="timeline-title">${ref.name} - ${ref.position}</div>
                  <div class="timeline-description">
                    Phone: ${ref.phone} | Email: ${ref.email}
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>
    </body>
    </html>
  `;
}

// Generate all templates
function generateAllTemplates() {
  const templates = {
    template1: generateTemplate1HTML(sampleCVData),
    template2: generateTemplate2HTML(sampleCVData),
    template3: generateTemplate3HTML(sampleCVData),
    template4: generateTemplate4HTML(sampleCVData)
  };

  return templates;
}

// Create test outputs directory
function createTestDirectory() {
  const testDir = path.join(__dirname, 'template-tests');
  if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir);
  }
  return testDir;
}

// Main test function
function runTemplateTests() {
  console.log('🧪 Starting CV Template Tests...\n');
  
  try {
    // Create test directory
    const testDir = createTestDirectory();
    console.log(`📁 Created test directory: ${testDir}\n`);

    // Generate all templates
    const templates = generateAllTemplates();
    
    // Save HTML files
    const templateNames = {
      template1: 'Template_1_Sidebar',
      template2: 'Template_2_Modern',
      template3: 'Template_3_Professional', 
      template4: 'Template_4_Timeline'
    };

    Object.keys(templates).forEach((templateKey) => {
      const templateName = templateNames[templateKey];
      const fileName = `${templateName}_Test.html`;
      const filePath = path.join(testDir, fileName);
      
      fs.writeFileSync(filePath, templates[templateKey], 'utf8');
      console.log(`✅ Generated: ${fileName}`);
    });

    console.log('\n🎉 All templates generated successfully!');
    console.log(`📍 Location: ${testDir}`);
    console.log('\n📋 What was generated:');
    console.log('   • Template_1_Sidebar_Test.html - Dark sidebar layout');
    console.log('   • Template_2_Modern_Test.html - Modern centered layout');
    console.log('   • Template_3_Professional_Test.html - Clean professional layout');
    console.log('   • Template_4_Timeline_Test.html - Timeline design layout');
    console.log('\n💡 Open these HTML files in your browser to see the templates!');
    console.log('   You can also print them to PDF using your browser\'s print function.');
    
  } catch (error) {
    console.error('❌ Error generating templates:', error.message);
  }
}

// Run the tests
runTemplateTests();