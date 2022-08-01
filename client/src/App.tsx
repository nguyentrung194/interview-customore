import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { MainLayout } from "./layouts/mainLayout";
import { LangdingRoute } from "./routes/langding";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/*" element={<LangdingRoute />} />
        <Route path="/*" element={<Navigate to="/" replace={true} />} />
      </Route>
    </Routes>
  );
}

export default App;
