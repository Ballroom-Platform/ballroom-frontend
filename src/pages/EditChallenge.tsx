import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Snackbar, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { editChallenge, getChallenge } from "../api/admin";
import { Layout } from "../components/templates";
import { IChallenge } from "../helpers/interfaces";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

type IParams = {
    challengeId: string;
};

const EditChallenge = () => {
    const {challengeId} = useParams<IParams>()

    const [challenge, setChallenge] = useState<IChallenge>({} as IChallenge);
    const [loading, setLoading] = useState<boolean>(true);
    const axiosPrivate = useAxiosPrivate();
    const [showSuccessNotification, setshowSuccessNotification] = useState(false);
    const [showFailNotification, setshowFailNotification] = useState(false);
    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('title', challenge.title)
        formData.append('description', challenge.description)
        formData.append('difficulty', challenge.difficulty)
        formData.append('constraints', challenge.constraints)
        editChallenge(axiosPrivate, formData, challengeId!, (res: any) => {setshowSuccessNotification(true);}, (err: any) => setshowFailNotification(true))

    }


    useEffect(() => {
        getChallenge(axiosPrivate, challengeId!).then(res => {
            console.log(res.data);
            setChallenge(res.data);
            setLoading(false);
        }).catch(() => console.log("Challenge fetching failed"))
    }, [challengeId])

    return ( 
        <Layout>
            
            {loading && <div>Loading...</div>}

            {!loading && <>
                    <Typography variant="h3" gutterBottom>
                        Edit Challenge
                    </Typography>

                    <TextField sx={{marginY: '2rem'}} id="outlined-basic" label="Title" variant="outlined" defaultValue={challenge.title} onChange={(e) => setChallenge({...challenge, title: e.target.value})}/>

                    <br />

                    <TextField fullWidth multiline rows={4} sx={{marginY: '1rem'}}  id="outlined-basic" label="Description" variant="outlined" value={challenge.description} onChange={(e) => setChallenge({...challenge, description: e.target.value})}/>

                    <br />

                    <TextField fullWidth multiline rows={4} sx={{marginY: '1rem'}}  id="outlined-basic" label="Constraints" variant="outlined" value={challenge.constraints} onChange={(e) => setChallenge({...challenge, constraints: e.target.value})}/>

                    <br />

                    <FormControl sx={{marginY: '1rem'}} >
                        <FormLabel id="demo-controlled-radio-buttons-group">Difficulty</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={challenge.difficulty ? challenge.difficulty : "EASY"}
                            onChange={(e) => setChallenge({...challenge, difficulty: e.target.value})}
                        >
                            <FormControlLabel value="EASY" control={<Radio />} label="EASY" />
                            <FormControlLabel value="MEDIUM" control={<Radio />} label="MEDIUM" />
                            <FormControlLabel value="HARD" control={<Radio />} label="HARD" />
                        </RadioGroup>
                    </FormControl>
                    <br />

                    <Button sx={{margin: '1rem'}}variant="contained" onClick={()=>handleSubmit()}>Submit</Button>

                    <Snackbar open={showSuccessNotification} autoHideDuration={6000} onClose={() => setshowSuccessNotification(false)} message="Challenge Updated Successfully" />

                    <Snackbar open={showFailNotification} autoHideDuration={6000} onClose={() => setshowFailNotification(false)} message="Challenge Updated Failed!!!" />
            </>}
        </Layout>
    );
}
 
export default EditChallenge;