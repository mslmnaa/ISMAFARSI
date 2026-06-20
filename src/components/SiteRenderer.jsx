import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, ArrowRight, Filter, CheckCircle, BookOpen, Users, Target, Lightbulb, MapPin, Building2, Mail, Phone, FileText } from 'lucide-react';
import Button from './Button';
import Card from './Card';
import Modal from './Modal';
import StatCounter from './StatCounter';
import { useContent } from '../context/ContentContext';

const iconMap = { BookOpen, Users, Target, Lightbulb, FileText };

const SectionTitle = ({ title, subtitle }) => (
  <div className="max-w-6xl mx-auto text-center">
    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">{title}</h1>
    <p className="text-lg text-gray-600 dark:text-gray-400">{subtitle}</p>
  </div>
);

const HomePage = () => {
  const { content } = useContent();
  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } };

  return (
    <div className="overflow-hidden">
      <section className="relative min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50 dark:from-dark-bg dark:via-dark-card dark:to-dark-bg flex items-center justify-center px-4">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-primary-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-5" />
          <div className="absolute bottom-20 left-10 w-72 h-72 bg-primary-700 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-5" />
        </div>

        <motion.div className="relative max-w-4xl mx-auto text-center z-10" variants={containerVariants} initial="hidden" animate="visible">
          <motion.div variants={itemVariants} className="inline-block mb-6">
            <span className="px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-700/20 text-primary-700 dark:text-primary-50 text-sm font-semibold">{content.home.badge}</span>
          </motion.div>
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"><span className="text-primary-700 dark:text-primary-50">{content.home.title}</span></motion.h1>
          <motion.p variants={itemVariants} className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-2">{content.home.subtitle}</motion.p>
          <motion.p variants={itemVariants} className="text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">{content.home.description}</motion.p>
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            {content.home.ctas.map((cta) => <Button key={cta.label} variant={cta.variant} size="lg">{cta.label}</Button>)}
          </motion.div>
        </motion.div>
      </section>

      <section className="py-20 px-4 bg-white dark:bg-dark-bg">
        <div className="max-w-6xl mx-auto">
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            {content.stats.map((stat, index) => (
              <motion.div key={index} className="text-center" initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.1, duration: 0.6 }} viewport={{ once: true }}>
                <StatCounter end={Number.parseInt(stat.value, 10) || 0} duration={2} />
                <p className="text-gray-600 dark:text-gray-400 text-lg mt-3">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50 dark:bg-dark-card">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">{content.home.commitmentsTitle}</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{content.home.commitmentsSubtitle}</p>
          </motion.div>
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {content.home.commitments.map((feature, index) => {
              const Icon = iconMap[feature.icon] || Users;
              return (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="h-full">
                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-700/20 rounded-lg flex items-center justify-center mb-4"><Icon className="w-6 h-6 text-primary-700" /></div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 bg-primary-700 dark:bg-primary-700/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-bold text-white dark:text-white mb-6">Bergabunglah dengan {content.site.brandName}</h2>
            <p className="text-xl text-primary-50 dark:text-gray-300 mb-8 max-w-2xl mx-auto">Jadilah bagian dari gerakan mahasiswa farmasi terbesar di Indonesia dan berkontribusi untuk kemajuan profesi farmasi nasional.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg">Pelajari Lebih Lanjut</Button>
              <Button variant="ghost" size="lg" className="text-white hover:text-white">Hubungi Kami</Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

const SelayangPage = () => {
  const { content } = useContent();
  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg">
      <section className="pt-24 pb-12 px-4 bg-gradient-to-b from-primary-50 to-white dark:from-dark-card dark:to-dark-bg"><SectionTitle title={content.selayang.headerTitle} subtitle={content.selayang.headerSubtitle} /></section>
      <section className="py-20 px-4"><div className="max-w-4xl mx-auto"><motion.div className="mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}><h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3"><BookOpen className="text-primary-700" />Sejarah ISMAFARSI</h2><div className="space-y-6 text-gray-700 dark:text-gray-300">{content.selayang.historyParagraphs.map((paragraph, index) => <motion.p key={index} className="text-lg leading-relaxed" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: index * 0.1 }} viewport={{ once: true }}>{paragraph}</motion.p>)}</div></motion.div></div></section>
      <section className="py-20 px-4 bg-gray-50 dark:bg-dark-card"><div className="max-w-6xl mx-auto"><motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}><motion.div variants={itemVariants}><Card className="h-full"><div className="flex items-center gap-3 mb-4"><Target className="w-8 h-8 text-primary-700" /><h3 className="text-2xl font-bold text-gray-900 dark:text-white">{content.selayang.visionTitle}</h3></div><p className="text-gray-700 dark:text-gray-300 leading-relaxed">{content.selayang.visionDescription}</p></Card></motion.div><motion.div variants={itemVariants}><Card className="h-full"><div className="flex items-center gap-3 mb-4"><Lightbulb className="w-8 h-8 text-primary-700" /><h3 className="text-2xl font-bold text-gray-900 dark:text-white">{content.selayang.cabinetVisionTitle}</h3></div><p className="text-gray-700 dark:text-gray-300 leading-relaxed">{content.selayang.cabinetVisionDescription}</p></Card></motion.div></motion.div></div></section>
      <section className="py-20 px-4"><div className="max-w-6xl mx-auto"><motion.div className="mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}><h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3"><Users className="text-primary-700" />Misi ISMAFARSI</h2><p className="text-gray-600 dark:text-gray-400 mb-8">{content.selayang.missionIntro}</p><motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>{content.selayang.missions.map((mission, idx) => <motion.div key={idx} variants={itemVariants}><Card className="h-full"><div className="w-10 h-10 rounded-full bg-primary-700 text-white flex items-center justify-center font-bold mb-4">{mission.num}</div><h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{mission.title}</h4><p className="text-gray-600 dark:text-gray-400">{mission.desc}</p></Card></motion.div>)}</motion.div></motion.div></div></section>
      <section className="py-20 px-4 bg-gray-50 dark:bg-dark-card"><div className="max-w-6xl mx-auto"><motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}><h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{content.selayang.cabinetMissionTitle}</h2><p className="text-gray-600 dark:text-gray-400 mb-8">{content.selayang.cabinetMissionIntro}</p><motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>{content.selayang.cabinetMissions.map((mission, idx) => <motion.div key={idx} variants={itemVariants}><Card><div className="flex items-start gap-4"><div className="w-6 h-6 rounded-full bg-primary-700 text-white flex items-center justify-center flex-shrink-0 mt-1 font-bold text-sm">✓</div><p className="text-gray-700 dark:text-gray-300">{mission}</p></div></Card></motion.div>)}</motion.div></motion.div></div></section>
    </div>
  );
};

const KabinetPage = () => {
  const { content } = useContent();
  const [selectedMember, setSelectedMember] = useState(null);
  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg">
      <section className="pt-24 pb-12 px-4 bg-gradient-to-b from-primary-50 to-white dark:from-dark-card dark:to-dark-bg"><SectionTitle title={content.kabinet.headerTitle} subtitle={content.kabinet.headerSubtitle} /></section>
      <section className="py-16 px-4 bg-gray-50 dark:bg-dark-card"><div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8"><Card hover={false}><h3 className="text-2xl font-bold text-primary-700 mb-4">Visi</h3><p className="text-gray-700 dark:text-gray-300 leading-relaxed">{content.kabinet.visi}</p></Card><Card hover={false}><h3 className="text-2xl font-bold text-primary-700 mb-4">Misi</h3><ul className="space-y-2">{content.kabinet.misi.map((mission, index) => <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300"><span className="text-primary-600 font-bold mt-1">•</span><span>{mission}</span></li>)}</ul></Card></div></section>
      <section className="py-20 px-4"><div className="max-w-6xl mx-auto"><motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}><h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Anggota Kabinet</h2><p className="text-gray-600 dark:text-gray-400">{content.kabinet.intro}</p></motion.div><motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>{content.kabinet.members.map((member) => <motion.div key={member.id} variants={itemVariants} onClick={() => setSelectedMember(member)} className="cursor-pointer"><Card className="overflow-hidden h-full"><div className="relative"><div className="w-full h-64 bg-gray-300 dark:bg-gray-600 overflow-hidden rounded-lg mb-4"><img src={member.photo} alt={member.name} className="w-full h-full object-cover" /></div><div className="absolute top-4 right-4 bg-primary-700 text-white px-3 py-1 rounded-full text-xs font-semibold">{member.position}</div></div><h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{member.name}</h3><div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4"><CheckCircle className="w-4 h-4 text-primary-600" />{member.institution}</div><p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">{member.description}</p><button className="w-full py-2 px-4 rounded-lg bg-primary-50 dark:bg-primary-700/20 text-primary-700 dark:text-primary-50 font-semibold hover:bg-primary-100 dark:hover:bg-primary-700/30 transition-smooth text-sm">Lihat Detail</button></Card></motion.div>)}</motion.div></div></section>
      <Modal isOpen={selectedMember !== null} onClose={() => setSelectedMember(null)} title={selectedMember?.name} size="lg">{selectedMember && <div className="flex gap-8"><div className="w-48 flex-shrink-0"><img src={selectedMember.photo} alt={selectedMember.name} className="w-full rounded-lg" /></div><div className="flex-1"><div className="mb-6"><span className="inline-block px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-700/20 text-primary-700 dark:text-primary-50 font-semibold text-sm mb-4">{selectedMember.position}</span><div className="space-y-3 text-gray-700 dark:text-gray-300"><div className="flex items-center gap-2"><MapPin className="w-5 h-5 text-primary-600" /><span>{selectedMember.institution}</span></div></div></div><p className="text-gray-700 dark:text-gray-300 leading-relaxed">{selectedMember.description}</p></div></div>}</Modal>
    </div>
  );
};

