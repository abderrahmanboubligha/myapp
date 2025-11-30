import { CVData } from '../types/cv';

export const generateTemplate1HTML = (cvData: CVData): string => {
  const profileImage = cvData.profileImage 
    ? `<img src="${cvData.profileImage}" style="width:120px;height:120px;border-radius:50%;object-fit:cover;display:block;margin:0 auto 20px;border:3px solid white;"/>` 
    : '';

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
          font-size: 11px;
          line-height: 1.4;
        }
        .cv-container { 
          display: flex; 
          min-height: 297mm;
          background: white;
        }
        .sidebar { 
          width: 300px; 
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 30px 25px; 
          color: white;
          box-sizing: border-box;
        }
        .main-content { 
          flex: 1;
          padding: 40px 35px; 
          background: white;
          box-sizing: border-box;
        }
        
        /* Sidebar Styles */
        .profile-section {
          text-align: center;
          margin-bottom: 35px;
          padding-bottom: 25px;
          border-bottom: 2px solid rgba(255,255,255,0.3);
        }
        .name {
          font-size: 24px;
          font-weight: 700;
          margin: 15px 0 5px 0;
          letter-spacing: 1px;
        }
        .title {
          font-size: 14px;
          opacity: 0.9;
          font-weight: 300;
        }
        
        .sidebar-section {
          margin-bottom: 30px;
        }
        .sidebar-heading {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 15px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: white;
        }
        .contact-item {
          display: flex;
          align-items: center;
          margin-bottom: 12px;
          font-size: 11px;
        }
        .contact-icon {
          width: 16px;
          margin-right: 12px;
          font-weight: bold;
        }
        .skill-item {
          margin-bottom: 8px;
          font-size: 11px;
        }
        .skill-bar {
          height: 3px;
          background: rgba(255,255,255,0.3);
          border-radius: 2px;
          margin-top: 3px;
          overflow: hidden;
        }
        .skill-fill {
          height: 100%;
          background: white;
          width: 85%;
          border-radius: 2px;
        }
        
        /* Main Content Styles */
        .main-section {
          margin-bottom: 30px;
        }
        .section-title {
          font-size: 18px;
          font-weight: 700;
          color: #2c3e50;
          margin-bottom: 20px;
          text-transform: uppercase;
          letter-spacing: 1px;
          position: relative;
        }
        .section-title::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -5px;
          width: 50px;
          height: 3px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .about-text {
          font-size: 12px;
          line-height: 1.6;
          color: #555;
          text-align: justify;
        }
        
        .experience-item {
          margin-bottom: 25px;
          position: relative;
          padding-left: 20px;
        }
        .experience-item::before {
          content: '';
          position: absolute;
          left: 0;
          top: 5px;
          width: 8px;
          height: 8px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 50%;
        }
        .job-title {
          font-size: 14px;
          font-weight: 700;
          color: #2c3e50;
          margin-bottom: 3px;
        }
        .company-name {
          font-size: 13px;
          font-weight: 600;
          color: #667eea;
          margin-bottom: 2px;
        }
        .job-period {
          font-size: 10px;
          color: #7f8c8d;
          margin-bottom: 8px;
          font-style: italic;
        }
        .job-description {
          font-size: 11px;
          line-height: 1.5;
          color: #555;
        }
        
        .education-item {
          margin-bottom: 20px;
          padding-left: 20px;
          position: relative;
        }
        .education-item::before {
          content: '';
          position: absolute;
          left: 0;
          top: 3px;
          width: 8px;
          height: 8px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 50%;
        }
        .degree {
          font-size: 13px;
          font-weight: 600;
          color: #2c3e50;
        }
        .university {
          font-size: 12px;
          color: #667eea;
          font-weight: 500;
        }
        .edu-period {
          font-size: 10px;
          color: #7f8c8d;
          font-style: italic;
        }
      </style>
    </head>
    <body>
      <div class="cv-container">
        <div class="sidebar">
          <div class="profile-section">
            ${profileImage}
            <div class="name">${cvData.fullName || 'Your Full Name'}</div>
            <div class="title">${cvData.jobTitle || 'Professional Title'}</div>
          </div>
          
          <div class="sidebar-section">
            <div class="sidebar-heading">Contact</div>
            <div class="contact-item">
              <div class="contact-icon">📧</div>
              <div>${cvData.email || 'email@example.com'}</div>
            </div>
            <div class="contact-item">
              <div class="contact-icon">📱</div>
              <div>${cvData.phone || '+1 (555) 000-0000'}</div>
            </div>
            <div class="contact-item">
              <div class="contact-icon">📍</div>
              <div>${cvData.address || 'City, State, Country'}</div>
            </div>
          </div>

          ${cvData.expertise.length > 0 ? `
            <div class="sidebar-section">
              <div class="sidebar-heading">Skills</div>
              ${cvData.expertise.map(skill => `
                <div class="skill-item">
                  <div>${skill}</div>
                  <div class="skill-bar">
                    <div class="skill-fill"></div>
                  </div>
                </div>
              `).join('')}
            </div>
          ` : ''}

          ${cvData.languages.length > 0 ? `
            <div class="sidebar-section">
              <div class="sidebar-heading">Languages</div>
              ${cvData.languages.map(lang => `
                <div class="skill-item">
                  <div>${lang}</div>
                  <div class="skill-bar">
                    <div class="skill-fill"></div>
                  </div>
                </div>
              `).join('')}
            </div>
          ` : ''}
        </div>

        <div class="main-content">
          ${cvData.about ? `
            <div class="main-section">
              <div class="section-title">Professional Summary</div>
              <div class="about-text">${cvData.about}</div>
            </div>
          ` : ''}

          ${cvData.experiences.length > 0 ? `
            <div class="main-section">
              <div class="section-title">Professional Experience</div>
              ${cvData.experiences.map(exp => `
                <div class="experience-item">
                  <div class="job-title">${exp.position || 'Position Title'}</div>
                  <div class="company-name">${exp.company || 'Company Name'}</div>
                  <div class="job-period">${exp.period || 'Start Date - End Date'}${exp.location ? ' • ' + exp.location : ''}</div>
                  ${exp.description ? `<div class="job-description">${exp.description}</div>` : ''}
                </div>
              `).join('')}
            </div>
          ` : ''}

          ${cvData.education.length > 0 ? `
            <div class="main-section">
              <div class="section-title">Education</div>
              ${cvData.education.map(edu => `
                <div class="education-item">
                  <div class="degree">${edu.degree || 'Degree Title'}</div>
                  <div class="university">${edu.university || 'University Name'}</div>
                  <div class="edu-period">${edu.period || 'Graduation Year'}</div>
                </div>
              `).join('')}
            </div>
          ` : ''}

          ${cvData.references.some(ref => ref.name) ? `
            <div class="main-section">
              <div class="section-title">References</div>
              ${cvData.references.filter(ref => ref.name).map(ref => `
                <div class="experience-item">
                  <div class="job-title">${ref.name}</div>
                  <div class="company-name">${ref.position}</div>
                  <div class="job-description">📧 ${ref.email} • 📱 ${ref.phone}</div>
                </div>
              `).join('')}
            </div>
          ` : ''}
        </div>
      </div>
    </body>
    </html>
  `;
};
};