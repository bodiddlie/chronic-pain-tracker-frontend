import React from 'react';
import Div100vh from 'react-div-100vh';

import { Header } from './header';
import { Calendar } from './calendar';

function App() {
  return (
    <Div100vh>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <Calendar />
      </div>
    </Div100vh>
  );
}

export default App;
