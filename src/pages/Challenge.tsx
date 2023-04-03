import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useHistory, useLocation, useParams } from "react-router";
import { Layout } from "../components/templates";
import axios, { AxiosResponse } from "axios";
import { BFF_URLS } from "../links";
import { IChallenge } from "../helpers/interfaces";
import { useEffect, useState } from "react";
import { getChallenge } from "../api/admin";
import { axiosPrivate } from "../api/axios";
import { getTemplate, uploadSubmission } from "../api/contestant";
import { useApp } from "../hooks/useApp";

type IParams = {
    challengeId: string;
    contestId : string
};

interface IErrorStates {
    emptyFields : boolean;
    uploadFailed: boolean
}

interface ISuccessStates{
    uploadComplete: boolean
}

const Challenge : React.FC = () => {
    const history = useHistory();
    const defaultErrorStates : IErrorStates= {emptyFields : false, uploadFailed: false}
    const defaultSuccessStates : ISuccessStates = {uploadComplete: false};
    const {challengeId, contestId} = useParams<IParams>()
    const location = useLocation();
    const [loading, setLoading] = useState<boolean>(true);
    const [submissionFile, setSubmissionFile] = useState({} as FileList);
    const [errorStates, setErrorStates] = useState<IErrorStates>(defaultErrorStates);
    const [sucessStates, setSuccessStates] = useState<ISuccessStates>(defaultSuccessStates)
    const [submissionId, setSubmissionId] = useState<string | null>(null);
    const {appState} = useApp();
    const handler = () => {
        history.push(location.pathname + "/previousSubmissions");
    }

    const [challenge, setChallenge] = useState<IChallenge>({} as IChallenge);

    const getTemplateSucess = (res : AxiosResponse) => {
        var link = document.createElement("a");
        link.href = window.URL.createObjectURL(new Blob([res.data]));
        link.download = "template.zip";
        link.click();
    }

    const getTemplateFail = () => {
        console.log("Getting template failed")
    }

    const downloadFunction = async () => {
        getTemplate(axiosPrivate, challengeId, getTemplateSucess, getTemplateFail)
    }

    const onSubmissionFileChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setSubmissionFile(prev => ({...prev, ...event.target.files}));
    }

    const onSubmit = () => {
        if(Object.keys(submissionFile).length === 0){
            setErrorStates(prev => ({...prev, emptyFields : true}));
        return;
        }

        const userId = appState.auth?.userID;
        console.log("user id: ", userId, challengeId, contestId);
        setErrorStates(defaultErrorStates);

        const formData = new FormData();
        formData.set("userId", userId!);
        formData.set("challengeId", challengeId);
        formData.set("contestId", contestId);
        formData.set('submission', submissionFile[0], userId + "_" + contestId + "_" + challengeId + "_" + Date.now());

        const successHandler = (res: AxiosResponse) => {
            setSuccessStates(prev => ({...prev, uploadComplete: true}));
            setSubmissionId(res.data);
            console.log(res);
        }

        const failHandler = () => {
            setSuccessStates(defaultSuccessStates);
            setErrorStates(prev => ({...prev, uploadFailed:true}));
        }

        uploadSubmission(axiosPrivate, formData, successHandler, failHandler);
    }

    useEffect(() => {
        getChallenge(axiosPrivate, challengeId).then(res => {
            setChallenge(res.data);
            setLoading(false);
        }).catch(() => console.log("Challenge fetching failed"))
    }, [challengeId])

    

    return (
        <Layout>
            <Paper sx={{display: 'flex', justifyContent: "flex-end", marginBottom: '2rem', paddingX: '3rem'}} elevation={0}>
                <Button variant="outlined" onClick={handler}>Previous Submissions</Button>
            </Paper>
            
            <Paper sx={{padding: '1rem'}}>
                
                <Typography variant="h4" gutterBottom>
                    {challenge.title}
                </Typography>

                <Typography sx={{marginTop:'3rem'}} variant="h6" gutterBottom>
                    Diffculty: {challenge.difficulty}
                </Typography>

                <Typography sx={{marginTop:'3rem'}} variant="h6" gutterBottom>
                    Problem Statement:
                </Typography>

                <Typography variant="body1" gutterBottom>
                    {challenge.description}
                </Typography>

                <Typography sx={{marginTop:'3rem'}} variant="h6" gutterBottom>
                    Constraints:
                </Typography>

                <Typography variant="body1" gutterBottom color={(challenge.constraints === "" || challenge.constraints === null) ? "grey" : "black"}>
                    No constraints provided
                </Typography>
            </Paper>
            <Box sx={{marginTop: '1rem'}}>
                <Button variant="outlined" onClick={downloadFunction}startIcon={<DownloadIcon />}>Dowload Template</Button>
            </Box>
            <Box>
                <Button variant="outlined" component="label" startIcon={<UploadIcon/>}>
                    Upload Solution
                    <input hidden type="file" name="submissionFile" accept=".zip" onChange={onSubmissionFileChange}/>
                </Button>

                <Button sx={{margin: '1rem'}}variant="contained" onClick={onSubmit}>Submit</Button>
            </Box>
            
        </Layout>
    );
}
 
export default Challenge;