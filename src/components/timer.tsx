import React, { useState, useEffect } from 'react';
import { BalDateTime } from '../helpers/interfaces';
import { Card, CardContent, Typography } from '@mui/material';
import { getDateString } from '../helpers/dateConverter';

interface IProps {
    startTime: BalDateTime;
}

const Timer = ({ startTime }: IProps) => {
    const startTimeInSeconds = new Date(getDateString(startTime));
    const now = new Date();
    const timer1 = Math.floor((startTimeInSeconds.getTime() - now.getTime()) / 1000);
    const [timer, setTimer] = useState(timer1); // Initial 

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
        <Card sx={{ width: '100%', height: '100%' }}>
            <CardContent>
                <Typography align="center" variant="h5" sx={{ fontWeight: "bold", color: "darkgreen" }} gutterBottom>
                    Time Remaining
                </Typography>
                <div style={{ justifyContent: "center", display: "flex" }}>
                    <div style={{ border: '1px solid black', padding: '10px', marginRight: '10px' }}>Days: {days}</div>
                    <div style={{ border: '1px solid black', padding: '10px', marginRight: '10px' }}>Hours: {hours}</div>
                    <div style={{ border: '1px solid black', padding: '10px', marginRight: '10px' }}>Minutes: {minutes}</div>
                    <div style={{ border: '1px solid black', padding: '10px', marginRight: '10px' }}>Seconds: {seconds}</div>
                </div>
            </CardContent>
        </Card>
    );
};

export default Timer;
