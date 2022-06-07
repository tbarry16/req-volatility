import React from "react";
import { createRoot } from 'react-dom/client';
import Main from "../public/main";
import "./styles.scss"; 
const container = document.getElementById('app');
const root = createRoot(container);
// import "typeface-cormorant";



root.render(<App/>);