import axios from "axios";
import { useEffect, useState } from "react"
import { BFF_URLS } from "../Links";

interface IProp {
    submissionId : string | null
}

export const ScorePrompt : React.FC<IProp> = ({submissionId}) => {

    const [score, setScore] = useState<string>("pending");
    
    const pollScore = () => {
        axios.get(BFF_URLS.score_submissionScore, {params:{submissionId}}).then(res => {
            console.log(res);
            setScore(res.data.data);
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        if(score === "pending" && submissionId !== null) {
            setInterval(() => {
                pollScore();
            }, 2000)
        }
    }, [score])

    return (<div>Result: {score}</div>)
}