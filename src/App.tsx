import axios from "axios";
import React, { useState } from "react";
import { InputWrapper } from "./Components";
import { BFF_URLS } from "./Links";

interface IErrorStates {
  emptyFields : boolean;
  uploadFailed: boolean
}

interface ISuccessStates{
  uploadComplete: boolean
}

function App() {

  const defaultErrorStates : IErrorStates= {emptyFields : false, uploadFailed: false}
  const defaultSuccessStates : ISuccessStates = {uploadComplete: false};

  const [userId, setUserId] = useState("" as string);
  const [challengeId, setChallengeId] = useState("" as string);
  const [submissionFile, setSubmissionFile] = useState({} as FileList);
  const [errorStates, setErrorStates] = useState<IErrorStates>(defaultErrorStates);
  const [sucessStates, setSuccessStates] = useState<ISuccessStates>(defaultSuccessStates)

  const onUserIdChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    setUserId(event.currentTarget.value);
  }

  const onChallengeIdChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    setChallengeId(event.currentTarget.value);
  }

  const onSubmissionFileChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    setSubmissionFile(prev => ({...prev, ...event.target.files}));
  }
  const onSubmit = () => {
    if( userId === "" || challengeId === "" || Object.keys(submissionFile).length === 0){
      setErrorStates(prev => ({...prev, emptyFields : true}));
      return;
    }

    setErrorStates(defaultErrorStates);

    const formData = new FormData();
    formData.append('submission', submissionFile[0], userId + "_" + challengeId + "_" + Date.now());
    formData.append("userId", userId);
    formData.append("challengeId", challengeId);

    const url = BFF_URLS.uploadService;
    const method = "POST";
    const headers = {};
    const data = formData;

    axios({url, method, headers, data }).then(()=>{
      setSuccessStates(prev => ({...prev, uploadComplete: true}));
    }).catch((err) => {
      setSuccessStates(defaultSuccessStates);
      setErrorStates(prev => ({...prev, uploadFailed:true}));
    });
  }

  return (
    <div style={{display:'flex', flexDirection:'column', width:'30%', margin:'auto', paddingTop:'10%'}}>
      <InputWrapper label="User ID: "><input type="text" name="userId" value={userId} onChange={onUserIdChange} style={{flex:6}}/></InputWrapper>
      <InputWrapper label="Challenge ID: "><input type="text" name="challengeId" value={challengeId} onChange={onChallengeIdChange} style={{flex:6}}/></InputWrapper>
      <InputWrapper label="Upload the zip file: "><input type="file" name="submissionFile" accept=".zip" onChange={onSubmissionFileChange} style={{flex:6}}/></InputWrapper>
      <button onClick={onSubmit} style={{width:'40%', margin:'auto'}}>Submit</button>
      <div style={{margin:'auto', paddingTop:'20px'}}>
        {errorStates.emptyFields && (<div style={{color:"red"}}>Please fill all fields.</div>)}
        {errorStates.uploadFailed && (<div style={{color:"red"}}>Upload Failed</div>)}
        {sucessStates.uploadComplete && (<div style={{color:"green"}}>Upload Completed</div>)}
      </div>
    </div>
  );
}

export default App;
