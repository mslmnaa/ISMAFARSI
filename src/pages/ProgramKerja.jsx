import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '../components/Card';
import programKerja from '../data/programKerja.json';
import { Filter, CheckCircle } from 'lucide-react';

const ProgramKerja = () => {
  const [selectedDept, setSelectedDept] = useState(null);
  const [expandedProgram, setExpandedProgram] = useState(null);

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

  const filteredPrograms = selectedDept
    ? programKerja.programs.filter((p) => p.id === selectedDept)
    : programKerja.programs;

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg">
      {/* Header */}
      <section className="pt-24 pb-12 px-4 bg-gradient-to-b from-primary-50 to-white dark:from-dark-card dark:to-dark-bg">
        <motion.div
          className="max-w-6xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Program Kerja Pranavritta
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Rencana kerja dan program strategis ISMAFARSI 2024-2026
          </p>
        </motion.div>
      </section>

      {/* Filter Section */}
      <section className="py-12 px-4 border-b border-gray-200 dark:border-dark-text/10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="flex items-center gap-4 mb-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Filter className="w-6 h-6 text-primary-700" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Filter Berdasarkan Divisi
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* All Button */}
            <motion.button
              variants={itemVariants}
              onClick={() => setSelectedDept(null)}
              className={`p-4 rounded-lg font-semibold transition-smooth ${
                selectedDept === null
                  ? 'bg-primary-700 text-white'
                  : 'bg-gray-100 dark:bg-dark-card text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-text/10'
              }`}
            >
              Semua
            </motion.button>

            {/* Department Buttons */}
            {programKerja.programs.map((dept) => (
              <motion.button
                key={dept.id}
                variants={itemVariants}
                onClick={() => setSelectedDept(dept.id)}
                className={`p-4 rounded-lg font-semibold transition-smooth text-left line-clamp-2 ${
                  selectedDept === dept.id
                    ? 'bg-primary-700 text-white'
                    : 'bg-gray-100 dark:bg-dark-card text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-text/10'
                }`}
              >
                {dept.department}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedDept}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {filteredPrograms.map((dept) =>
                dept.programs.map((program) => (
                  <motion.div key={program.id} variants={itemVariants}>
                    <Card
                      className="h-full cursor-pointer overflow-hidden"
                      onClick={() =>
                        setExpandedProgram(
                          expandedProgram?.id === program.id ? null : program
                        )
                      }
                    >
                      {/* Department Badge */}
                      <div className="inline-block mb-3 px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-700/20 text-primary-700 dark:text-primary-50 text-xs font-semibold">
                        {dept.department}
                      </div>

                      {/* Program Title */}
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        {program.name}
                      </h3>

                      {/* Program Goal */}
                      <div className="flex items-start gap-2 mb-4">
                        <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                          {program.goal}
                        </p>
                      </div>

                      {/* Program Description */}
                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                        {program.description}
                      </p>

                      {/* Expand Button */}
                      <button className="text-primary-700 dark:text-primary-50 font-semibold text-sm hover:gap-1 inline-flex items-center gap-0 transition-all">
                        Pelajari lebih
                        <span className="ml-1">→</span>
                      </button>

                      {/* Progress Bar */}
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-dark-text/10">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                            Progress
                          </span>
                          <span className="text-xs font-bold text-primary-700 dark:text-primary-50">
                            {Math.floor(Math.random() * 100)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-dark-text/10 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-primary-600 to-primary-500 h-2 rounded-full"
                            style={{
                              width: `${Math.floor(Math.random() * 100)}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))
              )}
            </motion.div>
          </AnimatePresence>

          {/* Empty State */}
          {filteredPrograms.length === 0 && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Tidak ada program untuk divisi ini
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Summary Stats */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-dark-card">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <div className="text-4xl font-bold text-primary-700 mb-2">
                {programKerja.programs.length}
              </div>
              <p className="text-gray-600 dark:text-gray-400">Divisi</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-700 mb-2">
                {programKerja.programs.reduce(
                  (sum, dept) => sum + dept.programs.length,
                  0
                )}
              </div>
              <p className="text-gray-600 dark:text-gray-400">Program Kerja</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-700 mb-2">
                2024-2026
              </div>
              <p className="text-gray-600 dark:text-gray-400">Periode Kerja</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProgramKerja;