const ProgramPage = () => {
  const { content } = useContent();
  const [selectedDept, setSelectedDept] = useState(null);
  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
  const filteredDepartments = selectedDept ? content.programKerja.departments.filter((department) => department.id === selectedDept) : content.programKerja.departments;

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg">
      <section className="pt-24 pb-12 px-4 bg-gradient-to-b from-primary-50 to-white dark:from-dark-card dark:to-dark-bg"><SectionTitle title={content.programKerja.headerTitle} subtitle={content.programKerja.headerSubtitle} /></section>
      <section className="py-12 px-4 border-b border-gray-200 dark:border-dark-text/10"><div className="max-w-6xl mx-auto"><motion.div className="flex items-center gap-4 mb-6" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}><Filter className="w-6 h-6 text-primary-700" /><h2 className="text-2xl font-bold text-gray-900 dark:text-white">Filter Berdasarkan Divisi</h2></motion.div><motion.div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}><motion.button variants={itemVariants} onClick={() => setSelectedDept(null)} className={`p-4 rounded-lg font-semibold transition-smooth ${selectedDept === null ? 'bg-primary-700 text-white' : 'bg-gray-100 dark:bg-dark-card text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-text/10'}`}>Semua</motion.button>{content.programKerja.departments.map((dept) => <motion.button key={dept.id} variants={itemVariants} onClick={() => setSelectedDept(dept.id)} className={`p-4 rounded-lg font-semibold transition-smooth text-left line-clamp-2 ${selectedDept === dept.id ? 'bg-primary-700 text-white' : 'bg-gray-100 dark:bg-dark-card text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-text/10'}`}>{dept.department}</motion.button>)}</motion.div></div></section>
      <section className="py-20 px-4"><div className="max-w-6xl mx-auto"><AnimatePresence mode="wait"><motion.div key={selectedDept || 'all'} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" variants={containerVariants} initial="hidden" animate="visible" exit="hidden">{filteredDepartments.map((dept) => dept.programs.map((program) => <motion.div key={program.id} variants={itemVariants}><Card className="h-full overflow-hidden"><div className="inline-block mb-3 px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-700/20 text-primary-700 dark:text-primary-50 text-xs font-semibold">{dept.department}</div><h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{program.name}</h3><div className="flex items-start gap-2 mb-4"><CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" /><p className="text-sm font-semibold text-gray-700 dark:text-gray-300">{program.goal}</p></div><p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">{program.description}</p><div className="mt-4 pt-4 border-t border-gray-200 dark:border-dark-text/10"><div className="flex justify-between items-center mb-2"><span className="text-xs font-semibold text-gray-600 dark:text-gray-400">Progress</span><span className="text-xs font-bold text-primary-700 dark:text-primary-50">{Math.min(100, 20 + (program.id % 80))}%</span></div><div className="w-full bg-gray-200 dark:bg-dark-text/10 rounded-full h-2"><div className="bg-gradient-to-r from-primary-600 to-primary-500 h-2 rounded-full" style={{ width: `${Math.min(100, 20 + (program.id % 80))}%` }} /></div></div></Card></motion.div>))}</motion.div></AnimatePresence></div></section>
      <section className="py-16 px-4 bg-gray-50 dark:bg-dark-card"><div className="max-w-6xl mx-auto"><motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}><div><div className="text-4xl font-bold text-primary-700 mb-2">{content.programKerja.departments.length}</div><p className="text-gray-600 dark:text-gray-400">Divisi</p></div><div><div className="text-4xl font-bold text-primary-700 mb-2">{content.programKerja.departments.reduce((sum, dept) => sum + dept.programs.length, 0)}</div><p className="text-gray-600 dark:text-gray-400">Program Kerja</p></div><div><div className="text-4xl font-bold text-primary-700 mb-2">{content.programKerja.period}</div><p className="text-gray-600 dark:text-gray-400">Periode Kerja</p></div></motion.div></div></section>
    </div>
  );
};

