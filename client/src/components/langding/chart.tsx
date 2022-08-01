import * as React from "react";
import Paper from "@mui/material/Paper";
import {
  Chart,
  BarSeries,
  ArgumentAxis,
  ValueAxis,
  Legend,
} from "@devexpress/dx-react-chart-material-ui";
import { ArgumentScale, Stack } from "@devexpress/dx-react-chart";
import { scaleBand } from "@devexpress/dx-chart-core";

import { Typography } from "@mui/material";
import SoloCreateOption from "./input";
import { Box } from "@mui/system";

export const ChartCustom = () => {
  const Label =
    (symbol: string) =>
    (
      props: JSX.IntrinsicAttributes &
        ValueAxis.LabelProps & {
          [x: string]: any;
          className?: string | undefined;
          style?: React.CSSProperties | undefined;
        } & { children?: React.ReactNode }
    ) => {
      const { text } = props;
      return <ValueAxis.Label {...props} text={text + symbol} />;
    };

  const PercentLabel = Label("%");

  const [data, setData] = React.useState([]);

  return (
    <Paper
      sx={{
        width: "100%",
        padding: "18px 12px 0 12px",
        position: "relative",
      }}
    >
      <Typography
        gutterBottom
        variant="h6"
        sx={{ textAlign: "center" }}
        component="div"
      >
        Share of Search
      </Typography>
      <Box sx={{ position: "absolute", right: 48, bottom: 24 }}>
        <SoloCreateOption setData={setData} />
      </Box>
      <Chart data={data} rotated={true}>
        <ArgumentScale factory={scaleBand} />
        <ArgumentAxis />
        <ValueAxis
          // scaleName="price"
          position="bottom"
          labelComponent={PercentLabel}
        />

        <BarSeries
          valueField="countProductShopee"
          argumentField="brandName"
          name="Shopee"
        />
        <BarSeries
          valueField="countProductLazada"
          argumentField="brandName"
          name="Lazada"
        />
        <Stack />
        <Legend position="bottom" />
      </Chart>
    </Paper>
  );
};
