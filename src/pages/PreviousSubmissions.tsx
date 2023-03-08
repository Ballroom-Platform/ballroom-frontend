import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import TableContainer from "@mui/material/TableContainer";
import TableCell from "@mui/material/TableCell";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import DownloadIcon from '@mui/icons-material/Download';


const PreviousSubmissions = () => {
    return ( 
        <>
            <Paper sx={{display: 'flex', justifyContent: "space-between", marginY: '2rem', paddingX: '3rem'}} elevation={0}>
                <Button variant="contained" startIcon={<ArrowBackIosNewIcon/>}>Back to Challenge</Button>
            </Paper>
            <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell >SubmissionId</TableCell>
              <TableCell align="center">Submitted Time</TableCell>
              <TableCell align="center">Score</TableCell>
              <TableCell align="center">Solution File</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.submissionId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" >
                  {row.submissionId}
                </TableCell>
                <TableCell align="center">{row.submittedTime}</TableCell>
                <TableCell align="center">{row.score}</TableCell>
                <TableCell align="center">
                    <Button variant="contained" startIcon={<DownloadIcon />}>
                        Download
                    </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
        </>
    );
}
 
export default PreviousSubmissions;

function createData(
    submissionId: string,
    submittedTime: string,
    score: number,
  ) {
    return { submissionId, submittedTime, score};
  }
  
  const rows = [
    createData('Sub__001', "2023/03/95 8.45PM", 6.0),
    createData('Sub__001', "2023/03/95 8.45PM", 9.0),
    createData('Sub__001', "2023/03/95 8.45PM", 16.0),
    createData('Sub__001', "2023/03/95 8.45PM", 3.7),
    createData('Sub__001', "2023/03/95 8.45PM", 16.0),
  ];