const NewsPage = () => {
  const { content } = useContent();
  const [selectedCategory, setSelectedCategory] = useState(content.mediaBerita.categories[0]);
  const filteredNews = content.mediaBerita.news.filter((newsItem) => newsItem.category === selectedCategory);
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg">
      <section className="pt-24 pb-12 px-4 bg-gradient-to-b from-primary-50 to-white dark:from-dark-card dark:to-dark-bg"><SectionTitle title={content.mediaBerita.headerTitle} subtitle={content.mediaBerita.headerSubtitle} /></section>
      {content.mediaBerita.news[0] && <section className="py-12 px-4 border-b border-gray-200 dark:border-dark-text/10"><div className="max-w-6xl mx-auto"><motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center"><div className="md:col-span-2"><h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{content.mediaBerita.news[0].title}</h2><div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 text-sm mb-4"><div className="flex items-center gap-1"><Calendar className="w-4 h-4" />{new Date(content.mediaBerita.news[0].date).toLocaleDateString('id-ID')}</div><div className="flex items-center gap-1"><User className="w-4 h-4" />{content.mediaBerita.news[0].author}</div></div><p className="text-gray-700 dark:text-gray-300 mb-4">{content.mediaBerita.news[0].excerpt}</p><button className="text-primary-700 dark:text-primary-50 font-semibold flex items-center gap-2 hover:gap-3 transition-all">Baca Selengkapnya <ArrowRight className="w-4 h-4" /></button></div><div className="md:col-span-1"><img src={content.mediaBerita.news[0].image} alt={content.mediaBerita.news[0].title} className="w-full h-48 object-cover rounded-lg" /></div></motion.div></div></section>}
      <section className="py-12 px-4 border-b border-gray-200 dark:border-dark-text/10"><div className="max-w-6xl mx-auto"><div className="flex gap-4 flex-wrap justify-center md:justify-start">{content.mediaBerita.categories.map((category) => <button key={category} onClick={() => setSelectedCategory(category)} className={`px-6 py-2 rounded-lg font-semibold transition-smooth ${selectedCategory === category ? 'bg-primary-700 text-white' : 'bg-gray-100 dark:bg-dark-card text-gray-700 dark:text-gray-300'}`}>{category}</button>)}</div></div></section>
      <section className="py-20 px-4"><div className="max-w-6xl mx-auto"><motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{filteredNews.map((item) => <motion.div key={item.id} variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}><Card className="h-full overflow-hidden group"><div className="relative overflow-hidden rounded-lg mb-4 h-48"><img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" /></div><span className="inline-block px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-700/20 text-primary-700 dark:text-primary-50 text-xs font-semibold mb-3">{item.category}</span><h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3><p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{item.excerpt}</p><div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 text-xs"><div className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(item.date).toLocaleDateString('id-ID')}</div></div></Card></motion.div>)}</motion.div></div></section>
    </div>
  );
};

