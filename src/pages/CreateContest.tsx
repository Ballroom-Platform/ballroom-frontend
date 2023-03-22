import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Button from "@mui/material/Button";

const CreateContest = () => {
    return ( 
        <>
            <Typography variant="h3" gutterBottom>
                    Create a Contest
            </Typography>

            <TextField id="outlined-basic" label="Name" variant="outlined" />

            <LocalizationProvider sx={{border: '1px solid red'}} dateAdapter={AdapterDayjs}>
                <DemoContainer sx={{marginY: '1rem', width: '30%'}} components={['DateTimePicker']}>
                    <DateTimePicker label="Start Time" />
                    <DateTimePicker label="End Time" />

                </DemoContainer>
            </LocalizationProvider>

            {/* <TextField id="outlined-basic" label="Moderator" variant="outlined" /> */}

            <Button variant="contained">Create</Button>

        </>
     );
}
 
export default CreateContest;