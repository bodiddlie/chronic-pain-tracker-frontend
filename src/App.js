import React from 'react';

import { Header } from './header';
import { Calendar } from './calendar';

function App() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100vh',
      }}
    >
      <Header />
      <Calendar />
    </div>
  );
}

export default App;
