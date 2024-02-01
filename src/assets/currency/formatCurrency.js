


export function formatCurrency(num){
    let strFormattedNum = "";
    // if num is less than zero format should be -$(number)
    if (num < 0) {
        strFormattedNum = `-$(${num * -1})`
    } else {
        strFormattedNum = `$${num}`
    }
    // if num is more than zero format should be $number

    return strFormattedNum;
}