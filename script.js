const defaultData = {
  template: '2',
  photo:
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=300&h=300',
  fullName: 'John Smith',
  jobTitle: 'Food & Beverage Professional',
  email: 'john.smith.fnb@email.com',
  phone: '+62 812 3456 7890',
  location: 'Jakarta, Indonesia',
  linkedin: 'linkedin.com/in/johnsmith',
  summary:
    'A results-driven Food & Beverage professional with over 6 years of hands-on experience across leading international establishments. Known for delivering exceptional guest experiences with a warm, energetic approach.',
  showObjective: false,
  careerObjective:
    'Highly motivated hospitality expert seeking a dynamic leadership position.',
  experiences: [
    {
      id: 1,
      company: 'The Ritz-Carlton New York',
      position: 'Assistant Restaurant Manager',
      period: 'Jan 2023 - Present',
      desc: '• Managed high-volume daily floor operations and elevated luxury guest satisfaction scores by 18%.\n• Trained and mentored a multi-cultural team of 25+ hospitality professionals.',
    },
    {
      id: 2,
      company: 'JW Marriott Los Angeles',
      position: 'F&B Supervisor',
      period: 'Mar 2021 - Dec 2022',
      desc: '• Spearheaded VIP banquet setups and coordinated seamless service delivery for high-profile corporate events.',
    },
  ],
  educations: [
    {
      id: 1,
      institution: 'Universiti Teknologi Malaysia (UTM)',
      degree: 'Bachelor of Tourism Management',
      period: '2015 - 2019',
    },
  ],
  skills:
    'F&B Operations Leadership, Restaurant & Bar Service, Banquet Setup, Staff Mentoring, SOP Implementation',
  languages: 'Indonesian (Native), English (Advanced)',
  showAchievements: true,
  achievements: 'Excellence in Leadership Award - Ritz-Carlton (2024)',
};

let cvData = JSON.parse(localStorage.getItem('cv_state_v4')) || defaultData;

function init() {
  setupMobileTabs();
  setupAccordion();
  bindInputs();
  renderExpEduForms();
  updatePreview();

  document.getElementById('photo').addEventListener('change', (e) => {
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

  document.getElementById('btn-add-exp').addEventListener('click', () => {
    cvData.experiences.push({
      id: Date.now(),
      company: '',
      position: '',
      period: '',
      desc: '',
    });
    renderExpEduForms();
    saveAndRender();
  });
  document.getElementById('btn-add-edu').addEventListener('click', () => {
    cvData.educations.push({
      id: Date.now(),
      institution: '',
      degree: '',
      period: '',
    });
    renderExpEduForms();
    saveAndRender();
  });

  document
    .getElementById('btn-print')
    .addEventListener('click', () => window.print());
  document.getElementById('btn-reset').addEventListener('click', () => {
    if (confirm('Are you sure want to reset all data?')) {
      localStorage.removeItem('cv_state_v4');
      location.reload();
    }
  });

  document.getElementById('btn-export-json').addEventListener('click', () => {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(cvData));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute('href', dataStr);
    dlAnchorElem.setAttribute('download', 'cv_data_backup.json');
    dlAnchorElem.click();
  });
  document.getElementById('import-json').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        cvData = JSON.parse(evt.target.result);
        saveAndRender();
        location.reload();
      } catch (err) {
        alert('Invalid JSON file');
      }
    };
    reader.readAsText(file);
  });
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

function setupAccordion() {
  const headers = document.querySelectorAll('.acc-header');
  headers.forEach((header) => {
    header.addEventListener('click', function () {
      const item = this.parentElement;
      const isActive = item.classList.contains('active');
      document
        .querySelectorAll('.acc-item')
        .forEach((i) => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });
}

function bindInputs() {
  const textFields = [
    'template',
    'fullName',
    'jobTitle',
    'email',
    'phone',
    'location',
    'linkedin',
    'summary',
    'skills',
    'languages',
    'careerObjective',
    'achievements',
  ];
  textFields.forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.value = cvData[id] || '';
      el.addEventListener('input', (e) => {
        cvData[id] = e.target.value;
        saveAndRender();
      });
    }
  });

  const toggles = ['showObjective', 'showAchievements'];
  toggles.forEach((id) => {
    const el = document.getElementById(id);
    const targetInput = document.getElementById(
      id === 'showObjective' ? 'careerObjective' : 'achievements'
    );
    if (el) {
      el.checked = cvData[id];
      targetInput.classList.toggle('hidden', !cvData[id]);
      el.addEventListener('change', (e) => {
        cvData[id] = e.target.checked;
        targetInput.classList.toggle('hidden', !e.target.checked);
        saveAndRender();
      });
    }
  });
}

