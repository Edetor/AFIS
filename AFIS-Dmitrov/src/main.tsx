import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import BaseTemplate from './Components/template/index.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Goals from './pages/Goals/index.tsx'
import Typing from './pages/Typing/index.tsx'
import AppContextProvider from './shared/AppContext.tsx'
import { Provider } from 'react-redux'
import store from './store.ts'
import { ThemeProvider } from '@mui/material'
import { themeFonts } from './fonts/fonts.ts'
import Blog from './pages/Blog/index.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
      <ThemeProvider theme={themeFonts}>
        <AppContextProvider>
          <BaseTemplate>
            <Routes>
              <Route path='/Goals' element={<Goals />} />
              <Route path='/Typing' element={<Typing />} />
              <Route path='/Blog' element={<Blog />} />
            </Routes>
          </BaseTemplate>
        </AppContextProvider >
        </ThemeProvider>
      </Provider>

    </BrowserRouter>

  </StrictMode>,
)
