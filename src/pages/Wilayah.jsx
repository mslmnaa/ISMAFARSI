import React from 'react';
import { motion } from 'framer-motion';
import Card from '../components/Card';
import wilayah from '../data/wilayah.json';
import { Users, Building2, Mail } from 'lucide-react';

const Wilayah = () => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg">
      {/* Header */}
      <section className="pt-24 pb-12 px-4 bg-gradient-to-b from-primary-50 to-white dark:from-dark-card dark:to-dark-bg">
        <motion.div className="max-w-6xl mx-auto text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Regional ISMAFARSI
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Struktur wilayah ISMAFARSI di seluruh Indonesia
          </p>
        </motion.div>
      </section>

      {/* Regions Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wilayah.regions.map((region, idx) => (
              <motion.div
                key={region.id}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <div className="inline-block px-3 py-1 rounded-full bg-primary-700 text-white text-xs font-semibold mb-4">
                    {region.code}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {region.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{region.description}</p>
                  <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary-600" />
                      <span>{region.members} Mahasiswa</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-primary-600" />
                      <span>{region.universities} Universitas</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-primary-600" />
                      <span className="truncate">{region.email}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Wilayah;
