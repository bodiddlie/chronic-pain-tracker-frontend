import React from 'react';

import { Header } from './header';
import { Month } from './month';

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
      <Month />
    </div>
  );
}

export default App;
