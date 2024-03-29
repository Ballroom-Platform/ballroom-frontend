import React, { useState, useEffect } from 'react';
import { BalDateTime } from '../helpers/interfaces';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { getDateString } from '../helpers/dateConverter';

interface IProps {
    startTime: BalDateTime;
}

const Timer = ({ startTime }: IProps) => {
    const startTimeInSeconds = new Date(getDateString(startTime));
    const now = new Date();
    const timer1 = Math.floor((startTimeInSeconds.getTime() - now.getTime()) / 1000);
    const [timer, setTimer] = useState(timer1); 

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prevTimer) => prevTimer - 1);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const days = Math.floor(timer / (24 * 60 * 60));
    const hours = Math.floor((timer % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((timer % (60 * 60)) / 60);
    const seconds = Math.floor(timer % 60);

    return (
        <Card sx={{ width: '100%', height: '100%', 
        display: 'flex'}}>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <CardContent>
                <Typography align="center" variant="h6" sx={{ color: "darkgreen" }} gutterBottom>
                    Time Remaining
                </Typography>
            </CardContent>
            <CardContent>
            <div style={{ justifyContent: "center", display: "flex" }}>
                    <div style={{ border: '1px solid black', padding: '10px', marginRight: '10px' }}>Days: {days}</div>
                    <div style={{ border: '1px solid black', padding: '10px', marginRight: '10px' }}>Hours: {hours}</div>
                    <div style={{ border: '1px solid black', padding: '10px', marginRight: '10px' }}>Minutes: {minutes}</div>
                    <div style={{ border: '1px solid black', padding: '10px', marginRight: '10px' }}>Seconds: {seconds}</div>
                </div>
            </CardContent>
            </Box>
        </Card>
    );
};

export default Timer;
