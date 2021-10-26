import {
  Card,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import "./App.css";
import { archExport } from "./archExport";
import { clientExport } from "./clientExport";
import { agreeArray, satisfactionArray } from "./Definitions.js";
import { fetchDb } from "./fbManager";

function App() {
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

  const translateData = (entry) => {
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

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Card
        elevation={2}
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          flexDirection: "column",
          minWidth: "250px",
          padding: "20px",
          margin: "20px",
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
        {loading || results.length < 1
          ? null
          : results[selectedResult].availability.map((result) => (
              <TableContainer
                sx={{
                  marginBottom: "20px",
                  marginLeft: "20px",
                  marginRight: "20px",
                }}
                component={Paper}
                key={result}
              >
                <Typography variant="h3" sx={{ margin: "15px" }}>
                  {result}
                </Typography>
                <Table sx={{ minWidth: 300 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Question</TableCell>
                      <TableCell align="right">Answer(s)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sortToArray(result).map((item) => (
                      <TableRow
                        key={item.index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {item.question}
                        </TableCell>
                        <TableCell align="right">{item.answer}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ))}
      </Paper>
    </Box>
  );
}

export default App;