function renderExpEduForms() {
  const expDiv = document.getElementById('experience-list');
  expDiv.innerHTML = cvData.experiences
    .map(
      (exp, index) => `
      <div class="data-card">
          <button class="btn-remove" onclick="removeData('experiences', ${index})">X</button>
          <input type="text" class="input-field mb-2" placeholder="Position / Role" value="${exp.position}" oninput="updateData('experiences', ${index}, 'position', this.value)">
          <div class="form-grid-2 mb-2">
              <input type="text" class="input-field" placeholder="Company Name" value="${exp.company}" oninput="updateData('experiences', ${index}, 'company', this.value)">
              <input type="text" class="input-field" placeholder="Period (e.g. 2020 - 2023)" value="${exp.period}" oninput="updateData('experiences', ${index}, 'period', this.value)">
          </div>
          <textarea class="input-field" placeholder="Achievements / Responsibilities (Use bullet points)" rows="3" oninput="updateData('experiences', ${index}, 'desc', this.value)">${exp.desc}</textarea>
      </div>
  `
    )
    .join('');

  const eduDiv = document.getElementById('education-list');
  eduDiv.innerHTML = cvData.educations
    .map(
      (edu, index) => `
      <div class="data-card">
          <button class="btn-remove" onclick="removeData('educations', ${index})">X</button>
          <input type="text" class="input-field mb-2" placeholder="Degree / Major" value="${edu.degree}" oninput="updateData('educations', ${index}, 'degree', this.value)">
          <div class="form-grid-2">
              <input type="text" class="input-field" placeholder="Institution Name" value="${edu.institution}" oninput="updateData('educations', ${index}, 'institution', this.value)">
              <input type="text" class="input-field" placeholder="Period" value="${edu.period}" oninput="updateData('educations', ${index}, 'period', this.value)">
          </div>
      </div>
  `
    )
    .join('');
}

window.updateData = function (type, index, field, value) {
  cvData[type][index][field] = value;
  saveAndRender();
};
window.removeData = function (type, index) {
  cvData[type].splice(index, 1);
  renderExpEduForms();
  saveAndRender();
};

function saveAndRender() {
  localStorage.setItem('cv_state_v4', JSON.stringify(cvData));
  updatePreview();
}

