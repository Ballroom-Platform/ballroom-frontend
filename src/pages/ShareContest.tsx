import { Button, Card, CardActions, CardContent, Tab, Tabs, TextField, Typography } from "@mui/material";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getUsersByRoles, getAccessGrantedUsers } from "../api/admin";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useApp } from '../hooks/useApp';
import AdminAccessContestTable from "../components/AdminAccessContestTable";
import { wait } from "@testing-library/user-event/dist/utils";

type ContestId = {
    contestId: string;
};

type User = {
    userId: string;
    username: string;
    fullname: string;
    role: string;
};

type IProps = {
    ownerID: string;
    giveAccessToContest?: (userId: string, accessType: string) => void;
}

const ShareContest = ({ ownerID, giveAccessToContest }: IProps) => {
    const { appState } = useApp();
    const { contestId } = useParams<ContestId>();
    const [userIds, setuserids] = useState<string[]>([]);
    const [users, setusers] = useState<User[]>([]);;
    const [query, setquery] = useState<string>("");
    const [selectedTab, setselectedTab] = useState(0);
    const axiosIns = useAxiosPrivate();

    const handleChangeTab = (_event: React.SyntheticEvent, newValue: number) => {
        setselectedTab(newValue);
    };

    useEffect(() => {
        getAccessGrantedUsers(axiosIns, contestId!, (res: any) => setuserids(res.data), (err: any) => console.log(err));
 
        getUsersByRoles(axiosIns, "admin", (res: any) => {
            const listOfUsers: any[] = res.data;
            setusers(listOfUsers.map((user): User => ({ userId: user.user_id, username: user.username, fullname: user.fullname, role: user.role })));    
        }, () => { });
    }, [selectedTab,giveAccessToContest]);

    return (
        <>
            <Tabs value={selectedTab} onChange={handleChangeTab} centered>
                <Tab label="SHARED" />
                <Tab label="ADD-ADMINS" />
            </Tabs>

            <Typography variant="h6" gutterBottom>
                Share this contest with others.
            </Typography>

            {selectedTab === 0 && <AdminAccessContestTable contestId={contestId!} userID={appState.auth.userID!} />}

            {selectedTab === 1 &&
                <>
                    <TextField sx={{ marginY: '2rem' }} id="outlined-basic" label="Search by email" value={query} variant="outlined" onChange={(e) => setquery(e.target.value)} />

                    {users && userIds && users
                        .filter((user) => user.username.toLowerCase().includes(query.toLowerCase()))
                        .filter((user) => user.userId !== appState.auth.userID)
                        .filter((user) => user.userId !== ownerID)
                        .map((user) => (

                            <Card key={user.userId} sx={{ marginY: '1rem', width: '100%' }} > 
                                
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        User Name : {user.fullname}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        Email : {user.username}
                                    </Typography>
                                    
                                </CardContent>
                               
                                {   
                                    userIds.includes(user.userId) ?
                                        <Typography sx={{ mb: 1.5, color: 'green', paddingLeft: '1rem' }} color="text.secondary">Already access granted</Typography> :
                                        <CardActions>
                                            
                                            {giveAccessToContest && <Button sx={{ color: 'black' }} size="small" onClick={() => { giveAccessToContest(user.userId, "VIEW"); }}>Give view access</Button>}

                                            {giveAccessToContest && <Button sx={{ color: 'blue' }} size="small" onClick={() => { giveAccessToContest(user.userId, "EDIT"); } }>Give edit access</Button>}

                                        </CardActions>
                                }

                            </Card>
                        ))}
                </>
            }
            
        </>
    );
}

export default ShareContest;