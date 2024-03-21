export function formatCurrency(num){
    let strFormattedNum = "";
    // console.log("CategoryType", categoryType);
    // // categoryType == "expenses" && (num *= -1 )
    // if (categoryType == "expenses") {
    //     num  *= -1
    // } // more readable
    num = Math.round(num * 100) / 100;

    // if num is less than zero format should be -$(number)
    if (num < 0) {
        strFormattedNum = `-$(${num * -1})`
    } else {
        strFormattedNum = `$${num}`
    }


    // if num is more than zero format should be $number

    return strFormattedNum;
}

export function calculateTransactionTotal(transactions){
    const totalTransactionAmount = transactions.reduce((acc, curr) => acc + curr.transactionAmount, 0); 
    return totalTransactionAmount.toFixed(2);
  }