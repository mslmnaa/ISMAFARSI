import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { defaultContent } from '../data/defaultContent';

const STORAGE_KEY = 'ismafarsi-site-content-v1';
const ContentContext = createContext(null);

const loadContent = () => {
  if (typeof window === 'undefined') return defaultContent;

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved ? { ...defaultContent, ...JSON.parse(saved) } : defaultContent;
  } catch {
    return defaultContent;
  }
};

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState(loadContent);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  }, [content]);

  const resetContent = () => {
    setContent(defaultContent);
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  };

  const value = useMemo(() => ({ content, setContent, resetContent }), [content]);

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within ContentProvider');
  }
  return context;
};
