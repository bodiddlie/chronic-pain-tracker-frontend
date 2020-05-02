import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { format } from 'date-fns';

import { Calendar } from './calendar';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={`/${format(new Date(), 'yyyy-MM-dd')}`} />}
        />
        <Route path="/:dayKey" element={<Calendar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
