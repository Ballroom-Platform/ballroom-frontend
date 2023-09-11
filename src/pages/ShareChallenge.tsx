import { Button, Card, CardActions, CardContent, Tab, Tabs, TextField, Typography } from "@mui/material";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getChallengeAdminAccess } from "../api/admin";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useApp } from '../hooks/useApp';
import AdminAccessChallengeTable from "../components/AdminAccessChallengeTable";
import { getAllUsers } from "../api/common";
import { AxiosError, AxiosResponse } from "axios";

type ChallengeId = {
    challengeId: string;
};

type User = {
    userId: string;
    username: string;
    fullname: string;
    role?: string;
};

type IProps = {
    ownerID: string;
    giveAccessToChallenge?: (userId: string) => void;
}

const ShareChallenge = ({ ownerID, giveAccessToChallenge }: IProps) => {
    const { appState } = useApp();
    const { challengeId } = useParams<ChallengeId>();
    const [userIds, setuserids] = useState<string[]>([]);
    const [users, setusers] = useState<User[]>([]);;
    const [query, setquery] = useState<string>("");
    const [selectedTab, setselectedTab] = useState(0);
    const axiosIns = useAxiosPrivate();
    const axiosPrivate = useAxiosPrivate();

    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        setselectedTab(newValue);
    };

    const getSuccess = (res: AxiosResponse) => {
        const tempArr = res.data.data.map((item: User) => (item.userId));
        setuserids([...tempArr]);
    }

    const getFail = (err: AxiosError) => {
        console.log("Getting data failed", err)
    }

    useEffect(() => {
        getChallengeAdminAccess(axiosPrivate, challengeId!, getSuccess, getFail);
        getAllUsers(axiosIns, (res: any) => {
            const listOfUsers: any[] = res.data;
            setusers(listOfUsers.map((user): User => ({ userId: user.user_id, username: user.username, fullname: user.fullname, role: user.role })));
        }, () => { });
    }, [selectedTab, giveAccessToChallenge]);

    return (
        <>
            <Tabs value={selectedTab} onChange={handleChangeTab}
                variant="scrollable"
                textColor="secondary"
                indicatorColor="secondary"
                scrollButtons={false}

                sx={{
                    height: '3rem',
                    alignItems: 'center',
                    borderColor: 'divider'
                }}
            >
                <Tab label="USERS" />
                <Tab label="SHARED-LIST" />
            </Tabs>

            {selectedTab === 0 &&
                <>
                    <Typography  sx={{ marginY: "2rem",}} variant="h6" gutterBottom>
                        Share this challenge with others
                    </Typography>

                    <TextField sx={{ marginY: '1rem' }} id="outlined-basic" label="Search by user name" value={query} variant="outlined" onChange={(e) => setquery(e.target.value)} />

                    {users && users
                        .filter((user) => user.username.toLowerCase().includes(query.toLowerCase()))
                        .filter((user) => user.userId !== appState.auth.userID)
                        .filter((user) => user.userId !== ownerID)
                        .map((user) => (

                            <Card key={user.userId} sx={{ marginY: '1rem', width: '100%' }} >

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
                                            {giveAccessToChallenge && <Button sx={{ color: 'blue' }} size="small" onClick={() => { giveAccessToChallenge(user.userId); }}>Give edit access</Button>}
                                        </CardActions>
                                }
                            </Card>
                        ))}
                </>
            }

            {selectedTab === 1 &&
                <div>
                    <Typography variant="h6" sx={{ marginY: "1rem" }} gutterBottom>
                        Users with access to this challenge
                    </Typography>
                    <AdminAccessChallengeTable challengeId={challengeId!} userID={appState.auth.userID!} />
                </div>
            }

        </>
    );
}

export default ShareChallenge;