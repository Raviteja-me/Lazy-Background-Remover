import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import EditorPage from './pages/EditorPage';
import ApiPage from './pages/ApiPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="editor" element={<EditorPage />} />
        <Route path="api" element={<ApiPage />} />
      </Route>
    </Routes>
  );
};

export default App;