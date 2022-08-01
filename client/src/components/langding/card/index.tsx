import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, SvgIcon } from "@mui/material";
import * as images from "../../../assets";
import "./style.scss";
import DeleteIcon from "@mui/icons-material/Delete";
export default function CustomCard({
  title,
  description,
  pathIcon,
}: {
  title: string;
  description: string;
  pathIcon: string;
}) {
  return (
    <Card className="p-2">
      <CardContent>
        <Box className="flex items-center space-x-4 pb-4">
          <SvgIcon>
            <path d={pathIcon} />
          </SvgIcon>
          <Typography gutterBottom variant="h6" component="div">
            {title}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}
