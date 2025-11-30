import { CVData } from '../types/cv';

export const generateTemplate4HTML = (cvData: CVData): string => {
  const profileImg = cvData.profileImage 
    ? `<img src="${cvData.profileImage}" class="profile-img"/>`
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
          font-family: 'Segoe UI', 'Calibri', sans-serif; 
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
          position: relative;
        }
        
        /* Header Section */
        .header-section {
          background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
          color: white;
          padding: 40px 50px;
          position: relative;
          text-align: center;
        }
        .header-section::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -20px;
          width: 300px;
          height: 300px;
          background: rgba(255,255,255,0.1);
          border-radius: 50%;
          transform: rotate(25deg);
        }
        .profile-img { 
          width: 140px; 
          height: 140px; 
          border-radius: 50%; 
          object-fit: cover; 
          margin: 0 auto 25px; 
          display: block;
          border: 5px solid white;
          box-shadow: 0 8px 32px rgba(0,0,0,0.3);
          position: relative;
          z-index: 2;
        }
        .name { 
          font-size: 38px; 
          font-weight: 300; 
          margin-bottom: 8px; 
          color: white;
          letter-spacing: 2px;
          line-height: 1.1;
          position: relative;
          z-index: 2;
        }
        .job-title { 
          font-size: 18px; 
          color: rgba(255,255,255,0.9);
          margin-bottom: 25px;
          font-weight: 300;
          letter-spacing: 1px;
          position: relative;
          z-index: 2;
        }
        .contact-info {
          display: flex;
          justify-content: center;
          gap: 30px;
          flex-wrap: wrap;
          margin-top: 20px;
          position: relative;
          z-index: 2;
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
          padding: 50px;
          background: #f8f9fa;
        }
        .content-wrapper {
          background: white;
          border-radius: 12px;
          padding: 40px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }
        
        .section { 
          margin-bottom: 45px; 
        }
        .section:last-child { 
          margin-bottom: 0; 
        }
        .section-title { 
          font-size: 24px; 
          font-weight: 600; 
          color: #2c3e50; 
          margin-bottom: 30px;
          text-align: center;
          position: relative;
          padding-bottom: 15px;
        }
        .section-title::after {
          content: '';
          position: absolute;
          left: 50%;
          bottom: 0;
          transform: translateX(-50%);
          width: 100px;
          height: 3px;
          background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
          border-radius: 3px;
        }
        
        .about-text { 
          font-size: 14px; 
          line-height: 1.8;
          color: #555;
          text-align: center;
          max-width: 600px;
          margin: 0 auto;
          font-style: italic;
        }
        
        /* Timeline Styles */
        .timeline-container {
          position: relative;
          max-width: 800px;
          margin: 0 auto;
        }
        .timeline-line {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 4px;
          background: linear-gradient(to bottom, #3498db, #2980b9);
          transform: translateX(-50%);
          border-radius: 2px;
        }
        .timeline-item {
          position: relative;
          margin-bottom: 40px;
          display: flex;
          align-items: center;
        }
        .timeline-item:nth-child(odd) {
          flex-direction: row;
        }
        .timeline-item:nth-child(even) {
          flex-direction: row-reverse;
        }
        .timeline-content {
          flex: 1;
          background: #f8f9fa;
          padding: 25px;
          border-radius: 10px;
          border-left: 4px solid #3498db;
          margin: 0 30px;
          position: relative;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .timeline-item:nth-child(even) .timeline-content {
          border-left: none;
          border-right: 4px solid #3498db;
        }
        .timeline-content::before {
          content: '';
          position: absolute;
          top: 30px;
          width: 0;
          height: 0;
          border-style: solid;
        }
        .timeline-item:nth-child(odd) .timeline-content::before {
          right: -15px;
          border-left: 15px solid #f8f9fa;
          border-top: 15px solid transparent;
          border-bottom: 15px solid transparent;
        }
        .timeline-item:nth-child(even) .timeline-content::before {
          left: -15px;
          border-right: 15px solid #f8f9fa;
          border-top: 15px solid transparent;
          border-bottom: 15px solid transparent;
        }
        .timeline-dot {
          position: absolute;
          left: 50%;
          top: 30px;
          width: 20px;
          height: 20px;
          background: white;
          border: 4px solid #3498db;
          border-radius: 50%;
          transform: translateX(-50%);
          z-index: 2;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }
        .timeline-period {
          font-size: 12px;
          color: #3498db;
          font-weight: 600;
          background: #ecf0f1;
          padding: 6px 12px;
          border-radius: 15px;
          margin-bottom: 10px;
          display: inline-block;
        }
        .timeline-title {
          font-size: 18px;
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 8px;
          line-height: 1.3;
        }
        .timeline-company {
          font-size: 14px;
          color: #34495e;
          font-weight: 500;
          margin-bottom: 10px;
        }
        .timeline-desc {
          font-size: 12px;
          line-height: 1.6;
          color: #555;
        }
        
        /* Skills Section */
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
          max-width: 800px;
          margin: 0 auto;
        }
        .skills-category {
          background: white;
          padding: 25px;
          border-radius: 10px;
          border-left: 4px solid #3498db;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .skills-category-title {
          font-size: 16px;
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 15px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .skills-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .skills-list li {
          padding: 8px 0;
          font-size: 13px;
          color: #34495e;
          position: relative;
          padding-left: 20px;
        }
        .skills-list li::before {
          content: '▶';
          color: #3498db;
          font-size: 10px;
          position: absolute;
          left: 0;
          top: 10px;
        }
        
        /* References Section */
        .refs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 25px;
          max-width: 800px;
          margin: 0 auto;
        }
        .ref-item {
          background: #f8f9fa;
          padding: 25px;
          border-radius: 10px;
          border-left: 4px solid #3498db;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
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
          ${profileImg}
          <div class="name">${cvData.fullName || 'Your Full Name'}</div>
          <div class="job-title">${cvData.jobTitle || 'Professional Title'}</div>
          <div class="contact-info">
            <div class="contact-item">
              <span class="contact-icon">�</span>
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

        <div class="main-content">
          <div class="content-wrapper">
            ${cvData.about ? `
              <div class="section">
                <div class="section-title">Professional Summary</div>
                <div class="about-text">${cvData.about}</div>
              </div>
            ` : ''}

            ${cvData.experiences.length > 0 ? `
              <div class="section">
                <div class="section-title">Professional Journey</div>
                <div class="timeline-container">
                  <div class="timeline-line"></div>
                  ${cvData.experiences.map(exp => `
                    <div class="timeline-item">
                      <div class="timeline-content">
                        <div class="timeline-period">${exp.period || 'Start Date - End Date'}</div>
                        <div class="timeline-title">${exp.position || 'Position Title'}</div>
                        <div class="timeline-company">${exp.company || 'Company Name'}${exp.location ? ' • ' + exp.location : ''}</div>
                        ${exp.description ? `<div class="timeline-desc">${exp.description}</div>` : ''}
                      </div>
                      <div class="timeline-dot"></div>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}

            ${cvData.education.length > 0 ? `
              <div class="section">
                <div class="section-title">Educational Background</div>
                <div class="timeline-container">
                  <div class="timeline-line"></div>
                  ${cvData.education.map(edu => `
                    <div class="timeline-item">
                      <div class="timeline-content">
                        <div class="timeline-period">${edu.period || 'Graduation Year'}</div>
                        <div class="timeline-title">${edu.degree || 'Degree Title'}</div>
                        <div class="timeline-company">${edu.university || 'University Name'}</div>
                      </div>
                      <div class="timeline-dot"></div>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}

            ${cvData.expertise.length > 0 || cvData.languages.length > 0 ? `
              <div class="section">
                <div class="section-title">Core Competencies</div>
                <div class="skills-grid">
                  ${cvData.expertise.length > 0 ? `
                    <div class="skills-category">
                      <div class="skills-category-title">Technical Skills</div>
                      <ul class="skills-list">
                        ${cvData.expertise.map(skill => `<li>${skill}</li>`).join('')}
                      </ul>
                    </div>
                  ` : ''}
                  ${cvData.languages.length > 0 ? `
                    <div class="skills-category">
                      <div class="skills-category-title">Languages</div>
                      <ul class="skills-list">
                        ${cvData.languages.map(lang => `<li>${lang}</li>`).join('')}
                      </ul>
                    </div>
                  ` : ''}
                </div>
              </div>
            ` : ''}

            ${cvData.references.some(ref => ref.name) ? `
              <div class="section">
                <div class="section-title">Professional References</div>
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
      </div>
    </body>
    </html>
  `;
};