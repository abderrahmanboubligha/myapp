import { CVData } from '../types/cv';

export const generateTemplate2HTML = (cvData: CVData): string => {
  const profileImage = cvData.profileImage ? `<img src="${cvData.profileImage}" class="profile-img"/>` : '';

  return `
    <!doctype html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        @page { 
          size: A4; 
          margin: 0; 
          -webkit-print-color-adjust: exact; 
          color-adjust: exact; 
        }
        @media print {
          body { margin: 0; }
        }
        body { 
          font-family: 'Calibri', 'Arial', sans-serif; 
          margin: 0; 
          padding: 0; 
          color: #333; 
          line-height: 1.5;
          font-size: 11px;
          background: white;
        }
        .cv-container {
          min-height: 297mm;
          max-width: 210mm;
          margin: 0 auto;
          background: white;
          position: relative;
        }
        
        /* Header Section */
        .header-section {
          background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
          color: white;
          padding: 40px 50px;
          position: relative;
          overflow: hidden;
        }
        .header-content {
          position: relative;
          z-index: 2;
        }
        .header-section::before {
          content: '';
          position: absolute;
          top: 0;
          right: -50px;
          width: 200px;
          height: 200px;
          background: rgba(255,255,255,0.1);
          border-radius: 50%;
        }
        .profile-img { 
          width: 120px; 
          height: 120px; 
          border-radius: 50%; 
          object-fit: cover; 
          float: right;
          margin-left: 30px;
          border: 4px solid white;
          box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        }
        .name { 
          font-size: 36px; 
          font-weight: 700; 
          margin-bottom: 8px; 
          color: white;
          line-height: 1.1;
        }
        .job-title { 
          font-size: 18px; 
          color: rgba(255,255,255,0.9);
          margin-bottom: 20px;
          font-weight: 300;
          letter-spacing: 1px;
        }
        .contact-info {
          display: flex;
          flex-wrap: wrap;
          gap: 25px;
          margin-top: 25px;
        }
        .contact-item {
          display: flex;
          align-items: center;
          font-size: 12px;
          color: rgba(255,255,255,0.9);
        }
        .contact-icon {
          margin-right: 8px;
          font-size: 14px;
        }
        
        /* Main Content */
        .main-content {
          padding: 40px 50px;
        }
        .section { 
          margin-bottom: 35px; 
        }
        .section-title { 
          font-size: 20px; 
          font-weight: 700; 
          color: #1e3c72; 
          margin-bottom: 20px;
          text-transform: uppercase;
          letter-spacing: 1px;
          position: relative;
          padding-bottom: 8px;
        }
        .section-title::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 60px;
          height: 3px;
          background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
        }
        
        .about-text { 
          font-size: 12px; 
          line-height: 1.7;
          color: #555;
          text-align: justify;
        }
        
        .exp-item { 
          margin-bottom: 25px;
          border-left: 3px solid #1e3c72;
          padding-left: 20px;
          position: relative;
        }
        .exp-item::before {
          content: '';
          position: absolute;
          left: -6px;
          top: 8px;
          width: 9px;
          height: 9px;
          background: #1e3c72;
          border-radius: 50%;
        }
        .exp-header { 
          display: flex; 
          justify-content: space-between; 
          align-items: flex-start; 
          margin-bottom: 8px;
          flex-wrap: wrap;
        }
        .exp-position { 
          font-weight: 700; 
          font-size: 16px;
          color: #1e3c72;
          margin: 0;
        }
        .exp-period { 
          font-size: 12px; 
          color: #7f8c8d;
          font-style: italic;
          white-space: nowrap;
        }
        .exp-company { 
          font-size: 14px; 
          color: #2a5298;
          font-weight: 600;
          margin-bottom: 8px; 
        }
        .exp-desc { 
          font-size: 11px;
          line-height: 1.6;
          color: #555;
        }
        
        .edu-item { 
          margin-bottom: 20px;
          border-left: 3px solid #2a5298;
          padding-left: 20px;
          position: relative;
        }
        .edu-item::before {
          content: '';
          position: absolute;
          left: -6px;
          top: 5px;
          width: 9px;
          height: 9px;
          background: #2a5298;
          border-radius: 50%;
        }
        .degree {
          font-weight: 700;
          font-size: 14px;
          color: #1e3c72;
          margin-bottom: 3px;
        }
        .university {
          font-size: 13px;
          color: #2a5298;
          font-weight: 500;
          margin-bottom: 3px;
        }
        .edu-period {
          font-size: 11px;
          color: #7f8c8d;
          font-style: italic;
        }
        
        .skills-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
        }
        .skills-grid { 
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 12px; 
        }
        .skill-tag { 
          background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
          color: white;
          padding: 8px 15px; 
          border-radius: 20px; 
          font-size: 11px;
          text-align: center;
          font-weight: 500;
        }
        
        .refs-grid { 
          display: grid; 
          grid-template-columns: 1fr 1fr; 
          gap: 25px; 
        }
        .ref-item { 
          border: 1px solid #e0e0e0;
          padding: 20px;
          border-radius: 8px;
          background: #f8f9fa;
        }
        .ref-name { 
          font-weight: 700;
          font-size: 14px;
          color: #1e3c72;
          margin-bottom: 5px; 
        }
        .ref-position {
          font-size: 12px;
          color: #2a5298;
          margin-bottom: 8px;
        }
        .ref-contact {
          font-size: 10px;
          color: #7f8c8d;
        }
      </style>
    </head>
    <body>
      <div class="cv-container">
        <div class="header-section">
          <div class="header-content">
            ${profileImage}
            <div class="name">${cvData.fullName || 'Your Full Name'}</div>
            <div class="job-title">${cvData.jobTitle || 'Professional Title'}</div>
            <div class="contact-info">
              <div class="contact-item">
                <span class="contact-icon">📧</span>
                <span>${cvData.email || 'email@example.com'}</span>
              </div>
              <div class="contact-item">
                <span class="contact-icon">📱</span>
                <span>${cvData.phone || '+1 (555) 000-0000'}</span>
              </div>
              <div class="contact-item">
                <span class="contact-icon">📍</span>
                <span>${cvData.address || 'City, State, Country'}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="main-content">
          ${cvData.about ? `
            <div class="section">
              <div class="section-title">Professional Summary</div>
              <div class="about-text">${cvData.about}</div>
            </div>
          ` : ''}

          ${cvData.experiences.length > 0 ? `
            <div class="section">
              <div class="section-title">Professional Experience</div>
              ${cvData.experiences.map(exp => `
                <div class="exp-item">
                  <div class="exp-header">
                    <div class="exp-position">${exp.position || 'Position Title'}</div>
                    <div class="exp-period">${exp.period || 'Start Date - End Date'}</div>
                  </div>
                  <div class="exp-company">${exp.company || 'Company Name'}${exp.location ? ' • ' + exp.location : ''}</div>
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
                  <div class="degree">${edu.degree || 'Degree Title'}</div>
                  <div class="university">${edu.university || 'University Name'}</div>
                  <div class="edu-period">${edu.period || 'Graduation Year'}</div>
                </div>
              `).join('')}
            </div>
          ` : ''}

          ${cvData.expertise.length > 0 || cvData.languages.length > 0 ? `
            <div class="section">
              <div class="section-title">Core Competencies</div>
              <div class="skills-section">
                ${cvData.expertise.length > 0 ? `
                  <div>
                    <h4 style="margin:0 0 15px 0; color:#1e3c72; font-size:14px;">Technical Skills</h4>
                    <div class="skills-grid">
                      ${cvData.expertise.map(skill => `<div class="skill-tag">${skill}</div>`).join('')}
                    </div>
                  </div>
                ` : ''}
                ${cvData.languages.length > 0 ? `
                  <div>
                    <h4 style="margin:0 0 15px 0; color:#1e3c72; font-size:14px;">Languages</h4>
                    <div class="skills-grid">
                      ${cvData.languages.map(lang => `<div class="skill-tag">${lang}</div>`).join('')}
                    </div>
                  </div>
                ` : ''}
              </div>
            </div>
          ` : ''}

          ${cvData.references.some(ref => ref.name) ? `
            <div class="section">
              <div class="section-title">References</div>
              <div class="refs-grid">
                ${cvData.references.filter(ref => ref.name).map(ref => `
                  <div class="ref-item">
                    <div class="ref-name">${ref.name}</div>
                    <div class="ref-position">${ref.position}</div>
                    <div class="ref-contact">📧 ${ref.email}</div>
                    <div class="ref-contact">📱 ${ref.phone}</div>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    </body>
    </html>
  `;
};