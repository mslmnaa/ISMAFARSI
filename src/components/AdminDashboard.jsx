import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Calendar,
  FileText,
  LayoutGrid,
  MapPinned,
  Newspaper,
  Phone,
  RefreshCcw,
  Save,
  Settings,
  ShieldCheck,
  Users,
  Server,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from './Card';
import Button from './Button';
import SiteRenderer from './SiteRenderer';
import { useContent } from '../context/ContentContext';
import api from '../api';

const sections = [
  { id: 'site', label: 'Site Settings', icon: Settings },
  { id: 'home', label: 'Beranda', icon: LayoutGrid },
  { id: 'selayang', label: 'Selayang Pandang', icon: FileText },
  { id: 'kabinet', label: 'Kabinet', icon: Users },
  { id: 'program', label: 'Program Kerja', icon: ShieldCheck },
  { id: 'berita', label: 'Media Berita', icon: Newspaper },
  { id: 'event', label: 'Event', icon: Calendar },
  { id: 'wilayah', label: 'Wilayah', icon: MapPinned },
  { id: 'konstitusi', label: 'Konstitusi', icon: FileText },
  { id: 'kontak', label: 'Kontak', icon: Phone },
];

const previewPages = sections.map((section) => ({ id: section.id, label: section.label, page: section.id }));

const clone = (value) => JSON.parse(JSON.stringify(value));

const setByPath = (source, path, nextValue) => {
  const next = clone(source);
  const parts = path.split('.');
  let cursor = next;

  for (let index = 0; index < parts.length - 1; index += 1) {
    cursor = cursor[parts[index]];
  }

  cursor[parts[parts.length - 1]] = nextValue;
  return next;
};

const Field = ({ label, value, onChange, type = 'text', rows = 4 }) => {
  const uniqueId = React.useId();

  if (type === 'image') {
    return (
      <label className="block space-y-2">
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{label}</span>
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className="flex-1 rounded-xl border border-gray-200 dark:border-dark-text/10 bg-white dark:bg-dark-card px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-700"
            placeholder="URL Gambar"
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id={`file-upload-${uniqueId}`}
            onChange={async (e) => {
              const file = e.target.files[0];
              if (!file) return;
              const formData = new FormData();
              formData.append('image', file);
              try {
                const res = await api.post('/upload', formData, {
                  headers: { 'Content-Type': 'multipart/form-data' },
                });
                onChange(res.data.url);
              } catch (err) {
                console.error('Upload failed', err);
                alert('Gagal mengupload gambar');
              }
            }}
          />
          <label
            htmlFor={`file-upload-${uniqueId}`}
            className="cursor-pointer bg-primary-700 text-white px-4 py-3 rounded-xl text-sm font-semibold hover:bg-primary-800 transition-colors whitespace-nowrap"
          >
            Upload
          </label>
        </div>
      </label>
    );
  }

  return (
    <label className="block space-y-2">
      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{label}</span>
      {type === 'textarea' ? (
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          rows={rows}
          className="w-full rounded-xl border border-gray-200 dark:border-dark-text/10 bg-white dark:bg-dark-card px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-700"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(event) => onChange(type === 'number' ? Number(event.target.value) : event.target.value)}
          className="w-full rounded-xl border border-gray-200 dark:border-dark-text/10 bg-white dark:bg-dark-card px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-700"
        />
      )}
    </label>
  );
};

const ListEditor = ({ title, items, onChange, createItem, renderItem }) => {
  const updateItem = (index, nextItem) => {
    const next = clone(items);
    next[index] = nextItem;
    onChange(next);
  };

  return (
    <Card hover={false} className="border border-gray-100 dark:border-dark-text/10 mb-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
      <div className="space-y-4 mt-4">
        {(items || []).map((item, index) => (
          <div key={item.id ?? index} className="rounded-2xl border border-gray-200 dark:border-dark-text/10 p-4 bg-gray-50/60 dark:bg-dark-bg/40">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Item {index + 1}</p>
              <button type="button" onClick={() => onChange(items.filter((_, itemIndex) => itemIndex !== index))} className="text-sm font-semibold text-red-600 hover:text-red-700">
                Hapus
              </button>
            </div>
            {renderItem(item, (nextItem) => updateItem(index, nextItem))}
          </div>
        ))}
        <Button type="button" variant="outline" onClick={() => onChange([...(items || []), createItem()])}>
          Tambah Item
        </Button>
      </div>
    </Card>
  );
};

