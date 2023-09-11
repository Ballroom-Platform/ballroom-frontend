import { Button, Snackbar, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { editContest, getContest } from "../api/admin";
import { Layout } from "../components/templates";
import { BalDateTime, IMinimalContest } from "../helpers/interfaces";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { InputWrapper } from "../components";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { getDateString, getUTCDateString } from "../helpers/dateConverter";

type IParams = {
    contestId: string;
};

const EditContest = () => {
    const {contestId} = useParams<IParams>()

    const [loading, setLoading] = useState<boolean>(true);
    const [showSuccessNotification, setshowSuccessNotification] = useState(false);
    const [showFailNotification, setshowFailNotification] = useState(false);
    const [readmeFile, setReadmeFile] = useState({} as FileList);
    const axiosIns = useAxiosPrivate();
    const [contest, setcontest] = useState<IMinimalContest>();
    const [startTime, setstartTime] = useState<BalDateTime | null>();
    const [endTime, setendTime] = useState<BalDateTime | null>();
    const [bannerImage, setBannerImage] = useState<File | null>(null);

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('title', contest!.title);
        formData.append('startTime', getUTCDateString(startTime!));
        formData.append('endTime', getUTCDateString(endTime!));
        formData.append('readme', readmeFile[0], "readme001 "+ "_" + Date.now());
        if (bannerImage) {
            formData.append('bannerImage', bannerImage, "bannerImage001 " + "_" + Date.now());
        }
        editContest(axiosIns, formData, contestId!, (res: any) => {setshowSuccessNotification(true);}, (err: any) => setshowFailNotification(true));
    }

    const onReadmeFileChange = (e : any) => {
        setReadmeFile(prev => ({...prev, ...e.target.files}));
    }

    const onBannerImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setBannerImage(file);
        }
    }

    useEffect(() => {
        getContest(axiosIns, contestId!,(res: any) => {setcontest(res.data); setLoading(false);}, () => console.log("ËRROR OCCURRED"));
    }, [contestId])

    return ( 
        <Layout>
            
            {loading && <div>Loading...</div>}

            {!loading && <>
                    <Typography variant="h3" gutterBottom>
                        Edit Contest
                    </Typography>

                    <TextField sx={{marginY: '2rem'}} id="outlined-basic" label="Title" variant="outlined" defaultValue={contest!.title} onChange={(e) => setcontest({...contest!, title: e.target.value})}/>

                    <br/>

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

                    <br/>

                    <InputWrapper  label="Upload updated Readme .md File: "><input onChange={onReadmeFileChange} id="readmeInput" type="file" name="readmeFile" accept=".md"  style={{ flex: 5 }}/></InputWrapper>

                    <br/>

                    <InputWrapper label="Upload new Contest banner image: "><input onChange={onBannerImageChange} id="bannerImageInput" type="file" name="bannerImage" accept="image/*" style={{ flex: 5 }} /></InputWrapper>

                    {bannerImage && (<div>
                        <h4>Selected Image Preview:</h4>
                        <img
                            src={URL.createObjectURL(bannerImage)}
                            alt="Selected Image"
                            width="300"
                            height="200"
                        />
                    </div>)}

                    {startTime && endTime && ((Date.parse(getDateString(startTime)) > Date.parse(getDateString(endTime))) && 
                        (<>
                            <Typography variant="body1" color="error">Start Time cannot be greater than End Time</Typography><Button variant="outlined" disabled>Create</Button>
                        </>) || (<Button variant="contained" onClick={()=>handleSubmit()}>Update</Button>))
                    }

                    {!(startTime && endTime) && (<Button variant="contained" onClick={()=>handleSubmit()}>Update</Button>) }

                    <Snackbar open={showSuccessNotification} autoHideDuration={6000} onClose={() => setshowSuccessNotification(false)} message="Contest Updated Successfully" />

                    <Snackbar open={showFailNotification} autoHideDuration={6000} onClose={() => setshowFailNotification(false)} message="Contest Updated Failed!!!" />
            </>}
        </Layout>
    );
}
 
export default EditContest;