const EventPage = () => {
  const { content } = useContent();
  const filteredEvents = content.events.events.filter((event) => event.category === content.events.categories[0]);
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg">
      <section className="pt-24 pb-12 px-4 bg-gradient-to-b from-primary-50 to-white dark:from-dark-card dark:to-dark-bg"><SectionTitle title={content.events.headerTitle} subtitle={content.events.headerSubtitle} /></section>
      {content.events.upcomingEvent && <section className="py-12 px-4 bg-primary-700 dark:bg-primary-700/20"><motion.div className="max-w-6xl mx-auto text-center text-white dark:text-primary-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><p className="text-sm font-semibold mb-2 uppercase tracking-wide">Event Terdekat</p><h2 className="text-4xl font-bold mb-4">{content.events.upcomingEvent.name}</h2><div className="flex justify-center gap-8"><div><div className="text-3xl font-bold">{content.events.upcomingEvent.daysLeft}</div><p>Hari Lagi</p></div></div></motion.div></section>}
      <section className="py-20 px-4"><div className="max-w-6xl mx-auto"><motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{filteredEvents.map((event) => <motion.div key={event.id} variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}><Card className="h-full"><span className="inline-block px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-700/20 text-primary-700 dark:text-primary-50 text-xs font-semibold mb-3">{event.category}</span><h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{event.name}</h3><div className="space-y-2 text-gray-600 dark:text-gray-400 text-sm mb-4"><div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-primary-600" />{new Date(event.date).toLocaleDateString('id-ID')}</div><div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary-600" />{event.location}</div></div><p className="text-gray-600 dark:text-gray-400 text-sm">{event.description}</p></Card></motion.div>)}</motion.div></div></section>
    </div>
  );
};

