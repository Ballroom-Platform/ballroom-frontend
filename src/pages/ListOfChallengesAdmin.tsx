import { Button, Card, CardActions, CardContent, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "../components/templates";
import ChallengesByDifficulty from "./ChallengesByDifficulty";

type Challenge = {
    challengeId: string;
    title: string;
    difficulty: string;
};

const ListOfChallengesAdmin = () => {

    const [query, setquery] = useState<string>("");
    const [challenges, setchallenges] = useState<Challenge[]>([]);

    return ( 

        <Layout>
            <ChallengesByDifficulty adminEdit />
        </Layout>

    );
}
 
export default ListOfChallengesAdmin;