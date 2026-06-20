import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '../components/Card';
import Button from '../components/Button';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';

const Kontak = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

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
            Hubungi Kami
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Kami siap membantu menjawab pertanyaan Anda
          </p>
        </motion.div>
      </section>

      {/* Contact Info */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card>
              <Mail className="w-8 h-8 text-primary-700 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Email</h3>
              <p className="text-gray-600 dark:text-gray-400">info@ismafarsi.org</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Card>
              <Phone className="w-8 h-8 text-primary-700 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">WhatsApp</h3>
              <p className="text-gray-600 dark:text-gray-400">+62 XXX XXX XXXX</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card>
              <MapPin className="w-8 h-8 text-primary-700 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Lokasi</h3>
              <p className="text-gray-600 dark:text-gray-400">Sekretariat ISMAFARSI</p>
            </Card>
          </motion.div>
        </div>

        {/* Contact Form */}
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Card>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <MessageCircle className="text-primary-700" />
              Kirim Pesan
            </h3>

            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-lg bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 mb-6"
              >
                Terima kasih! Pesan Anda telah terkirim.
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Nama
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-text/20 dark:bg-dark-card dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-700"
                  placeholder="Nama Anda"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-text/20 dark:bg-dark-card dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-700"
                  placeholder="email@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Pesan
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-text/20 dark:bg-dark-card dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-700"
                  rows="5"
                  placeholder="Tulis pesan Anda..."
                  required
                ></textarea>
              </div>

              <Button variant="primary" size="lg" className="w-full" type="submit">
                Kirim Pesan
              </Button>
            </form>
          </Card>
        </motion.div>
      </section>

      {/* Social Media */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-dark-card">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Ikuti Kami di Media Sosial
          </h2>
          <div className="flex gap-4 justify-center flex-wrap">
            {['Instagram', 'TikTok', 'LinkedIn', 'Facebook'].map((platform) => (
              <Button key={platform} variant="outline">
                {platform}
              </Button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Kontak;
