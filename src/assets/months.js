import { format, lastDayOfMonth } from "date-fns";

export const months = [
    {   month: "January",
        value: "01",
    },
    {   month: "February",
        value: "02",
    },
    {   month: "March",
        value: "03",
    },
    {   month: "April",
        value: "04",
    },
    {   month: "May",
        value: "05",
    },
    {   month: "June",
        value: "06",
    },
    {   month: "July",
        value: "07",
    },
    {   month: "August",
        value: "08",
    },
    {   month: "September",
        value: "09",
    },
    {   month: "October",
        value: "10",
    },
    {   month: "November",
        value: "11",
    },
    {   month: "December",
        value: "12",
    },
]

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function formatDate(dateToFormat){
    let strFormattedDate = "";
    let dteToFormat = new Date(dateToFormat);
    dteToFormat.setDate(dteToFormat.getDate() + 1)
    let dteToFormatMonth = `${dteToFormat.getMonth() + 1}`; // only add0 if lower than 9
    const dteToFormatYear = dteToFormat.getFullYear();
    const dteToFormatDate = dteToFormat.getDate();
    const day = dteToFormat.getDay();

    dteToFormatMonth = dteToFormatMonth < 9 ? `0${dteToFormatMonth}` : dteToFormatMonth;

    console.log("Format Date month", dteToFormatMonth);

    let strDay = days[day];
    // let strMonth = months.find((month) => month.value == dteToFormatMonth)
    

    strFormattedDate = `${strDay}, ${getMonthName(dteToFormatMonth).month} ${dteToFormatDate}, ${dteToFormatYear}`;

    return strFormattedDate;
    
    // Tuesday, January 1, 2024
}


export function getMonthName(month){
    console.log("getMonthname", month)
    // let formattedMonth = month <= 9 ? `0${month}` : "";
    let selectedMonth = months.find((item) => 
        item.value === month
    )

    return selectedMonth;
}

export function getMonthLastDay(year, month){
    const lastDay = new Date(year, month, 0).getDate();
    return `${year}-${month}-${lastDay}`;
}

export function getStartEndDate(){
    const date = new Date();

    let myDateObj = {
        startDate: format(date, "yyyy-MM-01"),
        endDate: format(lastDayOfMonth(date), "yyyy-MM-dd")
    }

    return myDateObj;
}

export function getCurrentDate(){

    let todayDate = format(new Date(), "yyyy-MM-dd")

    return todayDate;
}
