import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import TableCell from "@mui/material/TableCell";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import DownloadIcon from '@mui/icons-material/Download';
import { Layout } from "../components/templates";
import { useEffect, useState } from "react";
import { getSubmissionFile, getSubmissions } from "../api/contestant";
import { axiosPrivate } from "../api/axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useParams } from "react-router";
import { useApp } from "../hooks/useApp";
import { AxiosError, AxiosResponse } from "axios";


interface IRow {
  submissionId: string;
  submittedTime: ISubmissionTime;
  score: number;
}

type IParams = {
  challengeId: string;
  contestId : string
};

interface ISubmissionTime {
  year:number;
  month:number;
  day:number;
  hour:number;
  minute:number;
  second:number;
}

interface ISubmission{
  submission_id : string;
  user_id:string;
  contest_id:string;
  challenge_id:string;
  submitted_time:ISubmissionTime;
  score:number;
};


const PreviousSubmissions = () => {

    const [loading, setLoading] = useState<boolean>(true);
    const [rows, setRows] = useState<Array<IRow>>([] as Array<IRow>);
    const axiosPrivate = useAxiosPrivate();
    const {appState} = useApp();
    const {contestId, challengeId} = useParams<IParams>();
    const userId = appState.auth.userID;

    const getSubmissionFileSucess = (res : AxiosResponse, submissionId: string) => {
      var link = document.createElement("a");
      link.href = window.URL.createObjectURL(new Blob([res.data]));
      link.download = "submission_" + submissionId + ".zip";
      link.click();
  }

  const getSubmissionFileFail = () => {
      console.log("Getting template failed")
  }

  const downloadFunction = async (submissionId: string) => {
      getSubmissionFile(axiosPrivate, submissionId, getSubmissionFileSucess, getSubmissionFileFail)
  }

    const getSubmissionsSuccess = (res : AxiosResponse) => {
      const tempArr = res.data.data.map((item:ISubmission) => (createData(item.submission_id, item.submitted_time, item.score)));
      console.log("Running timer");
      setRows([...tempArr]);
      setLoading(false);
    }

    const getSubmissionFail = (err: AxiosError) =>{
      console.log("Getting submissions failed", err.message)
    }

    useEffect(()=> {
      let poll: string | number | NodeJS.Timer | undefined;
      if(loading)
      {
        poll = setInterval(() => {
          getSubmissions(axiosPrivate, userId!, contestId, challengeId, getSubmissionsSuccess, getSubmissionFail)
        }, 5000);
      }

      return () => {
        clearInterval(poll);
      }
      
    }, [])

    return ( 
        <Layout>
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
            {loading === false && (
              rows.map((row) => (
                <TableRow
                  key={row.submissionId}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row" >
                    {row.submissionId}
                  </TableCell>
                  <TableCell align="center">{ new Date(row.submittedTime.year, row.submittedTime.month - 1, row.submittedTime.day, row.submittedTime.hour, row.submittedTime.minute, row.submittedTime.second).toLocaleString()}</TableCell>
                  <TableCell align="center">{(row.score) ? row.score : "pending"}</TableCell>
                  <TableCell align="center">
                      <Button variant="outlined" onClick={() => downloadFunction(row.submissionId)} startIcon={<DownloadIcon />}>
                          Download
                      </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
        </Layout>
    );
}
 
export default PreviousSubmissions;

function createData(
    submissionId: string,
    submittedTime: ISubmissionTime,
    score: number,
  ) {
    return { submissionId, submittedTime, score};
  }
