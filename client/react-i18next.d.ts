import { resources, defaultNS } from "./src/i18n/config";

// react-i18next versions higher than 11.11.0
declare module "react-i18next" {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: typeof resources["en"];
  }
}
