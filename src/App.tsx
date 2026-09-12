import React, { useState, useEffect } from 'react';

export default function App() {
  const [template, setTemplate] = useState('1');
  const [visitorCount, setVisitorCount] = useState(0);
  const [cv, setCv] = useState({
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
      'The Ritz-Carlton New York - Assistant Restaurant Manager (Jan 2023 - Present)\n• Managed high-volume daily floor operations and elevated luxury guest satisfaction scores by 18%.\n• Trained and mentored a multi-cultural team of 25+ hospitality professionals.\n\nJW Marriott Los Angeles - F&B Supervisor (Mar 2021 - Dec 2022)\n• Spearheaded VIP banquet setups and coordinated seamless service delivery for high-profile corporate events.\n\nNobu Hotel Miami Beach - Senior Server & Captain (Jun 2019 - Feb 2021)\n• Delivered meticulous upscale omakase service and curated extensive wine pairings for international clientele.\n\nFairmont San Francisco - Food & Beverage Trainee (Jan 2018 - May 2019)\n• Assisted in pre-opening setup, inventory control, and standard operating procedure execution across outlets.',
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
    achievements:
      'Excellence in Leadership Award - Ritz-Carlton (2024): Recognized for maintaining the lowest turnover rate and highest guest appreciation ratings across regional operations.',
    statement:
      'I certify that all information provided is accurate and true, I look forward to the opportunity to discuss my application at your earliest convenience.',
    photo:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=300&h=300',
  });

  useEffect(() => {
    const currentVisits = localStorage.getItem('cv_visitors') || '284';
    const newCount = parseInt(currentVisits) + 1;
    localStorage.setItem('cv_visitors', newCount.toString());
    setVisitorCount(newCount);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setCv({ ...cv, [e.target.name]: e.target.value });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setCv((prev) => ({ ...prev, photo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePrintPDF = () => {
    window.print();
  };

  // Trik CSS Pintar untuk mempertahankan warna Sidebar agar Tembus ke Halaman berapapun tanpa terpotong
  const getBackgroundClass = () => {
    switch (template) {
      case '1':
        return 'bg-[linear-gradient(to_right,#0f172a_33.333%,transparent_33.333%)]'; // slate-900
      case '3':
        return 'bg-[linear-gradient(to_right,#1e293b_33.333%,transparent_33.333%)]'; // slate-800
      case '4':
        return 'bg-[linear-gradient(to_right,#78350f_33.333%,transparent_33.333%)]'; // amber-900
      case '6':
        return 'bg-[linear-gradient(to_right,#042f2e_33.333%,transparent_33.333%)]'; // teal-950
      case '8':
        return 'bg-[linear-gradient(to_right,#4c0519_33.333%,transparent_33.333%)]'; // rose-950
      case '10':
        return 'bg-[linear-gradient(to_right,#020617_33.333%,transparent_33.333%)] font-mono'; // slate-950
      case '11':
        return 'bg-[linear-gradient(to_left,#172554_33.333%,transparent_33.333%)]'; // blue-950 (Right Sidebar)
      case '15':
        return 'bg-[linear-gradient(to_right,#000000_33.333%,transparent_33.333%)]'; // black
      default:
        return 'bg-white';
    }
  };

  const isTwoColumn = ['1', '3', '4', '6', '8', '10', '11', '15'].includes(
    template
  );

  return (
    // PENTING: Class print:block print:h-auto print:overflow-visible mengatasi masalah PDF Blank!
    <div className="flex flex-col md:flex-row h-screen bg-gray-100 font-sans print:block print:h-auto print:overflow-visible">
      {/* GLOBAL PRINT CSS FIX - Membunuh semua sifat 'overflow-hidden' saat rendering PDF */}
      <style>{`
        @media print {
          @page { size: A4 portrait; margin: 0; }
          html, body, #root {
            width: 100% !important;
            height: auto !important;
            overflow: visible !important;
            background: white !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .break-inside-avoid { break-inside: avoid; page-break-inside: avoid; }
        }
      `}</style>

      {/* KOLOM KIRI: FORM INPUT 100% LENGKAP - Hilang otomatis saat Print */}
      <div className="w-full md:w-1/3 bg-white p-6 overflow-y-auto shadow-xl border-r print:hidden">
        <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg mb-6 flex justify-between items-center">
          <div>
            <p className="text-xs text-blue-600 font-bold uppercase">
              Visitor Detector
            </p>
            <p className="text-lg font-extrabold text-blue-900">
              {visitorCount} Orang
            </p>
          </div>
          <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded font-semibold animate-pulse">
            Live Active
          </span>
        </div>

        <h2 className="text-2xl font-black text-gray-800 mb-6 uppercase tracking-tight">
          PROFESSIONAL CV MAKER
        </h2>

        <div className="mb-6">
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Pilih dari 15 Template Pilihan
          </label>
          <select
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
            className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none text-sm font-bold shadow-sm"
          >
            <option value="1">1. Brian Baxter Style (Dark Sidebar)</option>
            <option value="2">2. Corporate Minimalist (ATS Clean)</option>
            <option value="3">3. Creative Visual Elite (Round Photo)</option>
            <option value="4">4. Hospitality Specialist (Warm Amber)</option>
            <option value="5">5. Executive Navy Classic (Top Header)</option>
            <option value="6">6. Modern Split Slate & Teal (Kontras)</option>
            <option value="7">7. Emerald Corporate (Green Accent)</option>
            <option value="8">8. Crimson Executive Bold (Kontras)</option>
            <option value="9">9. Luxury Gold Standard (Serif Premium)</option>
            <option value="10">
              10. Tech & Data Analyst Style (Dark Mono)
            </option>
            <option value="11">11. Steven Terry Style (Right Sidebar)</option>
            <option value="12">12. Senior Supervisor Clean Layout</option>
            <option value="13">13. Matthew Connors Style (Dark Badge)</option>
            <option value="14">14. Modern Creative Grid Minimalist</option>
            <option value="15">
              15. Ultimate Signature Edition (Gold & Black)
            </option>
          </select>
        </div>

        {/* INPUT FORM 17 DATA SINKRON! */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              1. Upload Foto Profil
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-bold file:bg-blue-600 file:text-white cursor-pointer hover:file:bg-blue-700 transition"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              2. Full Name
            </label>
            <input
              name="fullName"
              value={cv.fullName}
              onChange={handleChange}
              className="w-full p-2 border rounded bg-gray-50 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              3. Role / Job Title
            </label>
            <input
              name="jobTitle"
              value={cv.jobTitle}
              onChange={handleChange}
              className="w-full p-2 border rounded bg-gray-50 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              4. Email
            </label>
            <input
              name="email"
              value={cv.email}
              onChange={handleChange}
              className="w-full p-2 border rounded bg-gray-50 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              5. Phone Number
            </label>
            <input
              name="phone"
              value={cv.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded bg-gray-50 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              6. Domicile (Location)
            </label>
            <input
              name="location"
              value={cv.location}
              onChange={handleChange}
              className="w-full p-2 border rounded bg-gray-50 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              7. Profile Summary
            </label>
            <textarea
              name="summary"
              value={cv.summary}
              onChange={handleChange}
              className="w-full p-2 border rounded bg-gray-50 h-24 text-sm"
            ></textarea>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              8. Career Objective
            </label>
            <textarea
              name="careerObjective"
              value={cv.careerObjective}
              onChange={handleChange}
              className="w-full p-2 border rounded bg-gray-50 h-20 text-sm"
            ></textarea>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              9. Work Authorization
            </label>
            <textarea
              name="workAuthorization"
              value={cv.workAuthorization}
              onChange={handleChange}
              className="w-full p-2 border rounded bg-gray-50 h-16 text-sm"
            ></textarea>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              10. Professional Experience
            </label>
            <textarea
              name="experience"
              value={cv.experience}
              onChange={handleChange}
              className="w-full p-2 border rounded bg-gray-50 h-32 text-sm"
            ></textarea>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              11. Achievement & Recognition
            </label>
            <textarea
              name="achievements"
              value={cv.achievements}
              onChange={handleChange}
              className="w-full p-2 border rounded bg-gray-50 h-24 text-sm"
            ></textarea>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              12. Education
            </label>
            <textarea
              name="education"
              value={cv.education}
              onChange={handleChange}
              className="w-full p-2 border rounded bg-gray-50 h-20 text-sm"
            ></textarea>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              13. Key Skills / Expertise
            </label>
            <textarea
              name="skills"
              value={cv.skills}
              onChange={handleChange}
              className="w-full p-2 border rounded bg-gray-50 h-20 text-sm"
            ></textarea>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              14. Languages
            </label>
            <textarea
              name="languages"
              value={cv.languages}
              onChange={handleChange}
              className="w-full p-2 border rounded bg-gray-50 h-16 text-sm"
            ></textarea>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              15. Interests
            </label>
            <textarea
              name="interests"
              value={cv.interests}
              onChange={handleChange}
              className="w-full p-2 border rounded bg-gray-50 h-16 text-sm"
            ></textarea>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              16. Personal Info
            </label>
            <textarea
              name="personalInfo"
              value={cv.personalInfo}
              onChange={handleChange}
              className="w-full p-2 border rounded bg-gray-50 h-16 text-sm"
            ></textarea>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              17. Closing Statement
            </label>
            <textarea
              name="statement"
              value={cv.statement}
              onChange={handleChange}
              className="w-full p-2 border rounded bg-gray-50 h-16 text-sm"
            ></textarea>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t pb-8">
          <button
            onClick={handlePrintPDF}
            className="w-full bg-slate-900 text-white p-4 rounded-xl font-black text-lg hover:bg-black transition-colors shadow-2xl tracking-wide uppercase"
          >
            Export ke PDF / Print
          </button>
          <p className="text-center text-xs text-gray-500 mt-2 font-semibold">
            Desain 100% Seamless Halaman & Bebas Blank
          </p>
        </div>
      </div>

      {/* KOLOM KANAN: LIVE PREVIEW & EXPORT PDF (ANTI-BLANK LAYOUT) */}
      <div className="w-full md:w-2/3 bg-gray-300 p-8 overflow-y-auto flex justify-center print:w-full print:block print:p-0 print:overflow-visible print:bg-white">
        {/* CONTAINER UTAMA HALAMAN CETAK - Background Dinamis & Print Margin Reset */}
        <div
          id="cv-print-container"
          className={`bg-white shadow-2xl w-[210mm] min-h-[297mm] mx-auto print:w-full print:min-h-0 print:shadow-none print:m-0 ${getBackgroundClass()}`}
        >
          {/* =========================================================
              LAYOUT 2 KOLOM (SIDEBAR KIRI/KANAN & MAIN CONTENT) 
              Digunakan oleh: Template 1, 3, 4, 6, 8, 10, 11, 15
          ========================================================= */}
          {isTwoColumn && (
            <div className="flex w-full">
              {/* SIDEBAR */}
              <div
                className={`w-1/3 flex-shrink-0 p-6 text-white ${
                  template === '11' ? 'order-last' : 'order-first'
                }`}
              >
                {/* Image */}
                <div
                  className={`mx-auto mb-4 overflow-hidden border-2 border-white ${
                    template === '3'
                      ? 'w-28 h-28 rounded-full border-4 border-amber-400'
                      : template === '10'
                      ? 'w-24 h-24 rounded-lg border-cyan-400'
                      : 'w-24 h-24 rounded-full border-amber-500'
                  } ${template === '15' ? 'border-yellow-500' : ''}`}
                >
                  <img
                    src={cv.photo}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Sidebar Data Fields */}
                <div className="space-y-4">
                  <div className="break-inside-avoid">
                    <h3
                      className={`text-[11px] font-bold border-b pb-0.5 mb-1.5 uppercase tracking-wider ${
                        template === '6'
                          ? 'text-teal-300 border-teal-700'
                          : template === '10'
                          ? 'text-cyan-300 border-cyan-700'
                          : template === '15'
                          ? 'text-yellow-400 border-zinc-700'
                          : 'text-amber-400 border-slate-600'
                      }`}
                    >
                      Contact
                    </h3>
                    <p className="text-[10px] mb-0.5 leading-tight">
                      {cv.location}
                    </p>
                    <p className="text-[10px] mb-0.5 leading-tight">
                      {cv.phone}
                    </p>
                    <p className="text-[10px] break-all leading-tight">
                      {cv.email}
                    </p>
                  </div>

                  <div className="break-inside-avoid">
                    <h3
                      className={`text-[11px] font-bold border-b pb-0.5 mb-1.5 uppercase tracking-wider ${
                        template === '6'
                          ? 'text-teal-300 border-teal-700'
                          : template === '10'
                          ? 'text-cyan-300 border-cyan-700'
                          : template === '15'
                          ? 'text-yellow-400 border-zinc-700'
                          : 'text-amber-400 border-slate-600'
                      }`}
                    >
                      Personal Info
                    </h3>
                    <p className="text-[10px] whitespace-pre-line leading-tight">
                      {cv.personalInfo}
                    </p>
                  </div>

                  <div className="break-inside-avoid">
                    <h3
                      className={`text-[11px] font-bold border-b pb-0.5 mb-1.5 uppercase tracking-wider ${
                        template === '6'
                          ? 'text-teal-300 border-teal-700'
                          : template === '10'
                          ? 'text-cyan-300 border-cyan-700'
                          : template === '15'
                          ? 'text-yellow-400 border-zinc-700'
                          : 'text-amber-400 border-slate-600'
                      }`}
                    >
                      Work Auth
                    </h3>
                    <p className="text-[10px] whitespace-pre-line leading-tight">
                      {cv.workAuthorization}
                    </p>
                  </div>

                  <div className="break-inside-avoid">
                    <h3
                      className={`text-[11px] font-bold border-b pb-0.5 mb-1.5 uppercase tracking-wider ${
                        template === '6'
                          ? 'text-teal-300 border-teal-700'
                          : template === '10'
                          ? 'text-cyan-300 border-cyan-700'
                          : template === '15'
                          ? 'text-yellow-400 border-zinc-700'
                          : 'text-amber-400 border-slate-600'
                      }`}
                    >
                      Key Skills
                    </h3>
                    <p className="text-[10px] whitespace-pre-line leading-tight">
                      {cv.skills}
                    </p>
                  </div>

                  <div className="break-inside-avoid">
                    <h3
                      className={`text-[11px] font-bold border-b pb-0.5 mb-1.5 uppercase tracking-wider ${
                        template === '6'
                          ? 'text-teal-300 border-teal-700'
                          : template === '10'
                          ? 'text-cyan-300 border-cyan-700'
                          : template === '15'
                          ? 'text-yellow-400 border-zinc-700'
                          : 'text-amber-400 border-slate-600'
                      }`}
                    >
                      Languages
                    </h3>
                    <p className="text-[10px] whitespace-pre-line leading-tight">
                      {cv.languages}
                    </p>
                  </div>

                  <div className="break-inside-avoid">
                    <h3
                      className={`text-[11px] font-bold border-b pb-0.5 mb-1.5 uppercase tracking-wider ${
                        template === '6'
                          ? 'text-teal-300 border-teal-700'
                          : template === '10'
                          ? 'text-cyan-300 border-cyan-700'
                          : template === '15'
                          ? 'text-yellow-400 border-zinc-700'
                          : 'text-amber-400 border-slate-600'
                      }`}
                    >
                      Interests
                    </h3>
                    <p className="text-[10px] whitespace-pre-line leading-tight">
                      {cv.interests}
                    </p>
                  </div>
                </div>
              </div>

              {/* MAIN CONTENT */}
              <div className="w-2/3 p-8 bg-transparent space-y-4">
                <div className="break-inside-avoid">
                  <h1
                    className={`text-3xl font-black uppercase tracking-tight leading-none mb-1 ${
                      template === '10' ? 'text-cyan-900' : 'text-slate-900'
                    }`}
                  >
                    {cv.fullName}
                  </h1>
                  <p
                    className={`text-xs font-bold uppercase tracking-widest ${
                      template === '6'
                        ? 'text-teal-700'
                        : template === '15'
                        ? 'text-slate-700'
                        : 'text-amber-600'
                    }`}
                  >
                    {cv.jobTitle}
                  </p>
                </div>

                <div className="break-inside-avoid">
                  <h3 className="text-[11px] font-bold text-slate-900 border-b-2 border-slate-300 pb-0.5 mb-1 uppercase tracking-wide">
                    Profile Summary
                  </h3>
                  <p className="text-[11px] text-gray-700 leading-relaxed">
                    {cv.summary}
                  </p>
                </div>

                <div className="break-inside-avoid">
                  <h3 className="text-[11px] font-bold text-slate-900 border-b-2 border-slate-300 pb-0.5 mb-1 uppercase tracking-wide">
                    Career Objective
                  </h3>
                  <p className="text-[11px] text-gray-700 leading-relaxed">
                    {cv.careerObjective}
                  </p>
                </div>

                <div className="break-inside-avoid">
                  <h3 className="text-[11px] font-bold text-slate-900 border-b-2 border-slate-300 pb-0.5 mb-1 uppercase tracking-wide">
                    Professional Experience
                  </h3>
                  <p className="text-[11px] text-gray-700 whitespace-pre-line leading-relaxed">
                    {cv.experience}
                  </p>
                </div>

                <div className="break-inside-avoid">
                  <h3 className="text-[11px] font-bold text-slate-900 border-b-2 border-slate-300 pb-0.5 mb-1 uppercase tracking-wide">
                    Achievement & Recognition
                  </h3>
                  <p className="text-[11px] text-gray-700 whitespace-pre-line leading-relaxed">
                    {cv.achievements}
                  </p>
                </div>

                <div className="break-inside-avoid">
                  <h3 className="text-[11px] font-bold text-slate-900 border-b-2 border-slate-300 pb-0.5 mb-1 uppercase tracking-wide">
                    Education
                  </h3>
                  <p className="text-[11px] text-gray-700 whitespace-pre-line leading-relaxed">
                    {cv.education}
                  </p>
                </div>

                <div className="break-inside-avoid mt-4 pt-3 border-t border-gray-300 text-center">
                  <p className="text-[10px] text-gray-500 italic">
                    {cv.statement}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================
              LAYOUT 1 KOLOM (HEADER ATAS)
              Digunakan oleh: Template 2, 5, 7, 9, 12, 13, 14
          ========================================================= */}
          {!isTwoColumn && (
            <div className="flex flex-col w-full p-8 space-y-4">
              {/* HEADER DINAMIS DENGAN FOTO SUPAYA TIDAK ADA DATA TERABAIKAN! */}
              <div
                className={`w-full flex items-center mb-2 pb-4 break-inside-avoid 
                ${
                  template === '5'
                    ? 'bg-blue-950 text-white p-6 -mx-8 -mt-8 shadow-sm'
                    : ''
                }
                ${template === '7' ? 'border-b-4 border-emerald-700' : ''}
                ${
                  template === '9'
                    ? 'border-y-2 border-yellow-600 py-4 justify-center text-center'
                    : ''
                }
                ${template === '12' ? 'border-l-8 border-slate-900 pl-4' : ''}
                ${
                  template === '13'
                    ? 'bg-slate-950 text-white p-6 -mx-8 -mt-8 gap-6 shadow-sm'
                    : ''
                }
                ${
                  template === '14'
                    ? 'bg-zinc-900 text-white p-6 -mx-8 -mt-8 justify-center text-center shadow-sm'
                    : ''
                }
                ${template === '2' ? 'border-b-2 border-slate-900' : ''}
              `}
              >
                {/* PHOTO INJECTED FOR ALL 1-COLUMN TEMPLATES TO ENSURE 100% SYNCHRONIZATION */}
                <div
                  className={`w-24 h-24 overflow-hidden flex-shrink-0 
                  ${['9', '14'].includes(template) ? 'hidden' : 'mr-6'}
                  ${
                    template === '13'
                      ? 'rounded-full border-2 border-amber-400 bg-slate-900'
                      : 'rounded-full border-2 border-gray-300 shadow-sm'
                  }
                `}
                >
                  <img
                    src={cv.photo}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div
                  className={`${
                    ['5', '7', '12'].includes(template)
                      ? 'flex justify-between items-end w-full'
                      : 'w-full'
                  }`}
                >
                  <div>
                    <h1
                      className={`font-black uppercase tracking-widest leading-none mb-1 ${
                        ['5', '7', '9', '12', '13', '14'].includes(template)
                          ? 'text-3xl'
                          : 'text-2xl'
                      } ${template === '14' ? 'text-amber-400' : ''} ${
                        template === '13' ? 'text-amber-300' : ''
                      }`}
                    >
                      {cv.fullName}
                    </h1>
                    <p
                      className={`text-xs font-bold uppercase ${
                        template === '2'
                          ? 'text-gray-700'
                          : ['5', '13', '14'].includes(template)
                          ? 'text-slate-300'
                          : 'text-amber-600'
                      }`}
                    >
                      {cv.jobTitle}
                    </p>
                  </div>
                  <div
                    className={`text-[10px] mt-2 space-y-0.5 ${
                      ['5', '7', '12'].includes(template) ? 'text-right' : ''
                    } ${
                      ['9', '14', '2'].includes(template) ? 'text-center' : ''
                    } ${template === '5' ? 'text-blue-200' : 'text-gray-600'}`}
                  >
                    <p>
                      {cv.location} | {cv.phone}
                    </p>
                    <p>{cv.email}</p>
                  </div>
                </div>
              </div>

              {/* SEMUA DATA BLOCKS TAMPIL UTUH */}
              <div className="break-inside-avoid">
                <h3
                  className={`text-[11px] font-bold pb-0.5 mb-1 uppercase tracking-wide ${
                    template === '7'
                      ? 'text-emerald-900 bg-emerald-50 p-1'
                      : 'text-slate-900 border-b-2 border-slate-300'
                  }`}
                >
                  Profile Summary
                </h3>
                <p className="text-[11px] text-gray-700 leading-relaxed">
                  {cv.summary}
                </p>
              </div>

              <div className="break-inside-avoid">
                <h3
                  className={`text-[11px] font-bold pb-0.5 mb-1 uppercase tracking-wide ${
                    template === '7'
                      ? 'text-emerald-900 bg-emerald-50 p-1'
                      : 'text-slate-900 border-b-2 border-slate-300'
                  }`}
                >
                  Career Objective
                </h3>
                <p className="text-[11px] text-gray-700 leading-relaxed">
                  {cv.careerObjective}
                </p>
              </div>

              <div className="break-inside-avoid">
                <h3
                  className={`text-[11px] font-bold pb-0.5 mb-1 uppercase tracking-wide ${
                    template === '7'
                      ? 'text-emerald-900 bg-emerald-50 p-1'
                      : 'text-slate-900 border-b-2 border-slate-300'
                  }`}
                >
                  Professional Experience
                </h3>
                <p className="text-[11px] text-gray-700 whitespace-pre-line leading-relaxed">
                  {cv.experience}
                </p>
              </div>

              <div className="break-inside-avoid">
                <h3
                  className={`text-[11px] font-bold pb-0.5 mb-1 uppercase tracking-wide ${
                    template === '7'
                      ? 'text-emerald-900 bg-emerald-50 p-1'
                      : 'text-slate-900 border-b-2 border-slate-300'
                  }`}
                >
                  Achievement & Recognition
                </h3>
                <p className="text-[11px] text-gray-700 whitespace-pre-line leading-relaxed">
                  {cv.achievements}
                </p>
              </div>

              <div className="break-inside-avoid grid grid-cols-2 gap-6">
                <div>
                  <h3
                    className={`text-[11px] font-bold pb-0.5 mb-1.5 uppercase tracking-wide ${
                      template === '7'
                        ? 'text-emerald-900 bg-emerald-50 p-1'
                        : 'text-slate-900 border-b-2 border-slate-300'
                    }`}
                  >
                    Skills & Languages
                  </h3>
                  <p className="text-[11px] text-gray-700 mb-2">
                    <strong>Skills:</strong>
                    <br />
                    {cv.skills}
                  </p>
                  <p className="text-[11px] text-gray-700">
                    <strong>Languages:</strong>
                    <br />
                    {cv.languages}
                  </p>
                </div>
                <div>
                  <h3
                    className={`text-[11px] font-bold pb-0.5 mb-1.5 uppercase tracking-wide ${
                      template === '7'
                        ? 'text-emerald-900 bg-emerald-50 p-1'
                        : 'text-slate-900 border-b-2 border-slate-300'
                    }`}
                  >
                    Auth, Info & Interests
                  </h3>
                  <p className="text-[11px] text-gray-700 mb-2">
                    <strong>Work Auth:</strong> {cv.workAuthorization}
                  </p>
                  <p className="text-[11px] text-gray-700 mb-2">
                    <strong>Info:</strong> {cv.personalInfo}
                  </p>
                  <p className="text-[11px] text-gray-700">
                    <strong>Interests:</strong> {cv.interests}
                  </p>
                </div>
              </div>

              <div className="break-inside-avoid">
                <h3
                  className={`text-[11px] font-bold pb-0.5 mb-1 uppercase tracking-wide ${
                    template === '7'
                      ? 'text-emerald-900 bg-emerald-50 p-1'
                      : 'text-slate-900 border-b-2 border-slate-300'
                  }`}
                >
                  Education
                </h3>
                <p className="text-[11px] text-gray-700 whitespace-pre-line leading-relaxed">
                  {cv.education}
                </p>
              </div>

              <div className="break-inside-avoid mt-4 pt-3 border-t border-gray-300 text-center">
                <p className="text-[10px] text-gray-500 italic">
                  {cv.statement}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
