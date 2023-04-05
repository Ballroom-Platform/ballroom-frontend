import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Button from "@mui/material/Button";
import { Layout } from "../components/templates";
import { useContext, useEffect, useState } from "react";
import internal from "stream";
import { valueToPercent } from "@mui/base";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { createContest } from "../api/admin";
import { BalDateTime } from "../helpers/interfaces";
import { useApp } from "../hooks/useApp";
import { useAuthContext } from "@asgardeo/auth-react";
import { IconButton, Snackbar } from "@mui/material";
import React from "react";
import CloseIcon from '@mui/icons-material/Close';

const CreateContest = () => {

    const [contestName, setcontestName] = useState<string>("");
    const [contestDescription, setcontestDescription] = useState<string>("");
    const [startTime, setstartTime] = useState<BalDateTime>();
    const [endTime, setendTime] = useState<BalDateTime>();
    const [showNotification, setshowNotification] = useState(false);
    const {appState} = useApp()
    console.log(appState);

    const axiosIns = useAxiosPrivate();

    const clearAllInputs = () => {
        setcontestName("");
        setcontestDescription("");
        setstartTime(undefined);
        setendTime(undefined);
    }

    return ( 
        <Layout>
            <Typography variant="h3" gutterBottom>
                    Create a Contest
            </Typography>

            <TextField id="outlined-basic" label="Name" variant="outlined" value={contestName} onChange={(e) => setcontestName(e.target.value)}/>

            <TextField fullWidth multiline rows={4} sx={{marginY: '1rem'}}  id="outlined-basic" label="Description" variant="outlined" value={contestDescription} onChange={(e) => setcontestDescription(e.target.value)}/>

            <LocalizationProvider sx={{border: '1px solid red'}} dateAdapter={AdapterDayjs}>
                <DemoContainer sx={{marginY: '1rem', width: '30%'}} components={['DateTimePicker']}>
                    <DateTimePicker label="Start Time" onChange={(value: any, context) => setstartTime({
                        year: value.$y,
                        month: value.$M + 1,
                        day: value.$D,
                        hour: value.$H,
                        minute: value.$m,
                        second: value.$s
                    })}/>

                    <DateTimePicker label="End Time" onChange={(value: any, context) => setendTime({
                        year: value.$y,
                        month: value.$M + 1,
                        day: value.$D,
                        hour: value.$H,
                        minute: value.$m,
                        second: value.$s
                    })}/>

                </DemoContainer>
            </LocalizationProvider>

            {startTime && endTime && (<Button variant="contained" onClick={() => createContest(axiosIns, {title: contestName, description: contestDescription, startTime: startTime, endTime: endTime, moderator: appState.auth.userID!},(res: any) => {console.log(res); setshowNotification(true); clearAllInputs()}, (err: any) => console.log(err))}>Create</Button>)}

            {!(startTime && endTime) && (<Button variant="outlined" disabled>Create</Button>) }

            <Snackbar  open={showNotification} autoHideDuration={6000} onClose={() => setshowNotification(false)} message="Contest Successfully Created" action={ <IconButton size="small" aria-label="close" color="inherit" onClick={() => setshowNotification(false)}> <CloseIcon fontSize="small" /> </IconButton>} />

        </Layout>
     );
}
 
export default CreateContest;