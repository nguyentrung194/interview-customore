import React from "react";
import ReactDOM from "react-dom";
import { I18nextProvider } from "react-i18next";
import reportWebVitals from "./reportWebVitals";
import i18n from "./i18n/config";
import { BrowserRouter } from "react-router-dom";
import "./index.scss";
import AppMode from "./AppMode";
import { ToastProvider } from "react-toast-notifications";

ReactDOM.render(
  <React.StrictMode>
    <ToastProvider autoDismissTimeout={3000} placement="top-right">
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <div className="reset_css">
            <AppMode />
          </div>
        </BrowserRouter>
      </I18nextProvider>
    </ToastProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