const AdminDashboard = () => {
  const { content, setContent, resetContent } = useContent();
  const [activeSection, setActiveSection] = useState('home');
  const [previewPage, setPreviewPage] = useState('home');
  const [message, setMessage] = useState('Perubahan disimpan otomatis ke LocalStorage.');

  const activePreview = useMemo(
    () => previewPages.find((page) => page.id === previewPage) || previewPages[0],
    [previewPage]
  );

  const updateContent = (path, value) => {
    setContent((previous) => setByPath(previous, path, value));
    setMessage('Perubahan tersimpan secara otomatis.');
  };

  const updateList = (path, nextValue) => {
    setContent((previous) => setByPath(previous, path, nextValue));
    setMessage('Daftar konten diperbarui.');
  };

  const handleSaveToServer = async () => {
    setMessage('Saving to server...');
    try {
      await api.post('/sync', content);
      setMessage('Perubahan berhasil disimpan ke database server!');
    } catch (error) {
      console.error(error);
      setMessage('Gagal menyimpan ke server. Pastikan Anda sudah login.');
    }
  };

  const renderSection = () => {
    if (activeSection === 'site') {
      return (
        <Card hover={false} className="border border-gray-100 dark:border-dark-text/10">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Site Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Brand Name" value={content.site.brandName} onChange={(value) => updateContent('site.brandName', value)} />
            <Field label="Full Name" value={content.site.fullName} onChange={(value) => updateContent('site.fullName', value)} />
            <Field label="Email" value={content.site.email} onChange={(value) => updateContent('site.email', value)} />
            <Field label="Phone" value={content.site.phone} onChange={(value) => updateContent('site.phone', value)} />
            <Field label="Location" value={content.site.location} onChange={(value) => updateContent('site.location', value)} />
            <Field label="WhatsApp" value={content.site.whatsapp} onChange={(value) => updateContent('site.whatsapp', value)} />
          </div>
          <div className="mt-4">
            <Field label="Footer Copyright" value={content.site.footerCopyright} onChange={(value) => updateContent('site.footerCopyright', value)} />
          </div>
        </Card>
      );
    }

    if (activeSection === 'home') {
      return (
        <ListEditor
          title="Beranda"
          items={[
            { id: 'badge', label: 'Badge', value: content.home.badge },
            { id: 'title', label: 'Title', value: content.home.title },
            { id: 'subtitle', label: 'Subtitle', value: content.home.subtitle },
            { id: 'description', label: 'Description', value: content.home.description },
          ]}
          createItem={() => ({ id: Date.now(), label: 'Field', value: '' })}
          onChange={(next) => {
            next.forEach((item) => {
              if (item.id === 'badge') updateContent('home.badge', item.value);
              if (item.id === 'title') updateContent('home.title', item.value);
              if (item.id === 'subtitle') updateContent('home.subtitle', item.value);
              if (item.id === 'description') updateContent('home.description', item.value);
            });
          }}
          renderItem={(item, onItemChange) => (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Label" value={item.label} onChange={(value) => onItemChange({ ...item, label: value })} />
              <Field label="Value" value={item.value} onChange={(value) => onItemChange({ ...item, value: value })} />
            </div>
          )}
        />
      );
    }

    if (activeSection === 'selayang') {
      return (
        <ListEditor
          title="Selayang Pandang"
          items={content.selayang.historyParagraphs.map((text, index) => ({ id: index + 1, text }))}
          createItem={() => ({ id: Date.now(), text: '' })}
          onChange={(next) => updateContent('selayang.historyParagraphs', next.map((item) => item.text))}
          renderItem={(item, onItemChange) => <Field label="Paragraph" type="textarea" value={item.text} onChange={(value) => onItemChange({ ...item, text: value })} />}
        />
      );
    }

    if (activeSection === 'kabinet') {
      return (
        <ListEditor
          title="Kabinet"
          items={content.kabinet.members}
          createItem={() => ({ id: Date.now(), name: 'Nama Baru', position: 'Posisi Baru', institution: 'Institusi Baru', photo: '', description: 'Deskripsi baru' })}
          onChange={(next) => updateList('kabinet.members', next)}
          renderItem={(item, onItemChange) => (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Nama" value={item.name} onChange={(value) => onItemChange({ ...item, name: value })} />
              <Field label="Position" value={item.position} onChange={(value) => onItemChange({ ...item, position: value })} />
              <Field label="Institution" value={item.institution} onChange={(value) => onItemChange({ ...item, institution: value })} />
              <Field label="Description" value={item.description} onChange={(value) => onItemChange({ ...item, description: value })} />
              <Field label="Photo URL" type="image" value={item.photo} onChange={(value) => onItemChange({ ...item, photo: value })} />
            </div>
          )}
        />
      );
    }

    if (activeSection === 'program') {
      return (
        <ListEditor
          title="Program Kerja"
          items={content.programKerja.departments}
          createItem={() => ({ id: Date.now(), department: 'Divisi Baru', programs: [] })}
          onChange={(next) => updateContent('programKerja.departments', next)}
          renderItem={(department, onDepartmentChange) => (
            <div className="space-y-4">
              <Field label="Nama Divisi" value={department.department} onChange={(value) => onDepartmentChange({ ...department, department: value })} />
              <ListEditor
                title="Program"
                items={department.programs}
                createItem={() => ({ id: Date.now(), name: 'Program Baru', goal: 'Target baru', description: 'Deskripsi baru' })}
                onChange={(nextPrograms) => onDepartmentChange({ ...department, programs: nextPrograms })}
                renderItem={(program, onProgramChange) => (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Field label="Nama" value={program.name} onChange={(value) => onProgramChange({ ...program, name: value })} />
                    <Field label="Goal" value={program.goal} onChange={(value) => onProgramChange({ ...program, goal: value })} />
                    <Field label="Description" value={program.description} onChange={(value) => onProgramChange({ ...program, description: value })} />
                  </div>
                )}
              />
            </div>
          )}
        />
      );
    }

    if (activeSection === 'berita') {
      return (
        <ListEditor
          title="Media Berita"
          items={content.mediaBerita.news}
          createItem={() => ({ id: Date.now(), title: 'Judul berita baru', category: 'Berita', date: new Date().toISOString().slice(0, 10), author: 'Admin', image: '', excerpt: 'Ringkasan', content: 'Isi berita' })}
          onChange={(next) => updateContent('mediaBerita.news', next)}
          renderItem={(item, onItemChange) => (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Title" value={item.title} onChange={(value) => onItemChange({ ...item, title: value })} />
              <Field label="Category" value={item.category} onChange={(value) => onItemChange({ ...item, category: value })} />
              <Field label="Date" type="date" value={item.date} onChange={(value) => onItemChange({ ...item, date: value })} />
              <Field label="Author" value={item.author} onChange={(value) => onItemChange({ ...item, author: value })} />
              <Field label="Image URL" type="image" value={item.image} onChange={(value) => onItemChange({ ...item, image: value })} />
              <Field label="Excerpt" type="textarea" value={item.excerpt} onChange={(value) => onItemChange({ ...item, excerpt: value })} />
            </div>
          )}
        />
      );
    }

    if (activeSection === 'event') {
      return (
        <ListEditor
          title="Event"
          items={content.events.events}
          createItem={() => ({ id: Date.now(), name: 'Event Baru', category: 'Event Nasional', date: new Date().toISOString().slice(0, 10), location: 'Lokasi baru', description: 'Deskripsi baru', status: 'upcoming' })}
          onChange={(next) => updateContent('events.events', next)}
          renderItem={(item, onItemChange) => (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Name" value={item.name} onChange={(value) => onItemChange({ ...item, name: value })} />
              <Field label="Category" value={item.category} onChange={(value) => onItemChange({ ...item, category: value })} />
              <Field label="Date" type="date" value={item.date} onChange={(value) => onItemChange({ ...item, date: value })} />
              <Field label="Location" value={item.location} onChange={(value) => onItemChange({ ...item, location: value })} />
              <Field label="Description" type="textarea" value={item.description} onChange={(value) => onItemChange({ ...item, description: value })} />
              <Field label="Status" value={item.status} onChange={(value) => onItemChange({ ...item, status: value })} />
            </div>
          )}
        />
      );
    }

    if (activeSection === 'wilayah') {
      return (
        <ListEditor
          title="Wilayah"
          items={content.wilayah.regions}
          createItem={() => ({ id: Date.now(), name: 'Wilayah Baru', code: 'CODE', description: 'Deskripsi baru', provinces: [], members: 0, universities: 0, head: 'Nama Ketua Regional', email: 'region@example.com' })}
          onChange={(next) => updateContent('wilayah.regions', next)}
          renderItem={(item, onItemChange) => (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Name" value={item.name} onChange={(value) => onItemChange({ ...item, name: value })} />
              <Field label="Code" value={item.code} onChange={(value) => onItemChange({ ...item, code: value })} />
              <Field label="Description" type="textarea" value={item.description} onChange={(value) => onItemChange({ ...item, description: value })} />
              <Field label="Head" value={item.head} onChange={(value) => onItemChange({ ...item, head: value })} />
              <Field label="Email" value={item.email} onChange={(value) => onItemChange({ ...item, email: value })} />
            </div>
          )}
        />
      );
    }

    if (activeSection === 'konstitusi') {
      return (
        <div className="space-y-6">
          <ListEditor
            title="Legalitas"
            items={content.konstitusi.legalitas}
            createItem={() => ({ title: 'Dokumen Baru', value: 'Nomor baru' })}
            onChange={(next) => updateContent('konstitusi.legalitas', next)}
            renderItem={(item, onItemChange) => (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Title" value={item.title} onChange={(value) => onItemChange({ ...item, title: value })} />
                <Field label="Value" value={item.value} onChange={(value) => onItemChange({ ...item, value: value })} />
              </div>
            )}
          />
          <ListEditor
            title="Identitas"
            items={content.konstitusi.identitas}
            createItem={() => ({ label: 'Label Baru', value: 'Nilai baru' })}
            onChange={(next) => updateContent('konstitusi.identitas', next)}
            renderItem={(item, onItemChange) => (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Label" value={item.label} onChange={(value) => onItemChange({ ...item, label: value })} />
                <Field label="Value" value={item.value} onChange={(value) => onItemChange({ ...item, value: value })} />
              </div>
            )}
          />
        </div>
      );
    }

    if (activeSection === 'kontak') {
      return (
        <ListEditor
          title="Kontak"
          items={content.kontak.infoCards}
          createItem={() => ({ title: 'Baru', value: 'Nilai baru', icon: 'Mail' })}
          onChange={(next) => updateContent('kontak.infoCards', next)}
          renderItem={(item, onItemChange) => (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Field label="Title" value={item.title} onChange={(value) => onItemChange({ ...item, title: value })} />
              <Field label="Value" value={item.value} onChange={(value) => onItemChange({ ...item, value: value })} />
              <Field label="Icon" value={item.icon} onChange={(value) => onItemChange({ ...item, icon: value })} />
            </div>
          )}
        />
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(15,107,62,0.12),_transparent_40%),linear-gradient(180deg,#f8fafc_0%,#ffffff_40%,#f8fafc_100%)] dark:bg-none dark:bg-dark-bg px-4 py-6 md:px-6 lg:px-8">
      <div className="max-w-[1800px] mx-auto space-y-6">
        <div className="flex flex-col xl:flex-row gap-6">
          <div className="xl:w-[380px] space-y-6">
            <Card hover={false} className="border border-gray-100 dark:border-dark-text/10 bg-white/90 dark:bg-dark-card/90 backdrop-blur">
              <div className="flex items-center justify-between gap-3 mb-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-primary-700 font-semibold">Content Dashboard</p>
                  <h1 className="text-3xl font-black text-gray-900 dark:text-white mt-2">Website Editor</h1>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-primary-700 text-white flex items-center justify-center font-black text-lg">I</div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                Edit konten situs, upload gambar, dan lihat hasilnya langsung tanpa menyentuh source code.
              </p>
              <div className="flex items-center gap-3 mt-5 flex-wrap">
                <Button type="button" variant="primary" onClick={handleSaveToServer}>
                  <Server className="w-4 h-4" /> Save to Server
                </Button>
                <Button type="button" variant="outline" onClick={() => setMessage('Perubahan saat ini sudah tersimpan otomatis di browser.') }>
                  <Save className="w-4 h-4" /> Local Save
                </Button>
                <Button type="button" variant="outline" onClick={resetContent}>
                  <RefreshCcw className="w-4 h-4" /> Reset
                </Button>
                <Link to="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-text/10 transition-smooth">
                  <ArrowLeft className="w-4 h-4" /> Back to site
                </Link>
              </div>
              <div className="mt-4 p-4 rounded-2xl bg-primary-50 dark:bg-primary-700/10 text-sm text-primary-900 dark:text-primary-50">{message}</div>
            </Card>

            <Card hover={false} className="border border-gray-100 dark:border-dark-text/10">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Sections</h2>
              <div className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      type="button"
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-smooth ${activeSection === section.id ? 'bg-primary-700 text-white shadow-lg' : 'bg-gray-50 dark:bg-dark-bg text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-dark-text/10'}`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="font-semibold text-sm">{section.label}</span>
                    </button>
                  );
                })}
              </div>
            </Card>

            <Card hover={false} className="border border-gray-100 dark:border-dark-text/10">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Preview Pages</h2>
              <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                {previewPages.map((page) => (
                  <button
                    key={page.id}
                    type="button"
                    onClick={() => setPreviewPage(page.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-smooth ${previewPage === page.id ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900' : 'bg-gray-50 dark:bg-dark-bg text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-dark-text/10'}`}
                  >
                    <span className="font-semibold text-sm">{page.label}</span>
                  </button>
                ))}
              </div>
            </Card>
          </div>

          <div className="flex-1 grid grid-cols-1 2xl:grid-cols-[1.05fr_0.95fr] gap-6">
            <div className="space-y-6">
              <div className="rounded-3xl border border-gray-200 dark:border-dark-text/10 bg-white dark:bg-dark-card p-5 shadow-xl">
                <p className="text-xs uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400">Editing</p>
                <h2 className="text-2xl font-black text-gray-900 dark:text-white mt-1">{sections.find((section) => section.id === activeSection)?.label}</h2>
              </div>

              <AnimatePresence mode="wait">
                <motion.div key={activeSection} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
                  {renderSection()}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="xl:sticky xl:top-6 self-start">
              <div className="rounded-3xl border border-gray-200 dark:border-dark-text/10 overflow-hidden shadow-2xl bg-white dark:bg-dark-card">
                <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-gray-200 dark:border-dark-text/10 bg-gray-50 dark:bg-dark-bg/50">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400">Live Preview</p>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{activePreview.label}</h3>
                  </div>
                </div>
                <div className="max-h-[76vh] overflow-y-auto bg-white dark:bg-dark-bg">
                  <SiteRenderer page={activePreview.page} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
