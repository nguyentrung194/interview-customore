import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import "./style.scss";

export const MainLayout = () => {
  return (
    <Box>
      <Box
        className="container_layout"
        sx={{
          backgroundColor: "background.default",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};
