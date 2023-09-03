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
import MdFileIcon from '@mui/icons-material/FileCopy';
import ZipFileIcon from '@mui/icons-material/FolderZip';
import InfoIcon from '@mui/icons-material/Info';

const CreateChallenge = () => {

    const [challengeTitle, setchallengeTitle] = useState<string>("");
    const [challengeDifficulty, setchallengeDifficulty] = useState<string>("MEDIUM");
    const [testCaseFile, settestCaseFile] = useState({} as FileList);
    const [readmeFile, setReadmeFile] = useState({} as FileList);
    const [templateFile, settemplateFile] = useState({} as FileList);
    const {appState} = useApp();
    const userId = appState.auth.userID;
    const navigate = useNavigate();
    const [readmeFontColor, setReadmeFontColor] = useState<string>('red');
    const [templateFontColor, setTemplateFontColor] = useState<string>('red');
    const [testFontColor, setTestFontColor] = useState<string>('red');

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
        setTestFontColor('green');
    }

    const onReadmeFileChange = (e : any) => {
        setReadmeFile(prev => ({...prev, ...e.target.files}));
        setReadmeFontColor('green');
    }

    const onTemplateFileChange = (e : any) => {
        settemplateFile(prev => ({...prev, ...e.target.files}));
        setTemplateFontColor('green');

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

            <div style={{display:'flex', alignItems: 'center'}}>
                <MdFileIcon style={{marginRight:10}}/>
                <InputWrapper  label="Upload readme .md file: "><input onChange={onReadmeFileChange} id="readmeInput" type="file" name="readmeFile" accept=".md" style={{color: readmeFontColor, fontFamily:'Poppins', marginLeft:25}}/></InputWrapper>
            </div>
            <div style={{ padding: '10px', borderRadius: '8px', display: 'flex', alignItems: 'center', background: '#eff7ff'}}>
                <div style={{color: '#808080'}}>
                    <p style={{ display: 'flex', alignItems: 'center'}}> 
                        <InfoIcon sx={{marginRight: '0.5rem'}}/>
                        You can include the following details in the .md file:
                    </p>
                    <ul>
                        <li>Challenge description</li>
                        <li>Input format</li>
                        <li>Constraints</li>
                        <li>Code examples</li>
                    </ul>
                </div>
            </div>

            <div style={{display:'flex', alignItems: 'center'}}>
                <ZipFileIcon style={{marginRight:10}}/>
                <InputWrapper  label="Upload template .zip file: "><input onChange={onTemplateFileChange} id="testFileInput" type="file" name="templateFile" accept=".zip" style={{color: templateFontColor, fontFamily:'Poppins', marginLeft:20}}/></InputWrapper>
            </div>
            <div style={{ padding: '10px', borderRadius: '8px', display: 'flex', alignItems: 'center', background: '#eff7ff'}}>
                <div style={{color: '#808080'}}>
                    <p style={{ display: 'flex', alignItems: 'center'}}> 
                        <InfoIcon sx={{marginRight: '0.5rem'}}/>
                        You need to include the following files in the zip folder:
                    </p>
                    <ul>
                        <li>main.bal(file)</li>
                        <li>Ballerina.toml(file)</li>
                        <li>tests(folder) - You can include sample testcases and evaluation file inside this folder.</li>  
                    </ul>
                </div>
            </div>

            <div style={{display:'flex', alignItems: 'center'}}>
                <ZipFileIcon style={{marginRight:10}}/>
                <InputWrapper  label="Upload test case .zip file: "><input onChange={onTestCaseFileChange} id="testFileInput" type="file" name="submissionFile" accept=".zip" style={{color: testFontColor, fontFamily:'Poppins', marginLeft:20}}/></InputWrapper>
            </div>
            <div style={{ padding: '10px', borderRadius: '8px', display: 'flex', alignItems: 'center', background: '#eff7ff'}}>
                <div style={{color: '#808080'}}>
                    <p style={{ display: 'flex', alignItems: 'center'}}> 
                        <InfoIcon sx={{marginRight: '0.5rem'}}/>
                        You need to include the testcases and evaluation file for final evaluation in this zip folder. This folder is replaced with uploaded solution 'tests' folder and give final scores.
                    </p>
                </div>
            </div>

            <Button sx={{margin: '1rem'}}variant="contained" onClick={()=>handleSubmit()}>Submit</Button>

            <Snackbar open={showNotification} autoHideDuration={6000} onClose={() => setshowNotification(false)} message="Challenge Created Successfully" />
        </Layout>
     );
}
 
export default CreateChallenge;