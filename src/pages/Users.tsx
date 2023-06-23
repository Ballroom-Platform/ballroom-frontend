import { Button, Card, CardActions, CardContent, makeStyles, Tab, Tabs, Typography } from "@mui/material";
import { makeUseVisualState } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUsersByRoles, changeRole } from "../api/admin";
import { Layout } from "../components/templates";
import { User } from "../helpers/interfaces";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Users = () => {

    const handleChange = (event: React.SyntheticEvent, newTabValue: number) => {
        settabvalue(newTabValue);
    };

    const [users, setusers] = useState<User[]>([]);
    const [tabvalue, settabvalue] = useState(0);
    const axiosIns = useAxiosPrivate();

    const makeUserAdmin = (userId: string) => { 
        changeRole(axiosIns, userId, "admin",
            (res: any) => {
                console.log(res);
                setusers(users.filter((user) => user.userId !== userId))
            },
            (err: any) => console.log(err))
    }


    useEffect(() => {
        let role : string;
        switch (tabvalue) {
            case 0:
                role = "admin"
                break;
            case 1:
                role =  "contestant"
                break;
            default:
                role =  "admin"
                break;
        }
        getUsersByRoles(axiosIns, 
            role, 
            (res: any) => {
            const listOfUsers: any[] = res.data
            // setusers(listOfUsers)
            setusers(listOfUsers.map((user) : User => ({userId: user.user_id, username: user.username, fullname: user.fullname, role: user.role}) ))
        },
        () => {})
    }, [tabvalue]);

    return ( 
        <Layout>

            <Typography variant="h3" gutterBottom>
                    Users Dashboard
            </Typography>

            <Tabs value={tabvalue} onChange={handleChange} centered>
                <Tab label="ADMINS" />
                <Tab label="CONTESTANTS" />
            </Tabs>

            {users && users.map((user) => (

                <Card key={user.userId} sx={{marginY: '1rem', width: '100%'}} >

                    <CardContent>
                        <Typography variant="h5" component="div">
                        USER ID: {user.userId}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        USERNAME: {user.username}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        FULLNAME: {user.fullname}
                        </Typography>
                    </CardContent>  

                    <CardActions>
                            <Button size="small">View</Button>
                            {tabvalue === 1 && (<Button sx={{color: 'red'}} size="small" onClick={() => makeUserAdmin(user.userId)}>Make Admin</Button>)}
                    </CardActions>

                </Card>
            ))}

        </Layout>

    );
}
 
export default Users;