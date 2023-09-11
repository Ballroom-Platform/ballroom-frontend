import { Button, Card, CardActions, CardContent, Tab, Tabs, TextField, Typography } from "@mui/material";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useApp } from '../hooks/useApp';
import AdminAccessContestTable from "../components/AdminAccessContestTable";
import { getAllUsers } from "../api/common";
import { AxiosError, AxiosResponse } from "axios";
import { getContestAdminAccess } from "../api/admin";

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
    const axiosPrivate = useAxiosPrivate();

    const handleChangeTab = (_event: React.SyntheticEvent, newValue: number) => {
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
        getContestAdminAccess(axiosPrivate, contestId!, getSuccess, getFail);

        getAllUsers(axiosIns, (res: any) => {
            const listOfUsers: any[] = res.data;
            setusers(listOfUsers.map((user): User => ({ userId: user.user_id, username: user.username, fullname: user.fullname, role: user.role })));
        }, () => { });
    }, [selectedTab, giveAccessToContest]);

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
                    <Typography sx={{ marginY: "2rem",}} variant="h6" gutterBottom>
                        Share this contest with others
                    </Typography>

                    <TextField sx={{ marginY: '1rem' }} id="outlined-basic" label="Search by user name" value={query} variant="outlined" onChange={(e) => setquery(e.target.value)} />

                    {users && userIds && users
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
                                        User name : {user.username}
                                    </Typography>

                                </CardContent>

                                {
                                    userIds.includes(user.userId) ?
                                        <Typography sx={{ mb: 1.5, color: 'green', paddingLeft: '1rem' }} color="text.secondary">Already access granted</Typography> :
                                        <CardActions>

                                            {giveAccessToContest && <Button sx={{ color: 'black' }} size="small" onClick={() => { giveAccessToContest(user.userId, "VIEW"); }}>Give view access</Button>}

                                            {giveAccessToContest && <Button sx={{ color: 'blue' }} size="small" onClick={() => { giveAccessToContest(user.userId, "EDIT"); }}>Give edit access</Button>}

                                        </CardActions>
                                }

                            </Card>
                        ))}
                </>
            }

            {selectedTab === 1 &&
                <div>
                    <Typography variant="h6" sx={{ marginY: "1rem" }} gutterBottom>
                        Users with access to this contest
                    </Typography>
                    <AdminAccessContestTable contestId={contestId!} userID={appState.auth.userID!} />
                </div>
            }

        </>
    );
}

export default ShareContest;