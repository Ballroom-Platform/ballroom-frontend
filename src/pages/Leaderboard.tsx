import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getLeaderboard } from "../api/contestant";
import { Layout } from "../components/templates"
import { useApp } from "../hooks/useApp";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

function createData(
    userId: string,
    score: number,
    name: string
    ) {
    return { userId, score, name};
}


interface IRow {
    userId: string;
    name: string
    score: number;
}

type IParams = {
    contestId : string
};

export const Leaderboard : React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [rows, setRows] = useState<Array<IRow>>([] as Array<IRow>);
    const axiosPrivate = useAxiosPrivate();
    const {appState} = useApp();
    const {contestId} = useParams<IParams>();
    const userId = appState.auth.userID;

    const getSubmissionsSuccess = (res : AxiosResponse) => {
      const tempArr = res.data.data.map((item:IRow) => (createData(item.userId, item.score, item.name)));
      setRows([...tempArr]);
      setLoading(false);
    }

    const getSubmissionFail = (err: AxiosError) =>{
      console.log("Getting submissions failed", err.message)
    }

    useEffect(()=> {
      if(loading)
      {
        getLeaderboard(axiosPrivate, contestId, getSubmissionsSuccess, getSubmissionFail)
      }
      
    }, [])

    return ( 
        <Layout>
            <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          {
            loading === false && (
                <>
                    <TableHead>
                        <TableRow>
                        <TableCell >User Id</TableCell>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Score</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                        rows.map((row) => (
                            <TableRow
                            key={row.userId}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row" >
                                {row.userId}
                            </TableCell>
                            <TableCell align="center">{row.name}</TableCell>
                            <TableCell align="center">{row.score}</TableCell>
                            </TableRow>
                        ))
                        }
                    </TableBody>
                </>
            )
          }
        </Table>
      </TableContainer>
        </Layout>
    );
}