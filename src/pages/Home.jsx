import React from 'react';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import Card from '../components/Card';
import StatCounter from '../components/StatCounter';
import { STATS } from '../utils/constants';
import { Pill, BookOpen, Users, Zap } from 'lucide-react';

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50 dark:from-dark-bg dark:via-dark-card dark:to-dark-bg flex items-center justify-center px-4">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-primary-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-5"></div>
          <div className="absolute bottom-20 left-10 w-72 h-72 bg-primary-700 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-5"></div>
        </div>

        <motion.div
          className="relative max-w-4xl mx-auto text-center z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-block mb-6"
          >
            <span className="px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-700/20 text-primary-700 dark:text-primary-50 text-sm font-semibold">
              🌿 Organisasi Mahasiswa Farmasi Nasional
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
          >
            <span className="text-primary-700 dark:text-primary-50">ISMAFARSI</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-2"
          >
            Ikatan Senat Mahasiswa Farmasi Seluruh Indonesia
          </motion.p>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            ISMAFARSI merupakan organisasi mahasiswa farmasi tingkat nasional yang menjadi wadah kolaborasi, pengembangan kompetensi, advokasi, serta pengabdian mahasiswa farmasi Indonesia dalam mewujudkan generasi farmasis yang profesional, progresif, dan berdampak bagi bangsa.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Button variant="primary" size="lg">
              Selayang Pandang
            </Button>
            <Button variant="secondary" size="lg">
              Program Kerja
            </Button>
            <Button variant="outline" size="lg">
              Hubungi Kami
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-white dark:bg-dark-bg">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {STATS.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <StatCounter end={parseInt(stat.value)} duration={2} />
                <p className="text-gray-600 dark:text-gray-400 text-lg mt-3">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-dark-card">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Komitmen Kami
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Membangun generasi farmasis yang profesional, inovatif, dan berdampak bagi masyarakat
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                icon: Pill,
                title: 'Profesional',
                description: 'Mengembangkan standar kompetensi farmasi tingkat nasional',
              },
              {
                icon: Users,
                title: 'Kolaboratif',
                description: 'Membangun jaringan kerjasama dengan institusi di seluruh Indonesia',
              },
              {
                icon: BookOpen,
                title: 'Edukatif',
                description: 'Menyediakan program pelatihan dan pengembangan berkelanjutan',
              },
              {
                icon: Zap,
                title: 'Inovatif',
                description: 'Mendorong pemikiran kreatif dan solusi baru dalam kefarmasian',
              },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                >
                  <Card className="h-full">
                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-700/20 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary-700" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary-700 dark:bg-primary-700/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white dark:text-white mb-6">
              Bergabunglah dengan ISMAFARSI
            </h2>
            <p className="text-xl text-primary-50 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Jadilah bagian dari gerakan mahasiswa farmasi terbesar di Indonesia dan berkontribusi untuk kemajuan profesi farmasi nasional.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg">
                Pelajari Lebih Lanjut
              </Button>
              <Button variant="ghost" size="lg" className="text-white hover:text-white">
                Hubungi Kami
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
