import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import EmojiTranslatorPage from './pages/EmojiTranslatorPage'
import GroceryListPage from './pages/GroceryListPage'
import NotFoundPage from './pages/NotFoundPage';

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