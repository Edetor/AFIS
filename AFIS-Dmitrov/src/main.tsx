import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import BaseTemplate from './Components/template/index.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Goals from './pages/Goals/index.tsx'
import Typing from './pages/Typing/index.tsx'
import AppContextProvider from './shared/AppContext.tsx'


// Мейновый файл с разметкой будет





createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AppContextProvider>
        <BaseTemplate>
          <Routes>
            <Route path='/Goals' element={<Goals />} />
            <Route path='/Typing' element={<Typing />} />
          </Routes>
        </BaseTemplate>
      </AppContextProvider >
    </BrowserRouter>

  </StrictMode>,
)
