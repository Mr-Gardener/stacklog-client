import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App.tsx';
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from './context/ThemeContext.tsx';
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <>
            <App />
            <Toaster position="top-right" reverseOrder={false} />
          </>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
