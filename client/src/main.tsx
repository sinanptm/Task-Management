import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import App from './App.tsx';
import { Toaster } from './components/ui/toaster.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <main className='bg-slate-300 h-screen'>
      <App />
      <Toaster />
    </main>
  </StrictMode>,
);
