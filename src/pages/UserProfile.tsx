import { Button, Card, CardContent, Icon, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getOwnedChallangesByDifficulty, getOwnerContests, getSharedChallangesByDifficulty, getSharedContests, getUsersByRoles, changeRole} from "../api/admin";
import { getUser } from "../api/common";
import { getUserRegisteredContest } from "../api/contestant";
import { Layout } from "../components/templates";
import { AccessContest, IMinimalContest, User, IDateTimeObject } from "../helpers/interfaces";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useApp } from "../hooks/useApp";
import { formatUTCDate, getDateString } from "../helpers/dateConverter";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

type Challenge = {
    challengeId: string;
    title: string;
    difficulty: string;
};

const UserProfile: React.FC = () => {

    const [user, setuser] = useState<User>();
    const axiosIns = useAxiosPrivate();
    const {appState} = useApp();
    const userId = appState.auth.userID;
    const [upcomingcontests, setupcomingcontests] = useState<IMinimalContest[]>([]);
    const [upcomingcontestsshared, setupcomingcontestsshared] = useState<AccessContest[]>([]);
    const [ongoingcontests, setongoingcontests] = useState<IMinimalContest[]>([]);
    const [ongoingcontestsshared, setongoingcontestsshared] = useState<AccessContest[]>([]);
    const [pastcontests, setpastcontests] = useState<IMinimalContest[]>([]);
    const [pastcontestsshared, setpastcontestsshared] = useState<AccessContest[]>([]);
    const [easychallenges, easysetchallenges] = useState<Challenge[]>([]);
    const [easysharedchallenges, easysetsharedchallenges] = useState<Challenge[]>([]);
    const [mediumchallenges, mediumsetchallenges] = useState<Challenge[]>([]);
    const [mediumsharedchallenges, mediumsetsharedchallenges] = useState<Challenge[]>([]);
    const [hardchallenges, hardsetchallenges] = useState<Challenge[]>([]);
    const [hardsharedchallenges, hardsetsharedchallenges] = useState<Challenge[]>([]);
    const navigate = useNavigate();
    const [registeredContests, setregisteredcontests] = useState<IMinimalContest[]>([]);

    let compareTime = (startTime: IDateTimeObject,endTime: IDateTimeObject) => {
        //compare time and return 'Ongoing' or 'Upcoming' or 'Past'
        let currentTime = new Date();
        let start = new Date(startTime.year,startTime.month-1,startTime.day,startTime.hour,startTime.minute,startTime.second);
        let end = new Date(endTime.year,endTime.month-1,endTime.day,endTime.hour,endTime.minute,endTime.second);
        if(currentTime < start){
            return "Upcoming";
        } else if(currentTime > end){
            return "Past";
        } else{
            return "Ongoing";
        }
    }

    const changeUserRole = (userId: string, newRole: string) => { 
        changeRole(axiosIns, userId, newRole,
            (res: any) => {
                console.log(res);
            },
            (err: any) => console.log(err))

        navigate("/loginHandler"); window.location.reload();   
    }

    const goToContest = (contestId: string) => {
        navigate("/contests/"+contestId);       
    }

    useEffect(() => {

        getUser(axiosIns,userId!,(res: any) => {setuser(res.data.data)},(err: any) => {console.log(err);});

        getOwnerContests(axiosIns, userId!, "future", (res: any) => setupcomingcontests((prevstate) => prevstate ? [...prevstate, ...res.data] : [{}]),(err: any) => console.log(err));
        getSharedContests(axiosIns, userId!, "future",(res: any) => setupcomingcontestsshared((prevstate) => prevstate ? [...prevstate, ...res.data] : [{}]),(err: any) => console.log(err));

        getOwnerContests(axiosIns, userId!, "present", (res: any) => setongoingcontests((prevstate) => prevstate ? [...prevstate, ...res.data] : [{}]),(err: any) => console.log(err));
        getSharedContests(axiosIns, userId!, "present",(res: any) => setongoingcontestsshared((prevstate) => prevstate ? [...prevstate, ...res.data] : [{}]),(err: any) => console.log(err));

        getOwnerContests(axiosIns, userId!, "past", (res: any) => setpastcontests((prevstate) => prevstate ? [...prevstate, ...res.data] : [{}]),(err: any) => console.log(err));
        getSharedContests(axiosIns, userId!, "past",(res: any) => setpastcontestsshared((prevstate) => prevstate ? [...prevstate, ...res.data] : [{}]),(err: any) => console.log(err));

        getOwnedChallangesByDifficulty(axiosIns,
            "EASY", userId!,
            (res: any) => {
            const listOfChallenges: any[] = res.data
            easysetchallenges(listOfChallenges.map((challenge) : Challenge => ({challengeId: challenge.challengeId, title: challenge.title, difficulty: challenge.difficulty})))
        },
        () => {})

        getSharedChallangesByDifficulty(axiosIns,
            "EASY", userId!,
            (res: any) => {
            const listOfChallenges: any[] = res.data
            easysetsharedchallenges(listOfChallenges.map((challenge) : Challenge => ({challengeId: challenge.challengeId, title: challenge.title, difficulty: challenge.difficulty}))); console.log(res)
        },
        () => {})

        getOwnedChallangesByDifficulty(axiosIns,
            "MEDIUM", userId!,
            (res: any) => {
            const listOfChallenges: any[] = res.data
            mediumsetchallenges(listOfChallenges.map((challenge) : Challenge => ({challengeId: challenge.challengeId, title: challenge.title, difficulty: challenge.difficulty})))
        },
        () => {})

        getSharedChallangesByDifficulty(axiosIns,
            "MEDIUM", userId!,
            (res: any) => {
            const listOfChallenges: any[] = res.data
            mediumsetsharedchallenges(listOfChallenges.map((challenge) : Challenge => ({challengeId: challenge.challengeId, title: challenge.title, difficulty: challenge.difficulty}))); console.log(res)
        },
        () => {})

        getOwnedChallangesByDifficulty(axiosIns,
            "HARD", userId!,
            (res: any) => {
            const listOfChallenges: any[] = res.data
            hardsetchallenges(listOfChallenges.map((challenge) : Challenge => ({challengeId: challenge.challengeId, title: challenge.title, difficulty: challenge.difficulty})))
        },
        () => {})

        getSharedChallangesByDifficulty(axiosIns,
            "HARD", userId!,
            (res: any) => {
            const listOfChallenges: any[] = res.data
            hardsetsharedchallenges(listOfChallenges.map((challenge) : Challenge => ({challengeId: challenge.challengeId, title: challenge.title, difficulty: challenge.difficulty}))); console.log(res)
        },
        () => {})

        getUserRegisteredContest(axiosIns, userId!, (res: any) => {setregisteredcontests((prevstate: any) => prevstate ? [...prevstate, ...res.data] : [{}])}, () => console.log("ERROR OCCURRED"));
    }, []);

    return ( 
        <Layout>

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
                    {user?.role === "admin" ? <Button variant="contained" sx={{marginY: "2rem", backgroundColor: "darkblue"}} onClick={() =>changeUserRole(userId!,"contestant")}>Use as a Contestant</Button> : <Button variant="contained" sx={{marginY: "2rem", backgroundColor: "darkblue"}} onClick={() => changeUserRole(userId!,"admin")}> Use as an Admin </Button>} 
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
                                    <ArrowRightIcon/> Upcomig contests  :  {upcomingcontests.length}
                                </Typography>

                                <Typography sx={{ mb: 1.5 ,marginX:5}} color="black">
                                    <ArrowRightIcon/>Ongoing contests  :  {ongoingcontests.length}
                                </Typography>

                                <Typography sx={{ mb: 1.5 ,marginX:5}} color="black">
                                    <ArrowRightIcon/>Past contests  :  {pastcontests.length}
                                </Typography>

                                <Typography sx={{ marginY: 2, fontWeight: "bold"}} color="darkred">
                                CONTESTS SHARED WITH YOU  
                                </Typography>

                                <Typography sx={{ mb: 1.5 ,marginX:5}} color="black">
                                    <ArrowRightIcon/>Upcomig contests  :  {upcomingcontestsshared.length}
                                </Typography>

                                <Typography sx={{ mb: 1.5 ,marginX:5}} color="black">
                                    <ArrowRightIcon/>Ongoing contests  :  {ongoingcontestsshared.length}
                                </Typography>

                                <Typography sx={{ mb: 1.5 ,marginX:5}} color="black">
                                    <ArrowRightIcon/>Past contests  :  {pastcontestsshared.length}
                                </Typography>
                            </div>

                            <div>
                                <Typography sx={{ marginY: 2, fontWeight: "bold"}} color="darkgreen">
                                YOUR CHALLENGES  
                                </Typography>

                                <Typography sx={{ mb: 1.5 ,marginX:5}} color="black">
                                    <ArrowRightIcon/>Easy challenges  :  {easychallenges.length}
                                </Typography>

                                <Typography sx={{ mb: 1.5 ,marginX:5}} color="black">
                                    <ArrowRightIcon/>Midum challenges  :  {mediumchallenges.length}
                                </Typography>

                                <Typography sx={{ mb: 1.5 ,marginX:5}} color="black">
                                    <ArrowRightIcon/>Hard challenges  :  {hardchallenges.length}
                                </Typography>

                                <Typography sx={{ marginY: 2, fontWeight: "bold"}} color="darkgreen">
                                SHARED CHALLENGES WITH YOU  
                                </Typography>

                                <Typography sx={{ mb: 1.5 ,marginX:5}} color="black">
                                    <ArrowRightIcon/>Easy challenges  :  {easysharedchallenges.length}
                                </Typography>

                                <Typography sx={{ mb: 1.5 ,marginX:5}} color="black">
                                    <ArrowRightIcon/>Medium challenges  :  {mediumsharedchallenges.length}
                                </Typography>

                                <Typography sx={{ mb: 1.5 ,marginX:5}} color="black">
                                    <ArrowRightIcon/>Hard challenges  :  {hardsharedchallenges.length}
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
                                <TableCell align="center"><Button variant="outlined" onClick={() => goToContest(row.contestId)}>Go to contest</Button></TableCell>
                                </TableRow>
                            ))
                            }
                        </TableBody>
                
                    </Table>

                </CardContent>
            </Card>
        </div>}

        </Layout>

    );
}

export default UserProfile;