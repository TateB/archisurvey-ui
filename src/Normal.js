import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

function Normal(props) {
  if (props.loading || props.results.length < 1) return null;
  return props.results[props.selectedResult].availability.map((result) => (
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
          {props.sortToArray(result).map((item) => (
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
  ));
}

export default Normal;
