import { Box, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { getLeaderboard } from "../api/contestant";
import { Layout } from "./templates"
import { useApp } from "../hooks/useApp";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

function createData(
    fullname: string,
    score: number,
    username: string
    ) {
    return { fullname, score, username};
}

interface IRow {
    fullname: string;
    username: string
    score: number;
}

interface IProps {
    contestId: string
}

const LeaderboardTable = ({contestId} : IProps) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [rows, setRows] = useState<Array<IRow>>([] as Array<IRow>);
    const axiosPrivate = useAxiosPrivate();
    const {appState} = useApp();
    const userId = appState.auth.userID;

    const getSubmissionsSuccess = (res : AxiosResponse) => {
      const tempArr = res.data.data.map((item:IRow) => (createData(item.fullname, item.score, item.username)));
      setRows([...tempArr]);
      setLoading(false);
    }

    const getSubmissionFail = (err: AxiosError) =>{
      console.log("Getting submissions failed", err)
    }

    useEffect(()=> {
      if(loading)
      {
        getLeaderboard(axiosPrivate, contestId, getSubmissionsSuccess, getSubmissionFail)
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
                            <TableCell >Name</TableCell>
                            <TableCell align="center">Username/Email</TableCell>
                            <TableCell align="center">Score</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                            rows.map((row) => (
                                <TableRow
                                key={row.username}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell component="th" scope="row" >
                                    {row.fullname}
                                </TableCell>
                                <TableCell align="center">{row.username}</TableCell>
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
 
export default LeaderboardTable;