function updatePreview() {
  const container = document.getElementById('cv-container');
  const t = cvData.template;

  const expHTML = cvData.experiences
    .map(
      (e) => `
      <div class="exp-block">
          <div class="exp-header"><span class="exp-title">${e.position}</span><span class="exp-date">${e.period}</span></div>
          <div class="exp-company">${e.company}</div>
          <div class="text-body">${e.desc}</div>
      </div>
  `
    )
    .join('');

  const eduHTML = cvData.educations
    .map(
      (e) => `
      <div class="edu-block">
          <div class="exp-header"><span class="exp-title">${e.degree}</span><span class="exp-date">${e.period}</span></div>
          <div class="exp-company">${e.institution}</div>
      </div>
  `
    )
    .join('');

  const rSidebar = (title, data) =>
    data
      ? `<div class="break-inside-avoid"><div class="section-head">${title}</div><div class="text-body">${data}</div></div>`
      : '';
  const rMain = (title, data) =>
    data
      ? `<div class="break-inside-avoid"><div class="main-section-head">${title}</div><div class="text-body">${data}</div></div>`
      : '';
  const rCustom = (title, html) =>
    html
      ? `<div class="break-inside-avoid"><div class="main-section-head">${title}</div>${html}</div>`
      : '';

  const contactLines = [
    cvData.location,
    cvData.phone,
    cvData.email,
    cvData.linkedin,
  ].filter(Boolean);
  const contactBr = contactLines.join('<br>');
  const contactPipe = contactLines.join(' | ');

  if (['1', '3', '4', '11', '15'].includes(t)) {
    container.className = `cv-page tpl-${t}`;
    container.innerHTML = `
          <div class="cv-sidebar">
              <div class="cv-photo-box"><img src="${
                cvData.photo
              }" alt="Photo"></div>
              ${rSidebar('Contact', contactBr)}
              ${rSidebar('Key Skills', cvData.skills)}
              ${rSidebar('Languages', cvData.languages)}
          </div>
          <div class="cv-main">
              <div class="break-inside-avoid"><div class="main-title">${
                cvData.fullName
              }</div><div class="sub-title">${cvData.jobTitle}</div></div>
              ${rMain('Professional Summary', cvData.summary)}
              ${
                cvData.showObjective
                  ? rMain('Career Objective', cvData.careerObjective)
                  : ''
              }
              ${rCustom('Professional Experience', expHTML)}
              ${rCustom('Education', eduHTML)}
              ${
                cvData.showAchievements
                  ? rMain('Achievements', cvData.achievements)
                  : ''
              }
          </div>
      `;
  } else if (['2', '7', '12', '13'].includes(t)) {
    container.className = `cv-page-col1 tpl-${t}`;
    container.innerHTML = `
          <div class="cv-header break-inside-avoid">
              <div class="cv-header-photo"><img src="${
                cvData.photo
              }" alt="Photo"></div>
              <div style="flex:1;">
                  <div class="main-title">${
                    cvData.fullName
                  }</div><div class="sub-title">${cvData.jobTitle}</div>
              </div>
              <div class="header-contact">${contactBr}</div>
          </div>
          <div class="cv-body">
              ${rMain('Professional Summary', cvData.summary)}
              ${
                cvData.showObjective
                  ? rMain('Career Objective', cvData.careerObjective)
                  : ''
              }
              ${rCustom('Professional Experience', expHTML)}
              <div class="break-inside-avoid" style="display:flex; gap:30px; margin-top:5px;">
                  <div style="flex:1;">${rMain(
                    'Skills & Languages',
                    `<strong>Skills:</strong>\n${cvData.skills}\n\n<strong>Languages:</strong>\n${cvData.languages}`
                  )}</div>
                  <div style="flex:1;">${rCustom('Education', eduHTML)}</div>
              </div>
              ${
                cvData.showAchievements
                  ? rMain('Achievements', cvData.achievements)
                  : ''
              }
          </div>
      `;
  } else if (t === '9') {
    container.className = `cv-page-col1 tpl-9`;
    container.innerHTML = `
          <div class="cv-header break-inside-avoid">
              <div class="cv-header-photo"><img src="${
                cvData.photo
              }" alt="Photo"></div>
              <div class="main-title">${
                cvData.fullName
              }</div><div class="sub-title">${cvData.jobTitle}</div>
              <div class="header-contact">${contactPipe}</div>
          </div>
          <div class="cv-body">
              ${rMain('Professional Summary', cvData.summary)}
              ${
                cvData.showObjective
                  ? rMain('Career Objective', cvData.careerObjective)
                  : ''
              }
              ${rCustom('Professional Experience', expHTML)}
              <div class="break-inside-avoid" style="display:flex; gap:30px; margin-top:5px;">
                  <div style="flex:1;">${rMain(
                    'Skills & Languages',
                    `<strong>Skills:</strong>\n${cvData.skills}\n\n<strong>Languages:</strong>\n${cvData.languages}`
                  )}</div>
                  <div style="flex:1;">${rCustom('Education', eduHTML)}</div>
              </div>
              ${
                cvData.showAchievements
                  ? rMain('Achievements', cvData.achievements)
                  : ''
              }
          </div>
      `;
  } else if (t === '5') {
    container.className = `cv-page-col1 tpl-5`;
    container.innerHTML = `
          <div class="cv-header break-inside-avoid">
              <div><div class="main-title">${
                cvData.fullName
              }</div><div class="sub-title">${cvData.jobTitle}</div></div>
              <div class="header-contact">${contactBr}</div>
          </div>
          <div class="cv-body">
              ${rMain('Professional Summary', cvData.summary)}
              ${
                cvData.showObjective
                  ? rMain('Career Objective', cvData.careerObjective)
                  : ''
              }
              ${rCustom('Professional Experience', expHTML)}
              ${rCustom('Education', eduHTML)}
              <div class="break-inside-avoid" style="display:flex; gap:30px; margin-top:5px;">
                  <div style="flex:1;">${rMain('Skills', cvData.skills)}</div>
                  <div style="flex:1;">${rMain(
                    'Languages',
                    cvData.languages
                  )}</div>
              </div>
              ${
                cvData.showAchievements
                  ? rMain('Achievements', cvData.achievements)
                  : ''
              }
          </div>
      `;
  } else if (t === '6') {
    container.className = `cv-page-col1 tpl-6`;
    container.innerHTML = `
          <div class="cv-header break-inside-avoid">
              <div class="main-title">${
                cvData.fullName
              }</div><div class="sub-title">${cvData.jobTitle}</div>
              <div class="header-contact">${contactPipe}</div>
          </div>
          <div class="cv-body-split">
              <div>
                  ${rMain('Professional Summary', cvData.summary)}
                  ${
                    cvData.showObjective
                      ? rMain('Career Objective', cvData.careerObjective)
                      : ''
                  }
                  ${rCustom('Professional Experience', expHTML)}
              </div>
              <div>
                  ${rCustom('Education', eduHTML)}
                  ${rMain('Skills', cvData.skills)}
                  ${rMain('Languages', cvData.languages)}
                  ${
                    cvData.showAchievements
                      ? rMain('Achievements', cvData.achievements)
                      : ''
                  }
              </div>
          </div>
      `;
  } else if (t === '8') {
    container.className = `cv-page-col1 tpl-8`;
    container.innerHTML = `
          <div class="cv-header break-inside-avoid">
              <div class="main-title">${
                cvData.fullName
              }</div><div class="sub-title">${cvData.jobTitle}</div>
              <div class="header-contact">${contactPipe}</div>
          </div>
          <div class="cv-body">
              ${rMain('Professional Summary', cvData.summary)}
              ${
                cvData.showObjective
                  ? rMain('Career Objective', cvData.careerObjective)
                  : ''
              }
              ${rCustom('Professional Experience', expHTML)}
              ${rCustom('Education', eduHTML)}
              ${rMain(
                'Skills & Languages',
                `<strong>Skills:</strong> ${cvData.skills} \vert{} <strong>Languages:</strong>${cvData.languages}`
              )}
              ${
                cvData.showAchievements
                  ? rMain('Achievements', cvData.achievements)
                  : ''
              }
          </div>
      `;
  } else if (t === '10') {
    container.className = `cv-page-col1 tpl-10`;
    container.innerHTML = `
          <div class="cv-header break-inside-avoid">
              <div class="main-title">${
                cvData.fullName
              }</div><div class="sub-title">${cvData.jobTitle}</div>
              <div class="header-contact">${contactPipe}</div>
          </div>
          <div class="cv-body">
              ${rMain('summary', cvData.summary)}
              ${rCustom('experience', expHTML)}
              ${rCustom('education', eduHTML)}
              <div class="break-inside-avoid" style="display:flex; gap:30px; margin-top:5px;">
                  <div style="flex:1;">${rMain('skills', cvData.skills)}</div>
                  <div style="flex:1;">${rMain(
                    'languages',
                    cvData.languages
                  )}</div>
              </div>
          </div>
      `;
  } else if (t === '14') {
    const nameParts = cvData.fullName.split(' ');
    const firstName = nameParts[0] || '';
    const restName = nameParts.slice(1).join(' ');

    container.className = `cv-page tpl-14`;
    container.innerHTML = `
          <div class="cv-sidebar">
              <div class="vert-title"><span>${firstName}</span> ${restName}</div>
          </div>
          <div class="cv-main">
              <div class="header-contact-vert break-inside-avoid">
                  <div style="font-weight:700; color:#18181b; font-size:14px; margin-bottom:10px; text-transform:uppercase;">${
                    cvData.jobTitle
                  }</div>
                  ${contactBr}
              </div>
              ${rMain('Professional Summary', cvData.summary)}
              ${
                cvData.showObjective
                  ? rMain('Career Objective', cvData.careerObjective)
                  : ''
              }
              ${rCustom('Professional Experience', expHTML)}
              ${rCustom('Education', eduHTML)}
              ${rMain('Skills', cvData.skills)}
          </div>
      `;
  }
}

document.addEventListener('DOMContentLoaded', init);
