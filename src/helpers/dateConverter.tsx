import { IDateTimeObject } from "./interfaces";

const padZero = (value: number): string => {
    return value.toString().padStart(2, '0');
}

export const getDateString = (dateTime: IDateTimeObject): string => {
    const { year, month, day, hour, minute, second } = dateTime;

    return `${year}-${padZero(month)}-${padZero(day)}T${padZero(hour)}:${padZero(minute)}:${padZero(second)}Z`;
}

export const getUTCDateString = (dateTime: IDateTimeObject): string => {
    const { year, month, day, hour, minute, second } = dateTime;
    const offset = new Date().getTimezoneOffset();    
    const dateString = `${year}-${padZero(month)}-${padZero(day)}T${padZero(hour)}:${padZero(minute)}:${padZero(second)}Z`
    const date = new Date(dateString);
    const dateWithOffset = new Date(date.getTime() + (offset * 60 * 1000));
    const years = dateWithOffset.getUTCFullYear();
    const months = dateWithOffset.getUTCMonth() + 1;
    const days = dateWithOffset.getUTCDate();
    const hours = dateWithOffset.getUTCHours();
    const minutes = dateWithOffset.getUTCMinutes();
    const seconds = dateWithOffset.getUTCSeconds();

    return `${years}-${padZero(months)}-${padZero(days)}T${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}Z`;
}

const getDaySuffix = (day: number): string => {
    if (day >= 11 && day <= 13) {
    return "th";
    }
    switch (day % 10) {
    case 1:
        return "st";
    case 2:
        return "nd";
    case 3:
        return "rd";
    default:
        return "th";
    }
}

export const formatUTCDate = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const monthName = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();
    const daySuffix = getDaySuffix(day);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

    return `${formattedHours}:${padZero(minutes)} ${period} on ${monthName} ${day}${daySuffix}, ${year}.`;
}

export const compareTime = (startTime: IDateTimeObject,endTime: IDateTimeObject) => {

    const utcTimestamp = Date.now();
    const startTimeInMilliseconds = Date.parse(getDateString(startTime));
    const endTimeInMilliseconds = Date.parse(getDateString(endTime))
    const currTimeInMilliseconds = utcTimestamp;

    if (startTimeInMilliseconds <= currTimeInMilliseconds && endTimeInMilliseconds >= currTimeInMilliseconds){
        return "Ongoing"
    }else if (startTimeInMilliseconds >= currTimeInMilliseconds){
        return "Upcoming"
    }else{
        return "Past"
    }
}