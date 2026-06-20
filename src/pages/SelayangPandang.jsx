import React from 'react';
import { motion } from 'framer-motion';
import Card from '../components/Card';
import { BookOpen, Users, Target, Lightbulb } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const SelayangPandang = () => {
  const { content } = useContent();

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
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            {content.selayang.headerTitle}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {content.selayang.headerSubtitle}
          </p>
        </motion.div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div className="mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
              <BookOpen className="text-primary-700" />
              Sejarah ISMAFARSI
            </h2>
            <div className="space-y-6 text-gray-700 dark:text-gray-300">
              {content.selayang.historyParagraphs.map((paragraph, index) => (
                <motion.p
                  key={index}
                  className="text-lg leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50 dark:bg-dark-card">
        <div className="max-w-6xl mx-auto">
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.div variants={itemVariants}>
              <Card className="h-full">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="w-8 h-8 text-primary-700" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{content.selayang.visionTitle}</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {content.selayang.visionDescription}
                </p>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="h-full">
                <div className="flex items-center gap-3 mb-4">
                  <Lightbulb className="w-8 h-8 text-primary-700" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{content.selayang.cabinetVisionTitle}</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {content.selayang.cabinetVisionDescription}
                </p>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div className="mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
              <Users className="text-primary-700" />
              Misi ISMAFARSI
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">{content.selayang.missionIntro}</p>

            <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              {content.selayang.missions.map((mission, idx) => (
                <motion.div key={idx} variants={itemVariants}>
                  <Card className="h-full">
                    <div className="w-10 h-10 rounded-full bg-primary-700 text-white flex items-center justify-center font-bold mb-4">
                      {mission.num}
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {mission.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">{mission.desc}</p>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50 dark:bg-dark-card">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {content.selayang.cabinetMissionTitle}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">{content.selayang.cabinetMissionIntro}</p>
            <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              {content.selayang.cabinetMissions.map((mission, idx) => (
                <motion.div key={idx} variants={itemVariants}>
                  <Card>
                    <div className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-primary-700 text-white flex items-center justify-center flex-shrink-0 mt-1 font-bold text-sm">
                        ✓
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">{mission}</p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default SelayangPandang;
