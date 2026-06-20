import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '../components/Card';
import Modal from '../components/Modal';
import { Mail, MapPin, Award } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const Kabinet = () => {
  const { content } = useContent();
  const [selectedMember, setSelectedMember] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg">
      <section className="pt-24 pb-12 px-4 bg-gradient-to-b from-primary-50 to-white dark:from-dark-card dark:to-dark-bg">
        <motion.div className="max-w-6xl mx-auto text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">{content.kabinet.headerTitle}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">{content.kabinet.headerSubtitle}</p>
        </motion.div>
      </section>

      <section className="py-16 px-4 bg-gray-50 dark:bg-dark-card">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div className="p-8 rounded-lg bg-white dark:bg-dark-bg shadow-soft" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h3 className="text-2xl font-bold text-primary-700 mb-4">Visi</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{content.kabinet.visi}</p>
          </motion.div>

          <motion.div className="p-8 rounded-lg bg-white dark:bg-dark-bg shadow-soft" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h3 className="text-2xl font-bold text-primary-700 mb-4">Misi</h3>
            <ul className="space-y-2">
              {content.kabinet.misi.map((mission, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                  <span className="text-primary-600 font-bold mt-1">•</span>
                  <span>{mission}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Anggota Kabinet</h2>
            <p className="text-gray-600 dark:text-gray-400">{content.kabinet.intro}</p>
          </motion.div>

          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {content.kabinet.members.map((member) => (
              <motion.div key={member.id} variants={itemVariants} onClick={() => setSelectedMember(member)} className="cursor-pointer">
                <Card className="overflow-hidden h-full">
                  <div className="relative">
                    <div className="w-full h-64 bg-gray-300 dark:bg-gray-600 overflow-hidden rounded-lg mb-4">
                      <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute top-4 right-4 bg-primary-700 text-white px-3 py-1 rounded-full text-xs font-semibold">{member.position}</div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{member.name}</h3>

                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <Award className="w-4 h-4 text-primary-600" />
                    {member.institution}
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">{member.description}</p>

                  <button className="w-full py-2 px-4 rounded-lg bg-primary-50 dark:bg-primary-700/20 text-primary-700 dark:text-primary-50 font-semibold hover:bg-primary-100 dark:hover:bg-primary-700/30 transition-smooth text-sm">
                    Lihat Detail
                  </button>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Modal isOpen={selectedMember !== null} onClose={() => setSelectedMember(null)} title={selectedMember?.name} size="lg">
        {selectedMember && (
          <div className="flex gap-8">
            <div className="w-48 flex-shrink-0">
              <img src={selectedMember.photo} alt={selectedMember.name} className="w-full rounded-lg" />
            </div>

            <div className="flex-1">
              <div className="mb-6">
                <span className="inline-block px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-700/20 text-primary-700 dark:text-primary-50 font-semibold text-sm mb-4">
                  {selectedMember.position}
                </span>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary-600" />
                    <span>{selectedMember.institution}</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{selectedMember.description}</p>

              <div className="mt-6 p-4 bg-primary-50 dark:bg-primary-700/10 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Anggota Kabinet Pranavritta 2024-2026 berkontribusi aktif dalam mengembangkan ISMAFARSI dan mendampingi mahasiswa farmasi Indonesia.
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Kabinet;
