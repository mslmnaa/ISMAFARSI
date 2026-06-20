import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Card from '../components/Card';
import api from '../api';
import { Calendar, User, ArrowRight } from 'lucide-react';

const MediaBerita = () => {
  const [selectedCategory, setSelectedCategory] = useState('Berita');
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await api.get('/news');
        setNewsList(response.data);
      } catch (error) {
        console.error('Failed to fetch news', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const categories = ['Berita', 'Pengumuman'];
  const filteredNews = newsList.filter((n) => n.category === selectedCategory);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg">
      {/* Header */}
      <section className="pt-24 pb-12 px-4 bg-gradient-to-b from-primary-50 to-white dark:from-dark-card dark:to-dark-bg">
        <motion.div className="max-w-6xl mx-auto text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Media & Berita
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">Berita terbaru dari ISMAFARSI</p>
        </motion.div>
      </section>

      {/* Featured News */}
      {newsList[0] && (
        <section className="py-12 px-4 border-b border-gray-200 dark:border-dark-text/10">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center"
            >
              <div className="md:col-span-2">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  {newsList[0].title}
                </h2>
                <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 text-sm mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(newsList[0].date).toLocaleDateString('id-ID')}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {newsList[0].author}
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">{newsList[0].excerpt}</p>
                <button className="text-primary-700 dark:text-primary-50 font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                  Baca Selengkapnya <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="md:col-span-1">
                <img
                  src={newsList[0].image}
                  alt={newsList[0].title}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="py-12 px-4 border-b border-gray-200 dark:border-dark-text/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex gap-4 flex-wrap justify-center md:justify-start">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-lg font-semibold transition-smooth ${
                  selectedCategory === cat
                    ? 'bg-primary-700 text-white'
                    : 'bg-gray-100 dark:bg-dark-card text-gray-700 dark:text-gray-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Card className="h-full overflow-hidden group">
                  <div className="relative overflow-hidden rounded-lg mb-4 h-48">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <span className="inline-block px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-700/20 text-primary-700 dark:text-primary-50 text-xs font-semibold mb-3">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{item.excerpt}</p>
                  <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 text-xs">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(item.date).toLocaleDateString('id-ID')}
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

export default MediaBerita;
