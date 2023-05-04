import { IDateTimeObject } from "./interfaces";

const padZero = (value: number): string => {
    return value.toString().padStart(2, '0');
}

export const getDateString = (dateTime: IDateTimeObject): string => {
    const { year, month, day, hour, minute, second } = dateTime;

    return `${year}-${padZero(month)}-${padZero(day)}T${padZero(hour)}:${padZero(minute)}:${padZero(second)}Z`;
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
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12; // Convert hours to 12-hour format
    const period = hours < 12 ? "AM" : "PM"; // Determine if it's AM or PM
    const monthName = date.toLocaleString("en-us", { month: "long" });
    const daySuffix = getDaySuffix(date.getUTCDate());

    return `${formattedHours}:${padZero(minutes)} ${period} on ${monthName} ${date.getUTCDate()}${daySuffix}, ${date.getUTCFullYear()}.`;
}

