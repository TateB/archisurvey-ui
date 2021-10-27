import {
  Button,
  Card,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import XLSX from "xlsx";
import "./App.css";
import { archExport } from "./archExport";
import { clientExport } from "./clientExport";
import { agreeArray, csvHeaders, satisfactionArray } from "./Definitions.js";
import { fetchDb } from "./fbManager";
import Normal from "./Normal";

function App() {
  const [mode, setMode] = useState(0);
  const [dbState, setDbState] = useState("formdata");
  const [results, setResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => setLoading(true), [setDbState]);

  useEffect(
    () =>
      fetchDb(dbState)
        .then((docs) =>
          docs.map((doc) => {
            const docData = doc.data();
            const availability = [];
            if ("architect" in docData) availability.push("architect");
            if ("client" in docData) availability.push("client");
            docData.availability = availability;
            docData.id = doc.id;

            return docData;
          })
        )
        .then((initDocs) => setResults(initDocs))
        .then(() => setLoading(false)),
    [dbState]
  );

  const translateData = (entry, isCSV = false) => {
    if (isCSV && entry.components !== undefined)
      return entry.answer.map((item, inx) => ({
        name: entry.components[inx],
        answer: entry.options[item],
      }));

    switch (entry.type) {
      case "int":
        return entry.answer;
      case "float":
        return entry.answer;
      case "bool":
        if (entry.answer === undefined) return "";
        return entry.answer ? "No" : "Yes";
      case "string":
        return entry.answer;
      case "date":
        return entry.answer;
      case "multichoice":
        return entry.options[entry.answer] !== undefined
          ? entry.options[entry.answer]
          : entry.answer;
      case "agreespread":
        if (entry.answer instanceof Boolean) return `${entry.answer}`;
        return agreeArray[entry.answer - 1];
      case "satisfyspread":
        return satisfactionArray[entry.answer - 1];
      case "multichoice-array":
        if (!(entry.answer instanceof Array))
          return entry.options[entry.answer] !== undefined
            ? entry.options[entry.answer]
            : entry.answer;
        if (entry.components !== undefined)
          return entry.answer.map((item, inx) => (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              <Typography sx={{ fontWeight: "bold", textAlign: "left" }}>
                {entry.components[inx]}
              </Typography>
              <Box sx={{ flexGrow: 1 }}></Box>
              <Typography>{entry.options[item]}</Typography>
            </Box>
          ));
        return entry.answer
          .map((item) =>
            entry.options[item] !== undefined ? entry.options[item] : item
          )
          .join(", ");
    }
  };

  const sortToArray = (type) => {
    const defsObj = type === "architect" ? archExport : clientExport;
    const dataRef = results[selectedResult][type];
    const sortedData = defsObj.map((def) => {
      var newDef = def;
      newDef.answer = dataRef[def.name];
      newDef.answer = translateData(newDef);

      return newDef;
    });

    console.log(sortedData);

    return sortedData;
  };

  const downloadXLSX = () => {
    const translatedArray = results.map((item) => {
      if (item.architect) {
        Object.keys(item.architect).forEach((key) => {
          const entry = archExport.find((x) => x.name === key);
          entry.answer = item.architect[key];

          item.architect[key] = translateData(entry, true);
        });
      }
      if (item.client) {
        Object.keys(item.client).forEach((key) => {
          const entry = clientExport.find((x) => x.name === key);
          entry.answer = item.client[key];

          item.client[key] = translateData(entry, true);
        });

        item.client["projectSatisfaction"].forEach((satItem) => {
          item.client[
            "projectSatisfaction" +
              satItem.name.substr(0, 1) +
              satItem.name
                .substr(1)
                .toLowerCase()
                .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
          ] = satItem.answer;
        });

        delete item.client["projectSatisfaction"];
      }
      const newObj = {};
      csvHeaders.forEach((header) => {
        const splitValue = header.value.split(".");
        if (item[splitValue[0]] === undefined) return;
        newObj[header.label] = splitValue[1]
          ? item[splitValue[0]][splitValue[1]]
          : item[splitValue[0]];
      });
      console.log(newObj);
      return newObj;
    });
    const header = csvHeaders.map((header) => header.label);
    const ws = XLSX.utils.json_to_sheet(translatedArray, { header });
    const wb = XLSX.utils.book_new();

    ws["!cols"] = csvHeaders.map((item) => ({
      wch: item.label.length > 10 ? item.label.length : 10,
    }));

    XLSX.utils.book_append_sheet(wb, ws, "archisurvey");
    XLSX.writeFile(wb, "archisurvey.xlsx");

    /*const fields = csvHeaders;
    const csvParser = new Parser({ fields, excelStrings: true });
    const csv = csvParser.parse(translatedArray);
    var blob = new Blob([csv], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8;",
    });

    console.log(csv);

    var link = document.createElement("a");
    var url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "archisurvey-ui.xls");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);*/
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          margin: "20px",
        }}
      >
        <Card
          elevation={2}
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            flexDirection: "column",
            width: "100%",
            padding: "20px",
            marginBottom: "10px",
          }}
        >
          <Typography
            sx={{
              marginBottom: "20px",
            }}
          >
            Form Selector
          </Typography>
          <TextField
            sx={{
              marginBottom: "10px",
            }}
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            select
            fullWidth
            label="Mode"
          >
            <MenuItem value={0}>Individual Results</MenuItem>
            <MenuItem value={1}>Charted Results</MenuItem>
          </TextField>
          <TextField
            sx={{
              marginBottom: "10px",
            }}
            value={dbState}
            onChange={(e) => setDbState(e.target.value)}
            select
            fullWidth
            label="Database"
          >
            <MenuItem value="formdata">Normal Results</MenuItem>
            <MenuItem value="errored">Error Results</MenuItem>
          </TextField>
          <TextField
            value={selectedResult}
            onChange={(e) => setSelectedResult(e.target.value)}
            select
            fullWidth
            label="Address"
            disabled={loading || results.length < 1}
          >
            {results.map((result, inx) => (
              <MenuItem value={inx} key={inx}>
                {dbState === "formdata" ? result.formattedAddress : result.id}
              </MenuItem>
            ))}
          </TextField>
        </Card>
        <Card
          elevation={2}
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            flexDirection: "column",
            minWidth: "250px",
            padding: "20px",
            width: "100%",
          }}
        >
          <Typography
            sx={{
              marginBottom: "20px",
            }}
          >
            Export Data
          </Typography>
          <Button
            variant="contained"
            sx={{ width: "100%" }}
            onClick={() => downloadXLSX()}
            disabled={mode !== 0 || dbState !== "formdata"}
          >
            Download XLSX
          </Button>
        </Card>
      </Box>
      <Paper
        sx={{
          flexGrow: 1,
          margin: "20px",
          minHeight: "calc(100% - 80px)",
          display: "flex",
          flexDirection: "row",
          "&:first-child": {
            marginLeft: 0,
          },
          "&:last-child": {
            marginRight: 0,
          },
        }}
        elevation={0}
      >
        <Normal
          loading={loading}
          results={results}
          selectedResult={selectedResult}
          sortToArray={sortToArray}
        />
      </Paper>
    </Box>
  );
}

export default App;
