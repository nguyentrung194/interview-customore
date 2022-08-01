import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Spinner from "../components/spinner";
import Langiding from "../views/home";

export const LangdingRoute = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/" element={<Langiding />} />
        <Route path="/*" element={<Navigate to="/" replace={true} />} />
      </Routes>
    </Suspense>
  );
};
