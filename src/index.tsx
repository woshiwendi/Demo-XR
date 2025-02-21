// css stylesheets
import './assets/css/load.css';  
import './assets/css/utils.css';  
import './assets/css/vars/_fonts.css';  
import './assets/css/vars/_theme.css';
import '@xyflow/react/dist/style.css';

import './assets/css/form.css';
import './assets/css/flow.css';  
import './assets/css/vars/_flow.css';  

// pages
import Home from './home';
import Moodboard from './mb';
import Playground from './playground';

// custom imports
import './icons';
import { getTheme } from './utils';
import reportWebVitals from './reportWebVitals';
import { themeContextType, themeType } from './types';

// third party
import ReactDOM from 'react-dom/client';
import React, { useState } from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
export const ThemeContext = React.createContext<themeContextType | null>(null);

function Sponj3d() {
    const [theme, setTheme] = useState<themeType>(getTheme())

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        setTheme(getTheme())
    });
    
    return (
      <ThemeContext.Provider value={{theme, setTheme}}>
        <BrowserRouter>
          <Routes>
            <Route path={"/"} element={<Home />}/>
            
            <Route path={"/:uid/project/:projectId"} element={<Home />}/>

            <Route path={"/:uid"} element={<Home projects/>}/>
          
            <Route path={"/:uid/mb/:mbId"} element={<ReactFlowProvider><Moodboard /></ReactFlowProvider>}/>

            <Route path={"/:uid/playground/"} element={<Playground />}/>
            <Route path={"/:uid/playground/:plid"} element={<Playground />}/>
          </Routes>
        </BrowserRouter>
      </ThemeContext.Provider>
    )
}
root.render(
  // <React.StrictMode>
    <Sponj3d />
  // </React.StrictMode>
);

reportWebVitals();
