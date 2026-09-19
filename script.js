const defaultData = {
  template: '1',
  photo:
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=300&h=300',
  fullName: 'John Smith',
  jobTitle: 'Food & Beverage Professional',
  email: 'john.smith.fnb@email.com',
  phone: '+62 812 3456 7890',
  location: 'Jakarta, Indonesia',
  summary:
    'A results-driven Food & Beverage professional with over 6 years of hands-on experience across leading international establishments. Known for delivering exceptional guest experiences with a warm, energetic approach and a strong commitment to service excellence.',
  careerObjective:
    'Highly motivated hospitality expert seeking a dynamic leadership position in a premier establishment. Eager to leverage extensive operational experience, meticulous attention to detail, and a steadfast commitment to luxury service standards.',
  workAuthorization:
    'Legal resident in Indonesia with valid working rights and unrestricted mobility.',
  experience:
    'The Ritz-Carlton New York - Assistant Restaurant Manager (Jan 2023 - Present)\n• Managed high-volume daily floor operations and elevated luxury guest satisfaction scores by 18%.\n• Trained and mentored a multi-cultural team of 25+ hospitality professionals.\n\nJW Marriott Los Angeles - F&B Supervisor (Mar 2021 - Dec 2022)\n• Spearheaded VIP banquet setups and coordinated seamless service delivery for high-profile corporate events.',
  education:
    'Universiti Teknologi Malaysia (UTM)\nBachelor of Tourism Management',
  skills:
    'F&B Operations Leadership, Restaurant & Bar Service, Banquet & Event Setup, Complaint Handling, Staff Training & Mentoring, SOP Implementation',
  languages:
    'Indonesian - Native\nEnglish - Advanced\nJapanese - Intermediate\nItalian - Conversational',
  interests:
    'Finance & Business, Hospitality & Service, Health & Wellness, Psychology, Technology',
  personalInfo:
    'DOB: 03 Oct. 1999, Jakarta\nH/W: 175 cm / 68 kg\nExp: 6+ Years in F&B',
  statement:
    'I certify that all information provided is accurate and true, I look forward to the opportunity to discuss my application at your earliest convenience.',
};

let cvData = JSON.parse(localStorage.getItem('cv_state')) || defaultData;
const fields = Object.keys(defaultData).filter((k) => k !== 'photo');

function init() {
  setupMobileTabs();
  bindInputs();
  updatePreview();

  // Setup Visitor Counter
  let count = parseInt(localStorage.getItem('cv_visitors') || '284') + 1;
  localStorage.setItem('cv_visitors', count);
  document.getElementById('visitor-count').innerText = count;

  // Handle Photo Upload (Base64)
  document.getElementById('photo').addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        cvData.photo = evt.target.result;
        saveAndRender();
      };
      reader.readAsDataURL(file);
    }
  });

  document
    .getElementById('btn-print')
    .addEventListener('click', () => window.print());
}

function setupMobileTabs() {
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach((btn) => {
    btn.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      document
        .querySelectorAll('.panel')
        .forEach((p) => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(btn.dataset.target).classList.add('active');
    });
  });
}

function bindInputs() {
  fields.forEach((field) => {
    const el = document.getElementById(field);
    if (el) {
      el.value = cvData[field];
      el.addEventListener('input', (e) => {
        cvData[field] = e.target.value;
        saveAndRender();
      });
    }
  });
}

function saveAndRender() {
  localStorage.setItem('cv_state', JSON.stringify(cvData));
  updatePreview();
}

function updatePreview() {
  const container = document.getElementById('cv-container');
  const isTwoCol = ['1', '3', '4', '6', '8', '10', '11', '15'].includes(
    cvData.template
  );

  // Sidebar Data Fields Render
  const renderSidebarItem = (title, data) => `
      <div class="break-inside-avoid">
          <div class="section-head">${title}</div>
          <div class="text-body">${data}</div>
      </div>`;

  // Main Content Data Fields Render
  const renderMainItem = (title, data) => `
      <div class="break-inside-avoid">
          <div class="main-section-head">${title}</div>
          <div class="text-body">${data}</div>
      </div>`;

  if (isTwoCol) {
    container.className = `cv-page tpl-${cvData.template}`;
    container.innerHTML = `
          <div class="cv-sidebar">
              <div class="cv-photo-box"><img src="${
                cvData.photo
              }" alt="Photo"></div>
              ${renderSidebarItem(
                'Contact',
                `${cvData.location}\n${cvData.phone}\n${cvData.email}`
              )}
              ${renderSidebarItem('Personal Info', cvData.personalInfo)}
              ${renderSidebarItem('Work Auth', cvData.workAuthorization)}
              ${renderSidebarItem('Key Skills', cvData.skills)}
              ${renderSidebarItem('Languages', cvData.languages)}
              ${renderSidebarItem('Interests', cvData.interests)}
          </div>
          <div class="cv-main">
              <div class="break-inside-avoid">
                  <div class="main-title">${cvData.fullName}</div>
                  <div class="sub-title">${cvData.jobTitle}</div>
              </div>
              ${renderMainItem('Profile Summary', cvData.summary)}
              ${renderMainItem('Career Objective', cvData.careerObjective)}
              ${renderMainItem('Professional Experience', cvData.experience)}
              ${renderMainItem(
                'Achievement & Recognition',
                cvData.achievements
              )}
              ${renderMainItem('Education', cvData.education)}
              <div class="break-inside-avoid" style="margin-top:20px; border-top:1px solid #d1d5db; padding-top:10px; text-align:center; font-style:italic; color:#6b7280; font-size:9px;">
                  ${cvData.statement}
              </div>
          </div>
      `;
  } else {
    container.className = `cv-page-col1 tpl-${cvData.template}`;
    container.innerHTML = `
          <div class="cv-header break-inside-avoid">
              <div class="cv-header-photo"><img src="${
                cvData.photo
              }" alt="Photo"></div>
              <div style="flex:1;">
                  <div class="main-title">${cvData.fullName}</div>
                  <div class="sub-title">${cvData.jobTitle}</div>
                  <div class="text-body" style="margin:0; opacity:0.8;">
                      ${cvData.location} | ${cvData.phone} | ${cvData.email}
                  </div>
              </div>
          </div>
          <div class="cv-body">
              ${renderMainItem('Profile Summary', cvData.summary)}
              ${renderMainItem('Career Objective', cvData.careerObjective)}
              ${renderMainItem('Professional Experience', cvData.experience)}
              ${renderMainItem(
                'Achievement & Recognition',
                cvData.achievements
              )}
              
              <div class="break-inside-avoid" style="display:flex; gap:30px; margin-top:5px;">
                  <div style="flex:1;">
                      ${renderMainItem(
                        'Skills & Languages',
                        `<strong>Skills:</strong>\n${cvData.skills}\n\n<strong>Languages:</strong>\n${cvData.languages}`
                      )}
                  </div>
                  <div style="flex:1;">
                      ${renderMainItem(
                        'Auth, Info & Interests',
                        `<strong>Work Auth:</strong>\n${cvData.workAuthorization}\n\n<strong>Info:</strong>\n${cvData.personalInfo}\n\n<strong>Interests:</strong>\n${cvData.interests}`
                      )}
                  </div>
              </div>
              
              ${renderMainItem('Education', cvData.education)}
              
              <div class="break-inside-avoid" style="margin-top:20px; border-top:1px solid #d1d5db; padding-top:10px; text-align:center; font-style:italic; color:#6b7280; font-size:9px;">
                  ${cvData.statement}
              </div>
          </div>
      `;
  }
}

document.addEventListener('DOMContentLoaded', init);
