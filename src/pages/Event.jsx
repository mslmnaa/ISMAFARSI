import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Card from '../components/Card';
import api from '../api';
import { Calendar, MapPin } from 'lucide-react';

const Event = () => {
  const [selectedCategory, setSelectedCategory] = useState('Event Nasional');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // A simple hardcoded upcoming event logic since we don't have it in the DB schema,
  // or we could calculate the closest upcoming event from the events array.
  const [upcomingEvent, setUpcomingEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get('/events');
        const allEvents = response.data;
        setEvents(allEvents);
        
        // Calculate closest upcoming event
        const upcoming = allEvents
          .filter(e => e.status === 'upcoming' && new Date(e.date) > new Date())
          .sort((a, b) => new Date(a.date) - new Date(b.date))[0];
        
        if (upcoming) {
          const daysLeft = Math.ceil((new Date(upcoming.date) - new Date()) / (1000 * 60 * 60 * 24));
          setUpcomingEvent({ ...upcoming, daysLeft });
        }
      } catch (error) {
        console.error('Failed to fetch events', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const categories = ['Event Nasional'];
  const filteredEvents = events.filter(e => e.category === selectedCategory);

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
            Event ISMAFARSI
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Jadwal dan informasi kegiatan nasional
          </p>
        </motion.div>
      </section>

      {/* Upcoming Event Highlight */}
      {upcomingEvent && (
        <section className="py-12 px-4 bg-primary-700 dark:bg-primary-700/20">
          <motion.div className="max-w-6xl mx-auto text-center text-white dark:text-primary-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="text-sm font-semibold mb-2 uppercase tracking-wide">Event Terdekat</p>
            <h2 className="text-4xl font-bold mb-4">{upcomingEvent.name}</h2>
            <div className="flex justify-center gap-8">
              <div>
                <div className="text-3xl font-bold">{upcomingEvent.daysLeft}</div>
                <p>Hari Lagi</p>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* Events Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <motion.div
                key={event.id}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-700/20 text-primary-700 dark:text-primary-50 text-xs font-semibold mb-3">
                    {event.category}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {event.name}
                  </h3>
                  <div className="space-y-2 text-gray-600 dark:text-gray-400 text-sm mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary-600" />
                      {new Date(event.date).toLocaleDateString('id-ID')}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary-600" />
                      {event.location}
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{event.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Event;
