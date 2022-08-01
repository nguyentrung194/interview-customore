import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import environment from "../../../config";
import axios from "axios";
import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

export default function SoloCreateOption({ setData }: any) {
  const [value, setValue] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [options, setOptions] = React.useState<string[]>([]);
  const [listed, setListed] = React.useState(false);

  React.useEffect(() => {
    async function fetchData(value: string) {
      setLoading(true);
      await axios({
        url: `${environment.api}crawl`,
        // url: `http://localhost:5000/crawl`,
        method: "GET",
        params: {
          search: value,
        },
      })
        .then(({ data: { data } }) => {
          setData(data);
          console.log(data);
          setLoading(false);
          if (options.indexOf(value) < 0) {
            setOptions([...options, value]);
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
    if (!!value) {
      fetchData(value);
    }
  }, [setData, value]);

  React.useEffect(() => {
    async function listKeys() {
      setLoading(true);
      await axios({
        url: `${environment.api}list-keys`,
        // url: `http://localhost:5000/list-keys`,
        method: "GET",
      })
        .then(({ data: { data } }) => {
          setOptions(
            data?.map((e: string) => {
              return decodeURIComponent(e);
            })
          );
          console.log(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
      setListed(true);
    }
    if (!listed) {
      listKeys();
    }
  }, [listed]);

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue || "");
        }}
        id="free-solo"
        freeSolo
        options={options}
        renderInput={(params) => (
          <TextField {...params} label="Search by keyword" />
        )}
        sx={{ width: 300, paddingRight: "12px" }}
        loading={loading}
        loadingText={"Wait a sec..."}
      />
      {loading && <CircularProgress />}
    </Box>
  );
}
