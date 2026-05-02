import React, { useState } from 'react';
import { ArrowRight, Mail, Globe, MessageCircle, Phone, Menu, X, FileText, Database, Leaf, BarChart3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Star = ({ left, delay, size, duration }: { left: string, delay: number, size: number, duration: number }) => (
  <motion.div
    initial={{ y: "-10vh", opacity: 0, rotate: 0 }}
    animate={{
      y: ["-10vh", "110vh"],
      opacity: [0, 0.4, 0.4, 0],
      rotate: [0, 180]
    }}
    transition={{
      duration: duration,
      repeat: Infinity,
      delay: delay,
      ease: "linear"
    }}
    className="absolute pointer-events-none text-black z-0"
    style={{ left, width: size, height: size }}
  >
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C12 6.627 17.373 12 24 12C17.373 12 12 17.373 12 24C12 17.373 6.627 12 0 12C6.627 12 12 6.627 12 0Z" />
    </svg>
  </motion.div>
);

const FloatingStars = () => {
  const [stars, setStars] = useState<{ id: number, left: string, delay: number, size: number, duration: number }[]>([]);

  React.useEffect(() => {
    const newStars = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 10,
      duration: 15 + Math.random() * 20,
      size: 15 + Math.random() * 25
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map(star => (
        <Star key={star.id} {...star} />
      ))}
    </div>
  );
};

type PageID = 'contact' | 'about' | 'experience' | 'projects' | 'achievement';

const App = () => {
  const [currentPage, setCurrentPage] = useState<PageID>('contact');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems: { id: PageID; label: string }[] = [
    { id: 'contact', label: 'Trang chủ' },
    { id: 'about', label: 'Giới thiệu' },
    { id: 'experience', label: 'Kinh nghiệm' },
    { id: 'projects', label: 'Dự án' },
    { id: 'achievement', label: 'Thành tựu' },
  ];

  return (
    <div className="min-h-screen flex flex-col relative bg-white">
      <FloatingStars />
      {/* Navigation Bar */}
      <nav className="flex justify-between items-center px-6 md:px-10 py-6 relative z-50">
        <button onClick={() => setCurrentPage('contact')} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <img src="/images/logo-2.png" alt="Danny Nhat Logo" className="h-10 md:h-12 object-contain rounded-lg" />
          <span className="text-2xl font-black tracking-tighter hidden sm:inline-block">Danny Nhat.</span>
        </button>
        <div className="flex-1 max-w-xl mx-8 overflow-x-auto no-scrollbar hidden md:block">
          <div className="flex items-center gap-1 bg-gray-50/50 p-1 rounded-full border border-gray-100 w-max">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`relative px-6 py-2 text-[13px] font-bold uppercase tracking-tight transition-colors duration-300 ${currentPage === item.id ? 'text-white' : 'text-gray-500 hover:text-black'}`}
              >
                {currentPage === item.id && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-black rounded-full z-0"
                    transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Liquid Nav for Mobile (Scrollable) */}
        <div className="md:hidden absolute left-0 right-0 top-[100%] bg-white/80 backdrop-blur-md border-b border-gray-100 py-3 overflow-x-auto no-scrollbar flex px-6 gap-2 z-40">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`relative px-4 py-1.5 rounded-full text-[12px] font-bold uppercase tracking-tight whitespace-nowrap transition-all ${currentPage === item.id ? 'bg-black text-white' : 'bg-gray-100 text-gray-500'}`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <a href="tel:0775419990" className="bg-black text-white px-4 md:px-5 py-2 md:py-2.5 rounded-full text-[12px] md:text-[13px] font-medium hover:opacity-80 transition-opacity flex items-center gap-2">
            <Phone size={14} />
            <span className="hidden sm:inline-block">0775419990</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors relative z-[60]"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-white z-[55] flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setIsMenuOpen(false);
                }}
                className={`text-3xl font-black uppercase tracking-tighter ${currentPage === item.id ? 'opacity-100' : 'opacity-40'}`}
              >
                {item.label}
              </button>
            ))}

            <div className="mt-8 flex gap-6">
              <a href="mailto:nhatngovan.work@gmail.com" className="opacity-60 hover:opacity-100 transition-opacity"><Mail size={24} /></a>
              <a href="https://linkedin.com/in/ngo-van-nhat" target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 transition-opacity"><Globe size={24} /></a>
              <a href="https://zalo.me/0775419990" target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 transition-opacity"><MessageCircle size={24} /></a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Render Pages Based on currentPage */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, scale: 1.02, filter: "blur(8px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.98, filter: "blur(8px)" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex-grow flex flex-col w-full origin-top"
        >
          {currentPage === 'contact' && <ContactPage />}
          {currentPage === 'about' && <AboutPage />}
          {currentPage === 'experience' && <ExperiencePage />}
          {currentPage === 'projects' && <ProjectsPage />}
          {currentPage === 'achievement' && <AchievementPage />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// About Page
const AboutPage = () => (
  <main className="flex-grow px-6 md:px-10 py-10 md:py-20">
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-20 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        {/* Left Column: Text */}
        <div className="md:col-span-7">
          <span className="opacity-60 text-[10px] font-bold uppercase tracking-[0.2em]">PORTFOLIO</span>
          <h1 className="text-[40px] sm:text-[56px] md:text-[72px] font-black mt-4 mb-6 uppercase leading-tight">
            Ngô Văn Nhật
          </h1>
          <p className="text-[16px] leading-snug max-w-[320px] opacity-80 font-medium mb-4">Financial & Market Analyst với tư duy dữ liệu sắc bén</p>
          <p className="text-[14px] leading-relaxed max-w-[340px] font-medium opacity-80 mb-8">
            Chuyên biến những con số khô khan thành chiến lược đầu tư hiệu quả.
          </p>

          {/* Contact Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <a href="mailto:danny196nhatt@gmail.com" className="bg-black text-white px-6 py-3 rounded-full font-semibold hover:opacity-80 transition-opacity text-sm inline-block">
              📧 Gửi Email
            </a>
            <a href="https://zalo.me/0775419990" target="_blank" rel="noopener noreferrer" className="border-2 border-black px-6 py-3 rounded-full font-semibold hover:bg-black hover:text-white transition-colors text-sm inline-block">
              💬 0775419990
            </a>
            <a href="https://www.linkedin.com/in/nhat-ngo-van/" target="_blank" rel="noopener noreferrer" className="bg-black text-white px-6 py-3 rounded-full font-semibold hover:opacity-80 transition-opacity text-sm inline-block">
              🔗 LinkedIn
            </a>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-2 text-[14px] opacity-80">
            <p>📞 0775419990</p>
            <p>📍 Ho Chi Minh City</p>
          </div>
        </div>

        {/* Right Column: Image */}
        <div className="md:col-span-5 flex justify-center md:justify-end">
          <div className="w-full max-w-[400px] relative">
            <img
              src="/images/avatar.png"
              alt="Ngô Văn Nhật"
              className="w-full h-auto object-cover rounded-[40px] border-8 border-white shadow-2xl bg-gray-50"
            />
          </div>
        </div>
      </div>

      {/* Objectives */}
      <div>
        <h2 className="text-[40px] font-black text-center mb-12 uppercase">Mục Tiêu Nghề Nghiệp</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Short-term Goals */}
          <div className="bg-gray-50 p-8 rounded-xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-blue-100 p-3 rounded-lg">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-[20px] font-black uppercase">Mục Tiêu Ngắn Hạn</h3>
            </div>
            <ul className="space-y-4 text-[14px] opacity-80">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold mt-1">•</span>
                <span>Ứng dụng Python, SQL, Power BI vào phân tích thị trường.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold mt-1">•</span>
                <span>Hoàn thiện kỹ năng trực quan hóa dữ liệu kinh doanh.</span>
              </li>
            </ul>
          </div>

          {/* Long-term Goals */}
          <div className="border-2 border-blue-200 p-8 rounded-xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-blue-100 p-3 rounded-lg">
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="text-[20px] font-black uppercase">Mục Tiêu Dài Hạn</h3>
            </div>
            <ul className="space-y-4 text-[14px] opacity-80">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold mt-1">•</span>
                <span>Trở thành Market Analyst / Portfolio Manager chuyên nghiệp.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold mt-1">•</span>
                <span>Tôi ưu danh mục đầu tư cho doanh nghiệp/quỹ lớn.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </main>
);

// Experience Page
const ExperiencePage = () => {
  const experiences = [
    {
      company: "Hoa Sen Home",
      companyIcon: "\u{1F3E0}",
      position: "Business Analyst",
      period: "12/2025 - Nay",
      logo: "/images/logo_hsh.jpg",
      responsibilities: [
        "Ph\u00e2n t\u00edch xu h\u01b0\u1edbng th\u1ecb tr\u01b0\u1eddng v\u1eadt li\u1ec7u x\u00e2y d\u1ef1ng v\u00e0 t\u1eadp kh\u00e1ch h\u00e0ng \u0111\u1ec3 h\u1ed7 tr\u1ee3 quy\u1ebft \u0111\u1ecbnh kinh doanh",
        "\u0110\u00e1nh gi\u00e1 hi\u1ec7u qu\u1ea3 kinh doanh v\u00e0 nghi\u00ean c\u1ee9u ph\u00e1t tri\u1ec3n c\u00e1c d\u00f2ng s\u1ea3n ph\u1ea9m chi\u1ebfn l\u01b0\u1ee3c",
        "T\u1ed1i \u01b0u h\u00f3a d\u1eef li\u1ec7u v\u00e0 quy tr\u00ecnh nghi\u1ec7p v\u1ee5 nh\u1eb1m n\u00e2ng cao l\u1ef1c c\u1ea1nh tranh cho h\u1ec7 th\u1ed1ng b\u00e1n l\u1ebb"
      ]
    },
    {
      company: "Concentrix - D\u1ef1 \u00e1n AI c\u1ee7a Avalon",
      companyIcon: "\u{1F916}",
      position: "Data Quality Analyst",
      period: "04/2025 - 11/2025",
      logo: "/images/cnx.png",
      responsibilities: [
        "Hi\u1ec3u s\u00e2u v\u1ec1 quy tr\u00ecnh \u0111\u00e0o t\u1ea1o AI v\u00e0 x\u1eed l\u00fd d\u1eef li\u1ec7u hu\u1ea5n luy\u1ec7n (Training Data)",
        "Th\u1ef1c hi\u1ec7n Data Pre-processing & Quality Control: chu\u1ea9n h\u00f3a d\u1eef li\u1ec7u h\u00ecnh \u1ea3nh v\u00e0 ng\u00f4n ng\u1eef",
        "Qu\u1ea3n l\u00fd v\u00e0 v\u1eadn h\u00e0nh s\u1ea3n BPO, ho\u00e0n th\u00e0nh KPI li\u00ean t\u1ee5c trong 6 th\u00e1ng",
        "N\u00e2ng c\u1ea5p k\u1ef9 n\u0103ng l\u00e0m vi\u1ec7c nh\u00f3m \u0111\u1ec3 gi\u1ea3i quy\u1ebft v\u1ea5n \u0111\u1ec1 Big Data"
      ]
    },
    {
      company: "The Bullish Alliance",
      companyIcon: "\u{1F4C8}",
      position: "Trader & Admin",
      period: "10/2024 - 04/2025",
      logo: "/images/exp-trader.PNG",
      responsibilities: [
        "Qu\u1ea3n l\u00fd & ph\u00e2n t\u00edch d\u1eef li\u1ec7u th\u1ecb tr\u01b0\u1eddng (Forex & Commodity)",
        "X\u00e2y d\u1ef1ng chi\u1ebfn l\u01b0\u1ee3c trading gi\u00fap qu\u1ef9 t\u0103ng +300% ROI trong 4 th\u00e1ng",
        "Ph\u00e1t tri\u1ec3n c\u1ed9ng \u0111\u1ed3ng \u0111\u1ea7u t\u01b0 l\u00ean 1.200+ followers v\u00e0 40.000 l\u01b0\u1ee3t xem",
        "Tham gia qu\u1ea3n l\u00fd qu\u1ef9: x\u00e2y d\u1ef1ng chi\u1ebfn l\u01b0\u1ee3c ph\u00e2n b\u1ed5 v\u1ed1n & ki\u1ec3m so\u00e1t r\u1ee7i ro"
      ]
    },
    {
      company: "MindX Technology School",
      companyIcon: "\u{1F4BB}",
      position: "H\u1ecdc vi\u00ean & Th\u1ef1c t\u1eadp d\u1ef1 \u00e1n",
      period: "11/2024 - 02/2025",
      logo: "/images/mindx.png",
      responsibilities: [
        "D\u1ef1 \u00e1n 1: Dashboard ph\u00e2n t\u00edch doanh s\u1ed1 SME, x\u00e1c \u0111\u1ecbnh l\u0129nh v\u1ef1c \u0111\u1ea7u t\u01b0 ti\u1ec1m n\u0103ng",
        "D\u1ef1 \u00e1n 2: Dashboard t\u1ed1i \u01b0u chi\u1ebfn l\u01b0\u1ee3c truy\u1ec1n th\u00f4ng tr\u00ean s\u00e0n TMDT",
        "D\u1ef1 \u00e1n 3: X\u00e2y d\u1ef1ng m\u00f4 h\u00ecnh Machine Learning d\u1ef1 b\u00e1o hi\u1ec7u su\u1ea5t m\u1ea1ng vi\u00ean th\u00f4ng"
      ]
    },
    {
      company: "CLB Calisthenics and Gym - UEF",
      companyIcon: "\u{1F4AA}",
      position: "Leader Coach",
      period: "01/2023 - 02/2025",
      logo: "/images/exp-coach.jpg",
      responsibilities: [
        "L\u00e3nh \u0111\u1ea1o v\u00e0 v\u1eadn h\u00e0nh c\u00e2u l\u1ea1c b\u1ed9 v\u1edbi 50 th\u00e0nh vi\u00ean",
        "T\u1ed5ng h\u1ee3p, ph\u00e2n t\u00edch d\u1eef li\u1ec7u th\u00e0nh vi\u00ean \u0111\u1ec3 \u0111\u01b0a ra l\u1ecbch tr\u00ecnh t\u1eadp luy\u1ec7n ph\u00f9 h\u1ee3p",
        "T\u1ed5 ch\u1ee9c c\u00e1c ho\u1ea1t \u0111\u1ed9ng v\u00e0 s\u1ef1 ki\u1ec7n cho c\u00e2u l\u1ea1c b\u1ed9"
      ]
    },
    {
      company: "Khoa Qu\u1ea3n tr\u1ecb Kinh doanh (FBA) - UEF",
      companyIcon: "\u{1F3A8}",
      position: "Designer & Media Team",
      period: "2022 - 2023",
      logo: "/images/exp-designer.jpg",
      responsibilities: [
        "Thi\u1ebft k\u1ebf c\u00e1c \u1ea5n ph\u1ea9m truy\u1ec1n th\u00f4ng (Poster, Banner, Standee) cho c\u00e1c s\u1ef1 ki\u1ec7n l\u1edbn c\u1ee7a Khoa",
        "Qu\u1ea3n l\u00fd h\u00ecnh \u1ea3nh v\u00e0 x\u00e2y d\u1ef1ng th\u01b0\u01a1ng hi\u1ec7u visual cho Fanpage khoa FBA",
        "Ph\u1ed1i h\u1ee3p v\u1edbi ban t\u1ed5 ch\u1ee9c \u0111\u1ec3 l\u00ean \u00fd t\u01b0\u1edfng concept h\u00ecnh \u1ea3nh cho c\u00e1c ch\u01b0\u01a1ng tr\u00ecnh sinh vi\u00ean"
      ]
    }
  ];

  return (
    <main className="flex-grow px-6 md:px-10 py-20">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.25em] text-gray-400 mb-4">Kinh nghiệm làm việc</span>
          <h1 className="text-[36px] sm:text-[48px] md:text-[64px] font-black leading-[1.05] uppercase tracking-tight">
            Hành trình<br />Sự Nghiệp
          </h1>
          <p className="text-[14px] opacity-60 mt-4">Sự kết hợp giữa tư duy phân tích dữ liệu và kinh nghiệm thực chiến.</p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center timeline line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 transform -translate-x-1/2 hidden md:block" />

          {experiences.map((exp, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div key={index} className="relative mb-12 md:mb-8">
                {/* Card */}
                <div className={`md:w-[calc(50%-32px)] ${isLeft ? 'md:mr-auto' : 'md:ml-auto'}`}>
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                    {/* Large Logo Image */}
                    <div className="w-full aspect-[16/10] bg-gray-50 flex items-center justify-center p-6">
                      <img
                        src={exp.logo}
                        alt={exp.company}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>

                    {/* Card Body */}
                    <div className="p-6">
                      {/* Company Tag */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-sm">{exp.companyIcon}</span>
                        <span className="text-[13px] font-semibold text-gray-800">{exp.company}</span>
                      </div>

                      {/* Position + Period */}
                      <div className="flex items-baseline justify-between gap-3 mb-4">
                        <h3 className="text-[16px] font-bold text-gray-900">{exp.position}</h3>
                        <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full whitespace-nowrap">{exp.period}</span>
                      </div>

                      {/* Responsibilities */}
                      <ul className="space-y-2">
                        {exp.responsibilities.map((resp, i) => (
                          <li key={i} className="text-gray-600 text-[13px] leading-relaxed flex items-start gap-2">
                            <span className="text-blue-500 font-bold mt-0.5 flex-shrink-0">{'\u2022'}</span>
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Timeline Dot */}
                <div className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="w-3 h-3 rounded-full bg-white border-2 border-blue-500 shadow-sm" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

// Projects Page
const ProjectsPage = () => {
  const projects = [
    {
      id: 1,
      title: "Dự đoán hiệu suất mạng 4G & phát hiện bất thường bằng Machine Learning",
      description: "Ứng dụng dữ liệu viễn thông thực tế để dự đoán tốc độ truy cập người dùng và xác định các yếu tố ảnh hưởng chính.",
      longDescription: "Hệ thống giúp phát hiện sớm các bất thường trong mạng, hỗ trợ tối ưu hóa vận hành và cải thiện trải nghiệm khách hàng.",
      tags: ["Machine Learning", "CatBoost", "Random Forest", "Isolation Forest", "Python"],
      caseStudy: {
        problem: "Nhà mạng gặp nhiều khiếu nại về tốc độ 4G nhưng không xác định được nguyên nhân chính.",
        solution: [
          "Xử lý & làm sạch dữ liệu viễn thông thực tế",
          "Chọn feature quan trọng bằng Random Forest",
          "Xây dựng model dự đoán với CatBoost (R² ~0.59)",
          "Phát hiện bất thường bằng Isolation Forest"
        ],
        result: [
          "Xác định các yếu tố ảnh hưởng chính đến throughput",
          "Dự đoán hiệu suất với sai số ~5%",
          "Phát hiện sớm các điểm mạng bất thường"
        ]
      },
      pdfUrl: "/docs/project-4g-performance.pdf", // Đường dẫn file PDF
      icon: <Database className="text-blue-600" size={24} />
    },
    {
      id: 2,
      title: "Mặt nạ sinh học từ vi tảo Spirulina & mô hình kinh tế tuần hoàn",
      description: "Ứng dụng mô hình kinh tế tuần hoàn kết hợp xử lý khí thải CO₂ và nuôi cấy vi tảo Spirulina để sản xuất mặt nạ sinh học.",
      longDescription: "Giải pháp hướng đến làm đẹp bền vững, giảm thiểu tác động môi trường và tối ưu tài nguyên.",
      tags: ["Sustainability", "Circular Economy", "Biotech", "Green Tech"],
      caseStudy: {
        problem: "Ngành làm đẹp tạo ra lượng lớn rác thải và chưa tận dụng hiệu quả nguồn khí thải CO₂ từ công nghiệp.",
        solution: [
          "Thu hồi CO₂ từ khí thải nhà máy",
          "Nuôi cấy vi tảo Spirulina bằng CO₂ tái sử dụng",
          "Sản xuất mặt nạ sinh học giàu dinh dưỡng",
          "Tái chế phụ phẩm thành phân bón hữu cơ"
        ],
        result: [
          "Tạo ra sản phẩm làm đẹp thân thiện môi trường",
          "Giảm thiểu khí thải và chất thải rắn",
          "Xây dựng mô hình kinh tế tuần hoàn khả thi",
          "Mở ra tiềm năng thương mại trong mỹ phẩm xanh"
        ]
      },
      pdfUrl: "/docs/project-bio-mask.pdf",
      icon: <Leaf className="text-green-600" size={24} />
    },
    {
      id: 3,
      title: "Phân tích hành vi mua hàng qua Livestream E-commerce (Gen Z)",
      description: "Nghiên cứu định lượng nhằm xác định các yếu tố ảnh hưởng đến ý định mua hàng của Gen Z trong bối cảnh livestream thương mại điện tử.",
      longDescription: "Sử dụng mô hình PLS-SEM để đánh giá vai trò trung gian của niềm tin và các yếu tố tâm lý hành vi.",
      tags: ["Quantitative Research", "PLS-SEM", "SmartPLS 4", "Consumer Behavior", "Gen Z"],
      caseStudy: {
        problem: "Livestream commerce phát triển nhanh nhưng thiếu nghiên cứu toàn diện về hành vi người dùng và niềm tin.",
        solution: [
          "Xây dựng mô hình nghiên cứu dựa trên TAM & TPB",
          "Khảo sát thực tế 263 người dùng Gen Z tại TP.HCM",
          "Phân tích dữ liệu bằng SmartPLS 4 (PLS-SEM)",
          "Đánh giá đa chiều: Credibility, Interaction, Enjoyment..."
        ],
        result: [
          "Mô hình giải thích 72.2% hành vi mua hàng (R² = 0.722)",
          "Niềm tin (Trust) là yếu tố trung gian cốt lõi",
          "Streamer Credibility ảnh hưởng mạnh nhất đến Trust",
          "Xác định Subjective Norm là yếu tố tác động trực tiếp hàng đầu"
        ]
      },
      pdfUrl: "/docs/project-livestream-genz.pdf",
      icon: <BarChart3 className="text-purple-600" size={24} />
    }
  ];

  return (
    <main className="flex-grow px-6 md:px-10 py-10 md:py-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.25em] text-gray-400 mb-4">Case Studies</span>
          <h1 className="text-[48px] md:text-[64px] font-black leading-[1.05] uppercase tracking-tight">
            Dự án <br /> Phân tích & AI
          </h1>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white border border-gray-100 rounded-[32px] p-8 shadow-sm hover:shadow-xl transition-all duration-500 group"
            >
              {/* Top Row: Icon & Link */}
              <div className="flex justify-between items-start mb-8">
                <div className="bg-gray-50 p-4 rounded-2xl group-hover:scale-110 transition-transform">
                  {project.icon}
                </div>
                <a 
                  href={project.pdfUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-black text-white px-5 py-2.5 rounded-full text-[12px] font-bold flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                  <FileText size={14} />
                  XEM CHI TIẾT (PDF)
                </a>
              </div>

              {/* Content */}
              <h3 className="text-2xl font-black uppercase mb-4 leading-tight">{project.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {project.description} {project.longDescription}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map((tag, i) => (
                  <span key={i} className="text-[10px] font-bold uppercase tracking-wider bg-gray-50 text-gray-500 px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Mini Case Study Section */}
              <div className="space-y-6 bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-widest text-red-500 mb-2">● BÀI TOÁN</h4>
                  <p className="text-[13px] font-medium text-gray-800">{project.caseStudy.problem}</p>
                </div>
                
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-widest text-blue-500 mb-2">● GIẢI PHÁP</h4>
                  <ul className="space-y-1.5">
                    {project.caseStudy.solution.map((item, i) => (
                      <li key={i} className="text-[13px] font-medium text-gray-700 flex items-start gap-2">
                        <span className="text-blue-400 mt-1">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-widest text-green-500 mb-2">● KẾT QUẢ</h4>
                  <ul className="space-y-1.5">
                    {project.caseStudy.result.map((item, i) => (
                      <li key={i} className="text-[13px] font-bold text-gray-900 flex items-start gap-2">
                        <span className="text-green-500 mt-1">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
};

// Achievement Page
const AchievementPage = () => {
  const achievements = [
    {
      icon: "📰",
      title: "Đăng tập chí quốc tế JDI",
      date: "2025",
      description: "Bài nghiên cứu được đăng trên tạp chí JDI của UEF (Chủ đề: Gen Z & Livestream Trust).",
      iconBg: "bg-blue-100",
      iconBorder: "border-blue-300",
      image: "/images/jdi.jpg"
    },
    {
      icon: "⭐",
      title: "Giải Ba NCKH cấp Bộ",
      date: "11/2025",
      description: "Thành tích nghiên cứu khoa học cấp Bộ Giáo dục & Đào tạo.",
      iconBg: "bg-red-100",
      iconBorder: "border-red-300",
      image: "/images/NCKH_Cấp bộ.jpg"
    },
    {
      icon: "🏆",
      title: "Giải thưởng Nghiên cứu Ứng dụng Tiềm năng RICUP",
      date: "10/2025",
      description: "Giải thưởng vinh danh các nghiên cứu có tính thực tiễn cao tại cuộc thi RICUP.",
      iconBg: "bg-orange-100",
      iconBorder: "border-orange-300",
      image: "/images/ach-ricup.JPG"
    },
    {
      icon: "📚",
      title: "Giải Nhì NCKH cấp trường",
      date: "05/2025",
      description: "Đề tài nghiên cứu khoa học xuất sắc cấp Đại học UEF.",
      iconBg: "bg-purple-100",
      iconBorder: "border-purple-300",
      image: "/images/ach-nckh-truong.JPG"
    },
    {
      icon: "🌍",
      title: "Hội thảo Quốc tế Kinh tế Số & Hội nhập",
      date: "04/2025",
      description: "Tham gia và đóng góp tại hội thảo quốc tế về các xu hướng kinh tế số.",
      iconBg: "bg-teal-100",
      iconBorder: "border-teal-300",
      image: "/images/ach-hoithao.jpeg"
    },
    {
      icon: "🥉",
      title: "Quý quân Strategist Pro",
      date: "06/2024",
      description: "Cuộc thi phân tích dữ liệu (DATA) tại Đại Học Kinh Tế Tài Chính TP.HCM.",
      iconBg: "bg-yellow-100",
      iconBorder: "border-yellow-300",
      image: "/images/ach-strategist.jpg"
    },
    {
      icon: "🎯",
      title: "Giải Nhất 3 cuộc thi Data MindX",
      date: "2024",
      description: "Chiến thắng thuyết phục tại các kỳ Final Test lớp D4E74 và B158.",
      iconBg: "bg-green-100",
      iconBorder: "border-green-300",
      image: "/images/mindx-2.png"
    },
    {
      icon: "👥",
      title: "Sinh viên 5 tốt cấp trường",
      date: "01/2024",
      description: "Danh hiệu cao quý nhân sự xuất sắc toàn diện trong học tập và rèn luyện.",
      iconBg: "bg-indigo-100",
      iconBorder: "border-indigo-300",
      image: "/images/ach-sv5tot.JPG"
    }
  ];

  return (
    <main className="flex-grow px-6 md:px-10 py-20">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.25em] text-gray-400 mb-4">Thành tựu & Giải thưởng</span>
          <h1 className="text-[36px] sm:text-[48px] md:text-[64px] font-black leading-[1.05] uppercase tracking-tight">
            Những Cột Mốc<br />Quan Trọng
          </h1>
          <p className="text-[14px] opacity-60 mt-4">Từ mới nhất đến cũ hơn</p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center timeline line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 transform -translate-x-1/2 hidden md:block" />

          {achievements.map((achievement, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div key={index} className="relative mb-8 md:mb-12">
                {/* Card */}
                <div className={`md:w-[calc(50%-32px)] ${isLeft ? 'md:mr-auto' : 'md:ml-auto'}`}>
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    {/* Icon + Title + Date */}
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-full ${achievement.iconBg} ${achievement.iconBorder} border-2 flex items-center justify-center flex-shrink-0`}>
                        <span className="text-lg">{achievement.icon}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-[15px] font-bold text-gray-900 leading-snug">{achievement.title}</h3>
                        <span className="inline-block mt-1 text-[11px] font-semibold text-green-700 bg-green-100 px-2.5 py-0.5 rounded-full">{achievement.date}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-[13px] leading-relaxed ml-[52px] mb-4">{achievement.description}</p>

                    {/* Image - Always visible */}
                    <div className="ml-[52px]">
                      <img
                        src={achievement.image}
                        alt={achievement.title}
                        className="w-full rounded-xl object-cover shadow-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Timeline Dot */}
                <div className="hidden md:flex absolute left-1/2 top-0 bottom-0 transform -translate-x-1/2 z-0 pt-10">
                   <div className="w-3 h-3 rounded-full bg-white border-2 border-blue-500 shadow-sm relative z-10" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary Stats */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-6 rounded-2xl text-center">
            <h3 className="text-[40px] font-black text-blue-600 mb-2">3+</h3>
            <p className="font-bold text-[13px] text-gray-700 uppercase">Giải thưởng NCKH</p>
          </div>
          <div className="bg-green-50 p-6 rounded-2xl text-center">
            <h3 className="text-[40px] font-black text-green-600 mb-2">1</h3>
            <p className="font-black text-[14px] text-gray-800 uppercase">Bài đăng tập chí quốc tế</p>
          </div>
          <div className="bg-purple-50 p-6 rounded-xl text-center">
            <h3 className="text-[40px] font-black text-purple-600 mb-2">5+</h3>
            <p className="font-black text-[14px] text-gray-800 uppercase">Giải thưởng thi đấu & hội thảo</p>
          </div>
        </div>
      </div>
    </main>
  );
};

// Contact Page - Now the main home page
const ContactPage = () => (
  <>
    {/* Hero Section */}
    <main className="flex-grow grid grid-cols-1 md:grid-cols-12 px-6 md:px-10 pt-6 md:pt-10 relative overflow-hidden">

      {/* Left Column */}
      <div className="md:col-span-4 z-10 space-y-8 md:space-y-12">
        <div className="space-y-6">
          <h1 className="text-[36px] sm:text-[48px] md:text-[64px] font-black uppercase leading-[1.05] tracking-tight">
            BIẾN DỮ LIỆU <br /> THÀNH <br /> CHIẾN LƯỢC.
          </h1>
          <p className="text-[16px] leading-snug max-w-[280px] opacity-80 font-medium">
            Biến những con số khô khan thành thông tin đầu tư sắc bén và tăng trưởng kinh doanh bền vững.
          </p>
          <a href="https://zalo.me/0775419990" target="_blank" rel="noopener noreferrer" className="bg-black text-white px-6 py-3.5 rounded-full flex items-center gap-4 group w-max">
            <span className="text-sm font-medium">Liên hệ ngay</span>
            <div className="bg-white text-black rounded-full p-1 group-hover:translate-x-1 transition-transform">
              <ArrowRight size={16} />
            </div>
          </a>
        </div>

        <div className="pt-6 md:pt-16 space-y-6">
          <p className="text-[14px] leading-relaxed max-w-[300px] font-medium opacity-80">
            Tôi là Chuyên gia Thị trường đồng hành cùng doanh nghiệp tối ưu hóa doanh số thông qua trực quan hóa dữ liệu, quản trị rủi ro và nghiên cứu thị trường cạnh tranh.
          </p>
          <div className="flex gap-5 opacity-80">
            {/* Email */}
            <a href="mailto:nhatngovan.work@gmail.com" className="hover:opacity-100 transition-opacity cursor-pointer" title="Email">
              <Mail size={20} />
            </a>
            {/* LinkedIn */}
            <a href="https://linkedin.com/in/ngo-van-nhat" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity cursor-pointer" title="LinkedIn">
              <Globe size={20} />
            </a>
            {/* Zalo */}
            <a href="https://zalo.me/0775419990" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity cursor-pointer" title="Zalo">
              <MessageCircle size={20} />
            </a>
            {/* Phone */}
            <a href="tel:0775419990" className="hover:opacity-100 transition-opacity cursor-pointer" title="Phone">
              <Phone size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Center: Video Frame */}
      <div className="md:col-span-4 relative flex justify-center items-end mt-10 md:mt-0 z-20 pointer-events-none">
        <div className="w-full max-w-[380px] aspect-[4/5] md:h-[550px] relative">
          {/* Hero Video - 3D Pop-out Effect */}
          <video
            src="/images/intro.MP4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-contain transform scale-105 origin-bottom mix-blend-darken"
          />
        </div>
      </div>

      {/* Right Column: Contact Info -> Replaced by Impressive Stats */}
      <div className="md:col-span-4 z-10 flex flex-col justify-between py-4 mt-8 md:mt-0">
        <div className="text-left md:text-right space-y-3">
          <h2 className="text-[28px] sm:text-[32px] md:text-[40px] font-black tracking-tighter uppercase leading-none">
            +300% <br /> LỢI NHUẬN ROI.
          </h2>
          <p className="text-[14px] leading-snug max-w-[260px] md:ml-auto opacity-80 font-medium">
            Đạt được thông qua phân bổ vốn kỷ luật và phân tích kỹ thuật nâng cao trong thị trường hàng hóa toàn cầu.
          </p>
        </div>

        <div className="text-left md:text-right space-y-3 pb-8 md:pb-16 mt-8 md:mt-0">
          <h2 className="text-[28px] sm:text-[32px] md:text-[40px] font-black tracking-tighter uppercase leading-none">
            3+ GIẢI THƯỞNG <br /> QUỐC GIA.
          </h2>
          <p className="text-[14px] leading-snug max-w-[260px] md:ml-auto opacity-80 font-medium">
            Các nghiên cứu đạt giải thưởng về xu hướng thị trường và chiến lược dữ liệu, được Bộ Giáo dục và các tổ chức hàng đầu công nhận.
          </p>
        </div>
      </div>
    </main>

    {/* Bottom Bar: Partner Strip */}
    <div className="border-t border-gray-100 py-8 overflow-hidden bg-white relative">
      {/* Subtle fade effect on edges */}
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />
      
      <div className="flex animate-marquee whitespace-nowrap">
        {[1, 2, 3, 4].map((set) => (
          <div key={set} className="flex items-center">
            <PartnerItem name="HOA SEN HOME" />
            <PartnerItem name="THE BULLISH ALLIANCE" />
            <PartnerItem name="CONCENTRIX" />
            <PartnerItem name="MINDX" />
            <PartnerItem name="UEF" />
            <PartnerItem name="PYTHON &amp; SQL" />
          </div>
        ))}
      </div>
    </div>
  </>
);

const PartnerItem = ({ name }: { name: string }) => (
  <div className="flex items-center px-10 md:px-16">
    <span className="text-[18px] md:text-[24px] font-black tracking-tight uppercase text-gray-900">{name}</span>
    <span className="ml-10 md:ml-16 opacity-10 font-black text-2xl">|</span>
  </div>
);

export default App;