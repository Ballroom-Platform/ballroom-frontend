import { Box, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { getScoreboard } from "../api/contestant";
import { Layout } from "./templates"
import { useApp } from "../hooks/useApp";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { BalDateTime } from "../helpers/interfaces";
import { formatUTCDate, getDateString } from "../helpers/dateConverter";

function createData(
    title: string,
    score: number,
    submittedTime: BalDateTime
    ) {
    return { title, score, submittedTime};
}

interface IRow {
    title: string,
    score: number,
    submittedTime: BalDateTime
}

interface IProps {
    contestId: string
}

const ScoreBoardTable = ({contestId} : IProps) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [rows, setRows] = useState<Array<IRow>>([] as Array<IRow>);
    const axiosPrivate = useAxiosPrivate();
    const {appState} = useApp();
    const userId = appState.auth.userID;

    const getSubmissionsSuccess = (res : AxiosResponse) => {
      const tempArr = res.data.data.map((item:IRow) => (createData(item.title, item.score, item.submittedTime)));
      setRows([...tempArr]);
      setLoading(false);
    }

    const getSubmissionFail = (err: AxiosError) =>{
      console.log("Getting submissions failed", err)
    }

    useEffect(()=> {
      if(loading)
      {
        getScoreboard(axiosPrivate, contestId,userId!, getSubmissionsSuccess, getSubmissionFail)
      }
      
    }, [])

    return ( 
        <>
        {
            loading && <Box width="100%" textAlign="center" padding="40px"><CircularProgress /></Box>
        }
        {
            !loading && (
                <TableContainer component={Paper}>

                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    
                        <TableHead>
                            <TableRow>
                            <TableCell >Challenge Title</TableCell>
                            <TableCell align="center">submitted Time</TableCell>
                            <TableCell align="center">Score</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                            rows.map((row) => (
                                <TableRow
                                key={row.title}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell component="th" scope="row" >
                                    {row.title}
                                </TableCell>
                                <TableCell align="center">{formatUTCDate(getDateString(row.submittedTime))}</TableCell>
                                <TableCell align="center">{row.score}</TableCell>
                                </TableRow>
                            ))
                            }
                        </TableBody>
                    
                    </Table>
      </TableContainer>
            )
        }
        </>
    );
}
 
export default ScoreBoardTable;