import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import EmojiTranslatorPage from './pages/EmojiTranslator'
import GroceryListPage from './pages/GroceryList'
import NotFoundPage from './pages/NotFound';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/emoji-translator" element={<EmojiTranslatorPage />} />
      <Route path="/grocery-list" element={<GroceryListPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;