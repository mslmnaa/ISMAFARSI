import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '../components/Card';
import { FileText, BookOpen } from 'lucide-react';

const Konstitusi = () => {
  const [selectedSection, setSelectedSection] = useState('legalitas');

  const sections = [
    { id: 'legalitas', label: 'Legalitas', icon: FileText },
    { id: 'identitas', label: 'Identitas', icon: BookOpen },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg">
      {/* Header */}
      <section className="pt-24 pb-12 px-4 bg-gradient-to-b from-primary-50 to-white dark:from-dark-card dark:to-dark-bg">
        <motion.div className="max-w-6xl mx-auto text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Konstitusi ISMAFARSI
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">Dasar hukum dan peraturan organisasi</p>
        </motion.div>
      </section>

      {/* Content */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            className="md:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="sticky top-24 space-y-2">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setSelectedSection(section.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-smooth text-left ${
                      selectedSection === section.id
                        ? 'bg-primary-700 text-white'
                        : 'bg-gray-100 dark:bg-dark-card text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {section.label}
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div className="md:col-span-3" key={selectedSection} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {selectedSection === 'legalitas' && (
              <div className="space-y-6">
                <Card>
                  <h3 className="text-xl font-bold text-primary-700 mb-2">
                    SK Direktorat Jenderal Pendidikan Tinggi
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">No. 974/D5.2/T/2007</p>
                </Card>
                <Card>
                  <h3 className="text-xl font-bold text-primary-700 mb-2">
                    SK Ikatan Apoteker Indonesia (IAI)
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">No. 038/SKET/PP.IAI/XI/2013</p>
                </Card>
              </div>
            )}
            {selectedSection === 'identitas' && (
              <Card>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Identitas Organisasi
                </h3>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <p>
                    <strong>Nama:</strong> ISMAFARSI
                  </p>
                  <p>
                    <strong>Nama Lengkap:</strong> Ikatan Senat Mahasiswa Farmasi Seluruh Indonesia
                  </p>
                  <p>
                    <strong>Tahun Berdiri:</strong> 1955
                  </p>
                  <p>
                    <strong>Bentuk Organisasi:</strong> Organisasi Mahasiswa Nasional
                  </p>
                  <p>
                    <strong>Sifat Organisasi:</strong> Organisasi Nirlaba
                  </p>
                </div>
              </Card>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Konstitusi;
