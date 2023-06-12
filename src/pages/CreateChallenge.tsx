import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Layout } from "../components/templates";
import { useState } from "react";
import { useApp } from "../hooks/useApp";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Snackbar, useFormControl } from "@mui/material";
import { InputWrapper } from "../components";
import { createChallenge } from "../api/admin";
import { useNavigate } from "react-router"

// data_model:Challenge newChallenge = {title: "", challengeId: "", description: "", difficulty: "HARD", testCase: []};
const CreateChallenge = () => {

    const [challengeTitle, setchallengeTitle] = useState<string>("");
    const [challengeDifficulty, setchallengeDifficulty] = useState<string>("MEDIUM");
    const [testCaseFile, settestCaseFile] = useState({} as FileList);
    const [readmeFile, setReadmeFile] = useState({} as FileList);
    const [templateFile, settemplateFile] = useState({} as FileList);
    const {appState} = useApp();
    const userId = appState.auth.userID;
    const navigate = useNavigate();

    const [showNotification, setshowNotification] = useState(false);

    const clearAllInputs = () => {
        setchallengeTitle("");
        setchallengeDifficulty("MEDIUM");
        settestCaseFile({} as FileList);
        setReadmeFile({} as FileList);
        settemplateFile({} as FileList);
    }

    const axiosIns = useAxiosPrivate();

    const navigateToChallenges = () => {
        navigate("/myChallenges");
    }

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('testCase', testCaseFile[0], "test001 "+ "_" + Date.now());
        formData.append('readme', readmeFile[0], "readme001 "+ "_" + Date.now());
        if(Object.keys(templateFile).length > 0){
            formData.append('template', templateFile[0], "template001 "+ "_" + Date.now())
        }
        formData.append('title', challengeTitle)
        formData.append('difficulty', challengeDifficulty)
        formData.append('authorId', userId!)
        createChallenge(axiosIns, formData, (res: any) => {setshowNotification(true); clearAllInputs(); navigateToChallenges();}, (err: any) => console.log("ERROR OCCURED"))
    }

    const onTestCaseFileChange = (e : any) => {
        settestCaseFile(prev => ({...prev, ...e.target.files}));
    }

    const onReadmeFileChange = (e : any) => {
        setReadmeFile(prev => ({...prev, ...e.target.files}));
    }

    const onTemplateFileChange = (e : any) => {
        settemplateFile(prev => ({...prev, ...e.target.files}));

    }
    
    return ( 
        <Layout>
            <Typography variant="h3" gutterBottom>
                    Create a Challenge
            </Typography>

            <TextField sx={{marginY: '2rem'}} id="outlined-basic" label="Title" variant="outlined" value={challengeTitle} onChange={(e) => setchallengeTitle(e.target.value)}/>

            <br />      

            <FormControl sx={{marginY: '1rem'}} >
                <FormLabel id="demo-controlled-radio-buttons-group">Difficulty</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={challengeDifficulty}
                    onChange={(e) => setchallengeDifficulty(e.target.value)}
                >
                    <FormControlLabel value="EASY" control={<Radio />} label="EASY" />
                    <FormControlLabel value="MEDIUM" control={<Radio />} label="MEDIUM" />
                    <FormControlLabel value="HARD" control={<Radio />} label="HARD" />
                </RadioGroup>
            </FormControl>
            <br />

            <InputWrapper  label="Upload Readme .md File: "><input onChange={onReadmeFileChange} id="readmeInput" type="file" name="readmeFile" accept=".md"  style={{flex:6}}/></InputWrapper>

            <InputWrapper  label="Upload Test Case .zip File: "><input onChange={onTestCaseFileChange} id="testFileInput" type="file" name="submissionFile" accept=".zip"  style={{flex:6}}/></InputWrapper>

            <InputWrapper  label="Upload Template .zip File: "><input onChange={onTemplateFileChange} id="testFileInput" type="file" name="templateFile" accept=".zip"  style={{flex:6}}/></InputWrapper>

            <Button sx={{margin: '1rem'}}variant="contained" onClick={()=>handleSubmit()}>Submit</Button>

            <Snackbar open={showNotification} autoHideDuration={6000} onClose={() => setshowNotification(false)} message="Challenge Created Successfully" />
        </Layout>
     );
}
 
export default CreateChallenge;