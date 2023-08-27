import { Box, Button, Card, CardContent, CircularProgress, Icon, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { changeRole, getOwnedChallenges, getOwnerContests, getSharedChallenges, getSharedContests} from "../api/admin";
import { getUser } from "../api/common";
import { getUserRegisteredContest } from "../api/contestant";
import { Layout } from "../components/templates";
import { AccessContest, IMinimalContest, User, IDateTimeObject, IChallenge } from "../helpers/interfaces";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useApp } from "../hooks/useApp";
import { compareTime, formatUTCDate, getDateString } from "../helpers/dateConverter";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const UserProfile: React.FC = () => {

    const [user, setuser] = useState<User>();
    const axiosIns = useAxiosPrivate();
    const {appState} = useApp();
    const userId = appState.auth.userID;
    const navigate = useNavigate();
    const [registeredContests, setregisteredcontests] = useState<IMinimalContest[]>([]);
    const [contests, setcontests] = useState<IMinimalContest[]>([]);
    const [contestsshared, setcontestsshared] = useState<AccessContest[]>([]);
    const [ownedchallenges, setownedchallenges] = useState<IChallenge[]>([]);
    const [sharedchallenges, setsharedchallenges] = useState<IChallenge[]>([]);
    const [check, setCheck] = useState<boolean>(true);

    const changeUserRole = (userId: string, userName: string, newRole: string) => { 
        const formData = new FormData();
        formData.append('userId', userId)
        formData.append('role', newRole)
        formData.append('userName', userName)

        changeRole(axiosIns, formData, userId,
            (res: any) => {
                console.log(res);
                window.location.reload();
            },
            (err: any) => console.log(err))   
    }

    const goToContest = (contestId: string, Status: string) => {
        if (Status === "Upcoming") { navigate("/contests/upcoming/"+contestId);} 
        else if (Status === "Ongoing") { navigate("/contests/ongoing/"+contestId);}
        else if (Status === "Past") { navigate("/contests/past/"+contestId);}
    }
    
    useEffect(() => {
        
        if (check) {
            getUser(axiosIns,userId!,(res: any) => {setuser(res.data.data);setCheck(false)},(err: any) => {console.log(err);});
        }

        getOwnerContests(axiosIns, userId!, (res: any) => {setcontests((prevstate: any) => prevstate ? [...prevstate, ...res.data] : [{}]);}, () => console.log("ERROR OCCURRED"));

        getSharedContests(axiosIns, userId!, (res: any) => {setcontestsshared((prevstate: any) => prevstate ? [...prevstate, ...res.data] : [{}]); }, () => console.log("ERROR OCCURRED"));

        getOwnedChallenges(axiosIns, userId!, (res: any) => {setownedchallenges((prevstate: any) => prevstate ? [...prevstate, ...res.data] : [{}]); }, () => console.log("ERROR OCCURRED"));

        getSharedChallenges(axiosIns, userId!, (res: any) => {setsharedchallenges((prevstate: any) => prevstate ? [...prevstate, ...res.data] : [{}]); }, () => console.log("ERROR OCCURRED"));

        getUserRegisteredContest(axiosIns, userId!, (res: any) => {setregisteredcontests((prevstate: any) => prevstate ? [...prevstate, ...res.data] : [{}]);}, () => console.log("ERROR OCCURRED"));

    }, []);

    return ( 
        <Layout>

            {
                check && <Box width="100%" textAlign="center" padding="40px"><CircularProgress /></Box>
            }
            {!check && (
                <>

            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
            <img src="../user.png" width="250px" style={{margin : 20 , color: "red"}}/>
                <div>
                    <Typography sx={{ mb: 1.5 , fontSize: 32}} color="black">
                        {user?.username}
                    </Typography>
                    <Typography sx={{ mb: 1.5  }} color="black">
                        FULLNAME  :  {user?.fullname}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="black">
                        USER ROLE  :  {user?.role}
                    </Typography>
                    {user?.role === "admin" ? <Button variant="outlined" sx={{marginY: "2rem", color: "darkblue"}} onClick={() =>changeUserRole(userId!,user!.username,"contestant")}>Use as a Contestant</Button> : <Button variant="contained" sx={{marginY: "2rem", backgroundColor: "darkblue"}} onClick={() => changeUserRole(userId!,user!.username,"admin")}> Use as an Admin </Button>} 
                </div>
            </div>
            
            

            {user?.role === "admin" ? 
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                    <Card sx={{width:'60%', marginY:2}} >
                        <CardContent >

                            <Typography variant="h3" component="div" sx={{marginY: 2, fontWeight: "bold", display: 'flex', justifyContent: 'center'}}>
                            DASHBOARD
                            </Typography>
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
                                <div style={{margin: 5}}>
                                <Typography sx={{marginY: 2, fontWeight: "bold"}} color="darkred">
                                YOUR CONTESTS  
                                </Typography>
                            
                                <Typography sx={{ mb: 1.5 ,marginX:5}} color="black">
                                    <ArrowRightIcon/> Upcomig contests  :  {contests.map((contest: any) => compareTime(contest.startTime,contest.endTime) === "Upcoming" ? 1 : 0).reduce((a: any, b: any) => a + b, 0)}
                                </Typography>

                                <Typography sx={{ mb: 1.5 ,marginX:5}} color="black">
                                    <ArrowRightIcon/>Ongoing contests  :  {contests.map((contest: any) => compareTime(contest.startTime,contest.endTime) === "Ongoing" ? 1 : 0).reduce((a: any, b: any) => a + b, 0)}
                                </Typography>

                                <Typography sx={{ mb: 1.5 ,marginX:5}} color="black">
                                    <ArrowRightIcon/>Past contests  :  {contests.map((contest: any) => compareTime(contest.startTime,contest.endTime) === "Past" ? 1 : 0).reduce((a: any, b: any) => a + b, 0)}
                                </Typography>

                                <Typography sx={{ marginY: 2, fontWeight: "bold"}} color="darkred">
                                CONTESTS SHARED WITH YOU  
                                </Typography>

                                <Typography sx={{ mb: 1.5 ,marginX:5}} color="black">
                                    <ArrowRightIcon/>Upcomig contests  :  {contestsshared.map((contest: any) => compareTime(contest.startTime,contest.endTime) === "Upcoming" ? 1 : 0).reduce((a: any, b: any) => a + b, 0)}
                                </Typography>

                                <Typography sx={{ mb: 1.5 ,marginX:5}} color="black">
                                    <ArrowRightIcon/>Ongoing contests  :  {contestsshared.map((contest: any) => compareTime(contest.startTime,contest.endTime) === "Ongoing" ? 1 : 0).reduce((a: any, b: any) => a + b, 0)}
                                </Typography>

                                <Typography sx={{ mb: 1.5 ,marginX:5}} color="black">
                                    <ArrowRightIcon/>Past contests  :  {contestsshared.map((contest: any) => compareTime(contest.startTime,contest.endTime) === "Past" ? 1 : 0).reduce((a: any, b: any) => a + b, 0)}
                                </Typography>
                            </div>

                            <div>
                                <Typography sx={{ marginY: 2, fontWeight: "bold"}} color="darkgreen">
                                YOUR CHALLENGES  
                                </Typography>

                                <Typography sx={{ mb: 1.5 ,marginX:5}} color="black">
                                    <ArrowRightIcon/>Easy challenges  :  {ownedchallenges.map((challenge: any) => challenge.difficulty === "EASY" ? 1 : 0).reduce((a: any, b: any) => a + b, 0)}
                                </Typography>

                                <Typography sx={{ mb: 1.5 ,marginX:5}} color="black">
                                    <ArrowRightIcon/>Midum challenges  :  {ownedchallenges.map((challenge: any) => challenge.difficulty === "MEDIUM" ? 1 : 0).reduce((a: any, b: any) => a + b, 0)}
                                </Typography>

                                <Typography sx={{ mb: 1.5 ,marginX:5}} color="black">
                                    <ArrowRightIcon/>Hard challenges  :  {ownedchallenges.map((challenge: any) => challenge.difficulty === "HARD" ? 1 : 0).reduce((a: any, b: any) => a + b, 0)}
                                </Typography>

                                <Typography sx={{ marginY: 2, fontWeight: "bold"}} color="darkgreen">
                                SHARED CHALLENGES WITH YOU  
                                </Typography>

                                <Typography sx={{ mb: 1.5 ,marginX:5}} color="black">
                                    <ArrowRightIcon/>Easy challenges  :  {sharedchallenges.map((challenge: any) => challenge.difficulty === "EASY" ? 1 : 0).reduce((a: any, b: any) => a + b, 0)}
                                </Typography>

                                <Typography sx={{ mb: 1.5 ,marginX:5}} color="black">
                                    <ArrowRightIcon/>Medium challenges  :  {sharedchallenges.map((challenge: any) => challenge.difficulty === "MEDIUM" ? 1 : 0).reduce((a: any, b: any) => a + b, 0)}
                                </Typography>

                                <Typography sx={{ mb: 1.5 ,marginX:5}} color="black">
                                    <ArrowRightIcon/>Hard challenges  :  {sharedchallenges.map((challenge: any) => challenge.difficulty === "HARD" ? 1 : 0).reduce((a: any, b: any) => a + b, 0)}
                                </Typography>
                            </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            : <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
            <Card sx={{width:'100%', marginY:2}} >
                <CardContent >

                    <Typography variant="h3" component="div" sx={{marginY: 2, fontWeight: "bold", display: 'flex', justifyContent: 'center'}}>
                    DASHBOARD
                    </Typography>

                    <Typography sx={{marginY: 2, fontWeight: "bold", display: 'flex', justifyContent: 'center'}} color="darkred">
                    CONTESTS YOU REGISTERED
                    </Typography>

                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    
                        <TableHead>
                            <TableRow>
                            <TableCell ></TableCell>
                            <TableCell align="center">Start Time</TableCell>
                            <TableCell align="center">End Time</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center">Enter</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {
                            registeredContests
                            .map((row) => (
                                <TableRow
                                key={row.contestId}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell component="th" scope="row" >{row.title}</TableCell>
                                <TableCell align="center">{formatUTCDate(getDateString(row.startTime))}</TableCell>
                                <TableCell align="center">{formatUTCDate(getDateString(row.endTime))}</TableCell>
                                <TableCell align="center">{compareTime(row.startTime,row.endTime)}</TableCell>
                                <TableCell align="center"><Button variant="outlined" onClick={() => goToContest(row.contestId,compareTime(row.startTime,row.endTime))}>Go to contest</Button></TableCell>
                                </TableRow>
                            ))
                            }
                        </TableBody>
                
                    </Table>

                </CardContent>
            </Card>
        </div>}
        </>
        )}

        </Layout>

    );
}

export default UserProfile;