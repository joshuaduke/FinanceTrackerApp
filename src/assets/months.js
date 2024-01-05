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
        value: "9",
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
    console.log(month);
    let selectedMonth = months.find((item) => 
        item.value === month
    )

    console.log('selectedMonth', selectedMonth)
    return selectedMonth;
}

export function getMonthLastDay(year, month){
    const lastDay = new Date(year, month, 0).getDate();
    console.log('Last Day', `${year}-${month <= 9 ? '0' : "" }${month}-${lastDay}`)
    return `${year}-${month <= 9 ? 0 : "" }${month}-${lastDay}`;
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

    console.log(myDateObj);

    // current date is passed in as a string
    // need to convert this string to a new date
    // retrieve year and month

    
    // create an obj 
    // store startdate and end date
    // return obj

    return myDateObj;
}

