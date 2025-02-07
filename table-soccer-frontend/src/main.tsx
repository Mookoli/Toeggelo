import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // Ensure it imports App.tsx
import "./index.css"; // If you're keeping the default styles

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
