


export function formatCurrency(num){
    let strFormattedNum = "";
    // console.log("CategoryType", categoryType);
    // // categoryType == "expenses" && (num *= -1 )
    // if (categoryType == "expenses") {
    //     num  *= -1
    // } // more readable

    // if num is less than zero format should be -$(number)
    if (num < 0) {
        strFormattedNum = `-$(${num * -1})`
    } else {
        strFormattedNum = `$${num}`
    }


    // if num is more than zero format should be $number

    return strFormattedNum;
}