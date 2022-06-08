import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.scss';
import App from './app.js'

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<App />);