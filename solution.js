const accountBalanceHistory = [
  {
    monthNumber: 0,
    account: {
      balance: { amount: 0 },
    },
  },
  {
    monthNumber: 1,
    account: {
      balance: { amount: 100 },
    },
  },
  {
    monthNumber: 2,
    account: {
      balance: { amount: 200 },
    },
  }
];

const checkEmptyArray = (array) => {
  if(!array || !Array.isArray(array) || array.length <= 0) return true;
  return false;
}

const checkEmptyObject = (obj) => {
  if(!obj || Object.keys(obj).length === 0 || obj.constructor !== Object) return true;
  return false;
}

const accountTypeChecker = (accountBalanceHistory) => {

  if(checkEmptyArray(accountBalanceHistory)){
    return "Account Balance is invalid";
  }

  let result = "", error = false, message = "", previousAmount = 0, previousDifference = 0;

  for(const [index, accountBalanceObj] of accountBalanceHistory.entries()){

    let {account} = accountBalanceObj;

    if(checkEmptyObject(account)){
      error = true;
      message = "Account not in proper format";
      break;
    }

    let {balance} = account; 

    if(checkEmptyObject(balance)){
      error = true;
      message = "Balance not in proper format";
      break;
    }

    let {amount} = balance;

    if(typeof amount !== 'number'){
      error = true;
      message = "Amount not in proper format";
      break;
    }

    if(index === 0){
      previousAmount = amount;
    }
    else if(index === 1){
      previousDifference = Math.abs(amount - previousAmount);
      previousAmount = amount;
    }
    if(index > 1){

      let currentDifference = Math.abs(amount - previousAmount);

      if(currentDifference%previousDifference !== 0){
        result = "A";
        break;
      }

      previousAmount = amount;
    }
  }
 
  if(error) return message;
  return result ? "A" : "B";
};

const returnResult = accountTypeChecker(accountBalanceHistory);

console.log({returnResult});

// For other cases I would consider negative amount scenarios, empty array or object not in proper format scenarios,
// Unit Test For this function would be => 
// 1. Input not in proper format
// 2. Passing negative amount 
// 3. Passing amount by incrementing example: month0: 400, month1: 200, month2: 400 (This would still return B as difference is constant)