const RegionPage = () => {
  const { content } = useContent();
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg">
      <section className="pt-24 pb-12 px-4 bg-gradient-to-b from-primary-50 to-white dark:from-dark-card dark:to-dark-bg"><SectionTitle title={content.wilayah.headerTitle} subtitle={content.wilayah.headerSubtitle} /></section>
      <section className="py-20 px-4"><div className="max-w-6xl mx-auto"><motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{content.wilayah.regions.map((region, idx) => <motion.div key={region.id} variants={itemVariants} initial="hidden" whileInView="visible" transition={{ delay: idx * 0.1 }} viewport={{ once: true }}><Card className="h-full"><div className="inline-block px-3 py-1 rounded-full bg-primary-700 text-white text-xs font-semibold mb-4">{region.code}</div><h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{region.name}</h3><p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{region.description}</p><div className="space-y-3 text-sm text-gray-700 dark:text-gray-300"><div className="flex items-center gap-2"><Users className="w-4 h-4 text-primary-600" /><span>{region.members} Mahasiswa</span></div><div className="flex items-center gap-2"><Building2 className="w-4 h-4 text-primary-600" /><span>{region.universities} Universitas</span></div><div className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary-600" /><span className="truncate">{region.email}</span></div></div></Card></motion.div>)}</motion.div></div></section>
    </div>
  );
};

const ConstitutionPage = () => {
  const { content } = useContent();
  const [selectedSection, setSelectedSection] = useState('legalitas');
  const sections = [
    { id: 'legalitas', label: 'Legalitas', icon: FileText },
    { id: 'identitas', label: 'Identitas', icon: BookOpen },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg">
      <section className="pt-24 pb-12 px-4 bg-gradient-to-b from-primary-50 to-white dark:from-dark-card dark:to-dark-bg"><SectionTitle title={content.konstitusi.headerTitle} subtitle={content.konstitusi.headerSubtitle} /></section>
      <section className="py-20 px-4"><div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8"><motion.div className="md:col-span-1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}><div className="sticky top-24 space-y-2">{sections.map((section) => { const Icon = section.icon; return <button key={section.id} onClick={() => setSelectedSection(section.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-smooth text-left ${selectedSection === section.id ? 'bg-primary-700 text-white' : 'bg-gray-100 dark:bg-dark-card text-gray-700 dark:text-gray-300 hover:bg-gray-200'}`}><Icon className="w-5 h-5" />{section.label}</button>; })}</div></motion.div><motion.div className="md:col-span-3" key={selectedSection} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{selectedSection === 'legalitas' && <div className="space-y-6">{content.konstitusi.legalitas.map((item, index) => <Card key={index}><h3 className="text-xl font-bold text-primary-700 mb-2">{item.title}</h3><p className="text-gray-700 dark:text-gray-300">{item.value}</p></Card>)}</div>}{selectedSection === 'identitas' && <Card><h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Identitas Organisasi</h3><div className="space-y-3 text-gray-700 dark:text-gray-300">{content.konstitusi.identitas.map((item) => <p key={item.label}><strong>{item.label}:</strong> {item.value}</p>)}</div></Card>}</motion.div></div></section>
    </div>
  );
};

const ContactPage = () => {
  const { content } = useContent();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const iconMapContact = { Mail, Phone, MapPin };

  const handleChange = (event) => setFormData({ ...formData, [event.target.name]: event.target.value });
  const handleSubmit = (event) => { event.preventDefault(); setSubmitted(true); setTimeout(() => { setFormData({ name: '', email: '', message: '' }); setSubmitted(false); }, 3000); };

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg">
      <section className="pt-24 pb-12 px-4 bg-gradient-to-b from-primary-50 to-white dark:from-dark-card dark:to-dark-bg"><SectionTitle title={content.kontak.headerTitle} subtitle={content.kontak.headerSubtitle} /></section>
      <section className="py-20 px-4"><div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">{content.kontak.infoCards.map((item, index) => { const Icon = iconMapContact[item.icon] || Mail; return <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} viewport={{ once: true }}><Card><Icon className="w-8 h-8 text-primary-700 mb-4" /><h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3><p className="text-gray-600 dark:text-gray-400">{item.value}</p></Card></motion.div>; })}</div><motion.div className="max-w-2xl mx-auto" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}><Card><h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2"><Mail className="text-primary-700" />Kirim Pesan</h3>{submitted && <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-lg bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 mb-6">Terima kasih! Pesan Anda telah terkirim.</motion.div>}<form onSubmit={handleSubmit} className="space-y-4"><div><label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Nama</label><input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-text/20 dark:bg-dark-card dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-700" placeholder="Nama Anda" required /></div><div><label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email</label><input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-text/20 dark:bg-dark-card dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-700" placeholder="email@example.com" required /></div><div><label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Pesan</label><textarea name="message" value={formData.message} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-text/20 dark:bg-dark-card dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-700" rows="5" placeholder="Tulis pesan Anda..." required /></div><Button variant="primary" size="lg" className="w-full" type="submit">Kirim Pesan</Button></form></Card></motion.div></section>
      <section className="py-16 px-4 bg-gray-50 dark:bg-dark-card"><div className="max-w-6xl mx-auto text-center"><h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">{content.kontak.socialTitle}</h2><div className="flex gap-4 justify-center flex-wrap">{content.kontak.socials.map((platform) => <Button key={platform} variant="outline">{platform}</Button>)}</div></div></section>
    </div>
  );
};

const SiteRenderer = ({ page }) => {
  switch (page) {
    case 'home': return <HomePage />;
    case 'selayang': return <SelayangPage />;
    case 'kabinet': return <KabinetPage />;
    case 'program': return <ProgramPage />;
    case 'berita': return <NewsPage />;
    case 'event': return <EventPage />;
    case 'wilayah': return <RegionPage />;
    case 'konstitusi': return <ConstitutionPage />;
    case 'kontak': return <ContactPage />;
    default: return <HomePage />;
  }
};

export default SiteRenderer;
