import * as React from "react";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";
import "./style.scss";
import { ChartCustom } from "../../components/langding/chart";

export default function Langding() {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        padding: "24px",
      }}
    >
      <ChartCustom />
    </Box>
  );
}
