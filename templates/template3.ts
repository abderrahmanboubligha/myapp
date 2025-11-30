import { CVData } from '../types/cv';

export const generateTemplate3HTML = (cvData: CVData): string => {
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
          font-family: 'Georgia', 'Times New Roman', serif; 
          margin: 0; 
          padding: 0; 
          color: #2c3e50; 
          line-height: 1.6;
          font-size: 11px;
          background: white;
        }
        .cv-container {
          min-height: 297mm;
          max-width: 210mm;
          margin: 0 auto;
          background: white;
          display: grid;
          grid-template-rows: auto 1fr;
        }
        
        /* Header Section */
        .header-section {
          background: #34495e;
          color: white;
          padding: 50px;
          text-align: center;
          position: relative;
          background: linear-gradient(45deg, #2c3e50 0%, #34495e 50%, #2c3e50 100%);
        }
        .header-section::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 20px;
          background: linear-gradient(135deg, transparent 50%, #ecf0f1 50%);
        }
        .profile-img { 
          width: 130px; 
          height: 130px; 
          border-radius: 50%; 
          object-fit: cover; 
          margin: 0 auto 25px; 
          display: block;
          border: 6px solid white;
          box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        }
        .name { 
          font-size: 42px; 
          font-weight: 300; 
          margin-bottom: 10px; 
          color: white;
          letter-spacing: 2px;
          line-height: 1.1;
        }
        .job-title { 
          font-size: 20px; 
          color: #bdc3c7;
          margin-bottom: 30px;
          font-style: italic;
          font-weight: 300;
        }
        .contact-bar {
          display: flex;
          justify-content: center;
          gap: 40px;
          flex-wrap: wrap;
          margin-top: 30px;
        }
        .contact-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 11px;
          color: #ecf0f1;
        }
        .contact-icon {
          font-size: 16px;
          margin-bottom: 5px;
          color: #bdc3c7;
        }
        
        /* Main Content */
        .main-content {
          padding: 50px;
          background: #f8f9fa;
        }
        .content-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 40px;
        }
        .left-column, .right-column {
          background: white;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        }
        
        .section { 
          margin-bottom: 40px; 
        }
        .section:last-child { 
          margin-bottom: 0; 
        }
        .section-title { 
          font-size: 22px; 
          font-weight: 400; 
          color: #2c3e50; 
          margin-bottom: 25px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          position: relative;
          padding-bottom: 12px;
        }
        .section-title::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 80px;
          height: 2px;
          background: #34495e;
        }
        
        .about-text { 
          font-size: 13px; 
          line-height: 1.8;
          color: #555;
          text-align: justify;
          font-style: italic;
        }
        
        .exp-item { 
          margin-bottom: 30px;
          padding-bottom: 25px;
          border-bottom: 1px solid #ecf0f1;
        }
        .exp-item:last-child {
          border-bottom: none;
          margin-bottom: 0;
        }
        .exp-header { 
          display: flex; 
          justify-content: space-between; 
          align-items: flex-start; 
          margin-bottom: 10px;
          flex-wrap: wrap;
        }
        .exp-position { 
          font-weight: 600; 
          font-size: 18px;
          color: #2c3e50;
          margin: 0;
          line-height: 1.2;
        }
        .exp-period { 
          font-size: 12px; 
          color: #7f8c8d;
          font-style: italic;
          background: #ecf0f1;
          padding: 4px 12px;
          border-radius: 15px;
          white-space: nowrap;
        }
        .exp-company { 
          font-size: 15px; 
          color: #34495e;
          font-weight: 500;
          margin-bottom: 12px; 
        }
        .exp-desc { 
          font-size: 12px;
          line-height: 1.7;
          color: #555;
          text-align: justify;
        }
        
        .edu-item { 
          margin-bottom: 25px;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 6px;
          border-left: 4px solid #34495e;
        }
        .degree {
          font-weight: 600;
          font-size: 16px;
          color: #2c3e50;
          margin-bottom: 6px;
        }
        .university {
          font-size: 14px;
          color: #34495e;
          font-weight: 400;
          margin-bottom: 6px;
        }
        .edu-period {
          font-size: 12px;
          color: #7f8c8d;
          font-style: italic;
        }
        
        .skills-list { 
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .skills-list li { 
          padding: 12px 0;
          border-bottom: 1px solid #ecf0f1;
          font-size: 13px;
          color: #2c3e50;
          position: relative;
          padding-left: 20px;
        }
        .skills-list li:before {
          content: '▪';
          color: #34495e;
          font-size: 16px;
          position: absolute;
          left: 0;
          top: 12px;
        }
        .skills-list li:last-child {
          border-bottom: none;
        }
        
        .languages-list {
          display: grid;
          gap: 15px;
        }
        .language-item {
          background: #2c3e50;
          color: white;
          padding: 12px 20px;
          border-radius: 25px;
          text-align: center;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.5px;
        }
        
        .ref-item { 
          background: #f8f9fa;
          padding: 25px;
          border-radius: 8px;
          margin-bottom: 20px;
          border-left: 4px solid #34495e;
        }
        .ref-name { 
          font-weight: 600;
          font-size: 16px;
          color: #2c3e50;
          margin-bottom: 8px; 
        }
        .ref-position {
          font-size: 13px;
          color: #34495e;
          margin-bottom: 10px;
          font-style: italic;
        }
        .ref-contact {
          font-size: 11px;
          color: #7f8c8d;
          margin-bottom: 3px;
        }
      </style>
    </head>
    <body>
      <div class="cv-container">
        <div class="header-section">
          ${profileImage}
          <div class="name">${cvData.fullName || 'Your Full Name'}</div>
          <div class="job-title">${cvData.jobTitle || 'Professional Title'}</div>
          <div class="contact-bar">
            <div class="contact-item">
              <div class="contact-icon">📧</div>
              <span>${cvData.email || 'email@example.com'}</span>
            </div>
            <div class="contact-item">
              <div class="contact-icon">📱</div>
              <span>${cvData.phone || '+1 (555) 000-0000'}</span>
            </div>
            <div class="contact-item">
              <div class="contact-icon">📍</div>
              <span>${cvData.address || 'City, State, Country'}</span>
            </div>
          </div>
        </div>

        <div class="main-content">
          <div class="content-grid">
            <div class="left-column">
              ${cvData.about ? `
                <div class="section">
                  <div class="section-title">About</div>
                  <div class="about-text">${cvData.about}</div>
                </div>
              ` : ''}

              ${cvData.experiences.length > 0 ? `
                <div class="section">
                  <div class="section-title">Experience</div>
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
            </div>

            <div class="right-column">
              ${cvData.expertise.length > 0 ? `
                <div class="section">
                  <div class="section-title">Skills</div>
                  <ul class="skills-list">
                    ${cvData.expertise.map(skill => `<li>${skill}</li>`).join('')}
                  </ul>
                </div>
              ` : ''}

              ${cvData.languages.length > 0 ? `
                <div class="section">
                  <div class="section-title">Languages</div>
                  <div class="languages-list">
                    ${cvData.languages.map(lang => `<div class="language-item">${lang}</div>`).join('')}
                  </div>
                </div>
              ` : ''}

              ${cvData.references.some(ref => ref.name) ? `
                <div class="section">
                  <div class="section-title">References</div>
                  ${cvData.references.filter(ref => ref.name).map(ref => `
                    <div class="ref-item">
                      <div class="ref-name">${ref.name}</div>
                      <div class="ref-position">${ref.position}</div>
                      <div class="ref-contact">📧 ${ref.email}</div>
                      <div class="ref-contact">📱 ${ref.phone}</div>
                    </div>
                  `).join('')}
                </div>
              ` : ''}
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};