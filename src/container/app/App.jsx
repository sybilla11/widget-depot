import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import WidgetBuilder from "../widgetBuilder/widgetBuilder";

function App() {
  return (
    <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/widgets/:id" element={<WidgetBuilder />}></Route>
        <Route path="/" element={<WidgetBuilder />}></Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
