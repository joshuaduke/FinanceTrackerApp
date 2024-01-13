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

export function getMonthName(month){
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

    // let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    // call getMonthLast day function to retrieve the last day of the month
    let lastDayOfMonth = getMonthLastDay(year, month);
    let myDateObj = {
        startDate: `${year}-${month <= 9 ? '0' : "" }${month}-01`,
        endDate: `${lastDayOfMonth}`
    }
    
    return myDateObj;
}

