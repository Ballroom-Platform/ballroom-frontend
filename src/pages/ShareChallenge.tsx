import { Button, Card, CardActions, CardContent, Tab, Tabs, TextField, Typography } from "@mui/material";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import {  getChallengeAccessGrantedUsers } from "../api/admin";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useApp } from '../hooks/useApp';
import AdminAccessChallengeTable from "../components/AdminAccessChallengeTable";
import { getAllUsers } from "../api/common";

type ChallengeId = {
    challengeId: string;
};

type User = {
    userId: string;
    username: string;
    fullname: string;
    role: string;
};

type IProps = {
    ownerID: string;
    giveAccessToChallenge?: (userId: string) => void;
}

const ShareChallenge = ({ownerID, giveAccessToChallenge} : IProps) => {
    const {appState} = useApp();
    const {challengeId} = useParams<ChallengeId>();
    const [userIds, setuserids] = useState<string[]>([]);
    const [users, setusers] = useState<User[]>([]);;
    const [query, setquery] = useState<string>("");
    const [selectedTab, setselectedTab] = useState(0);
    const axiosIns = useAxiosPrivate();

    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        setselectedTab(newValue);
    };
    
    useEffect(() => {
        getChallengeAccessGrantedUsers(axiosIns, challengeId!, (res: any) => setuserids(res.data), (err: any) => console.log(err));
        getAllUsers(axiosIns, (res: any) => {const listOfUsers: any[] = res.data;
            setusers(listOfUsers.map((user) : User => ({userId: user.user_id, username: user.username, fullname: user.fullname, role: user.role})));
        }, () => {});
    }, [selectedTab,giveAccessToChallenge]);

    return ( 
        <>
            <Tabs value={selectedTab} onChange={handleChangeTab} centered>
                <Tab label="ADD-ADMINS" />
                <Tab label="SHARED" />
            </Tabs>

            <Typography variant="h6" gutterBottom>
                Share this challenge with others.
            </Typography>

            {selectedTab === 0 && <AdminAccessChallengeTable  challengeId={challengeId!} userID={appState.auth.userID!}/>}

            {selectedTab === 1 &&
            <> 
                <TextField sx={{marginY: '2rem'}} id="outlined-basic" label="Search by user name" value={query} variant="outlined" onChange={(e) => setquery(e.target.value)}/>
                    
                {users && users
                .filter((user) => user.username.toLowerCase().includes(query.toLowerCase()))
                .filter((user) => user.userId !== appState.auth.userID)
                .filter((user) => user.userId !== ownerID)
                .map((user) => (
                    
                    <Card key={user.userId} sx={{marginY: '1rem', width: '100%'}} >
                    
                        <CardContent>
                            <Typography variant="h5" component="div">
                            Full Name : {user.fullname}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            User Name : {user.username}
                            </Typography>
                        </CardContent> 
                        {
                            userIds.includes(user.userId) ?
                               <Typography sx={{ mb: 1.5, color: 'green', paddingLeft: '1rem' }} color="text.secondary">Already access granted</Typography> :
                               <CardActions>
                                    {giveAccessToChallenge && <Button sx={{color: 'blue'}} size="small" onClick={() => {giveAccessToChallenge( user.userId);}}>Give edit access</Button>}
                                </CardActions>     
                        }
                    </Card>
                    ))}
                </>
            }     
        </>
    );
}
 
export default ShareChallenge;