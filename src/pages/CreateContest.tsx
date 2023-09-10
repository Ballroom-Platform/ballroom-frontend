import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Button from "@mui/material/Button";
import { Layout } from "../components/templates";
import { useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { createContest } from "../api/admin";
import { BalDateTime } from "../helpers/interfaces";
import { useApp } from "../hooks/useApp";
import { IconButton, Snackbar } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import MdFileIcon from '@mui/icons-material/FileCopy';
import { useNavigate } from "react-router"
import { getDateString, getUTCDateString } from "../helpers/dateConverter";
import { InputWrapper } from "../components";

const CreateContest = () => {

    const [contestTitle, setcontestTitle] = useState<string>("");
    const [startTime, setstartTime] = useState<BalDateTime | null>();
    const [endTime, setendTime] = useState<BalDateTime | null>();
    const [showNotification, setshowNotification] = useState(false);
    const {appState} = useApp()
    const utcTimestamp = Date.now();
    const navigate = useNavigate();
    const [readmeFile, setReadmeFile] = useState({} as FileList);
    const [fontColor, setFontColor] = useState<string>('red');

    const axiosIns = useAxiosPrivate();

    const navigateContest = () => {
        const startTimeInMilliseconds = Date.parse(getUTCDateString(startTime!));
        const endTimeInMilliseconds = Date.parse(getUTCDateString(endTime!))
        const nowTimeInMilliseconds = utcTimestamp;

        if (startTimeInMilliseconds < endTimeInMilliseconds && endTimeInMilliseconds < nowTimeInMilliseconds) {
            navigate("/pastContests");
        } else if (startTimeInMilliseconds > nowTimeInMilliseconds && endTimeInMilliseconds > nowTimeInMilliseconds) {
            navigate("/upcomingContests");
        } else {
            navigate("/ongoingContests");
        }
    }

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('readme', readmeFile[0], "readmecontest001 "+ "_" + Date.now());
        formData.append('title', contestTitle);  
        formData.append('startTime', getUTCDateString(startTime!));
        formData.append('endTime', getUTCDateString(endTime!));
        formData.append('moderator', appState.auth.userID!);
        createContest(axiosIns, formData, (res: any) => {setshowNotification(true); clearAllInputs(); navigateContest();}, (err: any) => console.log("ERROR OCCURED")) 
    }

    const onReadmeFileChange = (e : any) => {
        setReadmeFile(prev => ({...prev, ...e.target.files}));
        setFontColor('green');
    }

    const clearAllInputs = () => {
        setcontestTitle("");
        setReadmeFile({} as FileList);
        setstartTime(null);
        setendTime(null);
    }

    return ( 
        <Layout>
            <Typography variant="h4" gutterBottom>
                    Create a Contest
            </Typography>

            <TextField id="outlined-basic" label="Title" variant="outlined" value={contestTitle} sx={{marginY:2}} onChange={(e) => setcontestTitle(e.target.value)}/>
            <div style={{display:'flex', alignItems: 'center'}}>
                <MdFileIcon style={{marginRight:10}}/>
                <InputWrapper  label="Upload contest details as .md file: "><input onChange={onReadmeFileChange} id="readmeInput" type="file" name="readmeFile" accept=".md" style={{color: fontColor, fontFamily:'Poppins', marginLeft:20}}/></InputWrapper>
            </div>
            <div style={{ padding: '10px', borderRadius: '8px', display: 'flex', alignItems: 'center', background: '#eff7ff'}}>
                <div style={{color: '#808080'}}>
                    <p style={{ display: 'flex', alignItems: 'center'}}> 
                        <InfoIcon sx={{marginRight: '0.5rem'}}/>
                        You can include the following details in the .md file:
                    </p>
                    <ul>
                        <li>Contest description</li>
                        <li>Contest rules</li>
                        <li>Prizes and rewards</li>
                        <li>Submission guidelines</li>
                        <li>Important dates</li>
                    </ul>
                </div>
            </div>

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

            {startTime && endTime && ((Date.parse(getDateString(startTime)) > Date.parse(getDateString(endTime))) && 
            (<>
                <Typography variant="body1" color="error">Start Time cannot be greater than End Time</Typography><Button variant="outlined" disabled>Create</Button>
            </>) || (<Button variant="contained" onClick={() => handleSubmit()}>Create</Button>))}

            {!(startTime && endTime) && (<Button variant="outlined" disabled>Create</Button>) }

            <Snackbar  open={showNotification} autoHideDuration={6000} onClose={() => setshowNotification(false)} message="Contest Successfully Created" action={ <IconButton size="small" aria-label="close" color="inherit" onClick={() => setshowNotification(false)}> <CloseIcon fontSize="small" /> </IconButton>} />

        </Layout>
     );
}
 
export default CreateContest;