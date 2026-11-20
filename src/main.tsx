import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { MotionConfig } from 'motion/react';
import App from './App.tsx';
import './index.css';
import { ErrorBoundary } from './ErrorBoundary.tsx';
import { runDesignIntro } from './designIntro.ts';

// Se prepara antes del primer render para ocultar el inicio antes de que se pinte
runDesignIntro();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <MotionConfig reducedMotion="user">
        <App />
      </MotionConfig>
    </ErrorBoundary>
  </StrictMode>,
);
