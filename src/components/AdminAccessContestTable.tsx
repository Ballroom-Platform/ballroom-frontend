import { Box, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, IconButton, Snackbar } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { getContestAdminAccess, removeAccessFromContest } from "../api/admin";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

function createData(
    userId: string,
    userName: string,
    accessType: string,
    fullName: string
    ) {
    return { userId, userName,accessType, fullName};
}

interface IRow {
    userId: string;
    userName: string;
    fullName: string
    accessType: string;
}

interface IProps {
    contestId: string
    userID: string
}

interface AccessDetails {
    userId: string;
}

const AdminAccessContestTable = ({contestId,userID} : IProps) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [rows, setRows] = useState<Array<IRow>>([] as Array<IRow>);
    const axiosPrivate = useAxiosPrivate();
    const [showNotification, setshowNotification] = useState(false);
    const [showFailNotification, setshowFailNotification] = useState(false);

    const getSuccess = (res : AxiosResponse) => {
        const tempArr = res.data.data.map((item:IRow) => (createData(item.userId, item.userName , item.accessType, item.fullName)));
        console.log(tempArr);
        setRows([...tempArr]);
        setLoading(false);
    }
  
    const getFail = (err: AxiosError) =>{
        console.log("Getting data failed", err)
    }

    const removePermission = (userId: string) => {
        const accessDetails: AccessDetails = {userId: userId};
        removeAccessFromContest(axiosPrivate, contestId, accessDetails, (res: any) => {console.log(res); setshowNotification(true); setRows(rows.filter(row => row.userId !== userId)); }, (err: any) => {console.log("Error removing permission"); setshowFailNotification(true); }); 
    }

    useEffect(()=> {
      if(loading)
      {
        getContestAdminAccess(axiosPrivate, contestId, getSuccess, getFail);
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
                            <TableCell >Email</TableCell>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Access Type</TableCell>
                            <TableCell align="center"> </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {
                            rows.map((row) => (
                                <TableRow
                                key={row.userName}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell component="th" scope="row" >{row.userName}</TableCell>
                                <TableCell align="center">{row.fullName}</TableCell>
                                <TableCell align="center">{row.accessType}</TableCell>
                                {row.userId!==userID? <TableCell align="center"><Button variant="outlined" onClick={() => removePermission(row.userId)}>Remove Permission</Button></TableCell>:<TableCell align="center"></TableCell>}
                                </TableRow>
                            ))
                            }
                        </TableBody>
                    
                    </Table>

                    <Snackbar  open={showNotification} autoHideDuration={2000} onClose={() => setshowNotification(false)} message="permission Removed!" action={ <IconButton size="small" aria-label="close" color="inherit" onClick={() => setshowNotification(false)}> <CloseIcon fontSize="small" /> </IconButton>} />
    
                    <Snackbar  open={showFailNotification} autoHideDuration={2000} onClose={() => setshowFailNotification(false)} message="Remove permission fail." action={ <IconButton size="small" aria-label="close" color="inherit" onClick={() => setshowFailNotification(false)}> <CloseIcon fontSize="small" /> </IconButton>} />

                </TableContainer>
            )
        }
        </>
    );
}
 
export default AdminAccessContestTable;