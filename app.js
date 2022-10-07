function checkCashRegister(price, cash, cid) {
  let denoms = {
    "ONE HUNDRED": 100,
    "TWENTY": 20,
    "TEN": 10,
    "FIVE": 5,
    "ONE": 1,
    "QUARTER": .25,
    "DIME": .10,
    "NICKEL": .05,
    "PENNY": .01
  }

  let changeDue = (cash - price).toFixed(2)

  let cidTotal = 0
  for(let elem of cid) { //calculates total available cash
    cidTotal += elem[1]
  }
  cidTotal = (cidTotal).toFixed(2) 

  let changeReturn = []
  let status = ''

  if (changeDue*100 > cidTotal*100) { //if too little cash in drawer, multiplied by 100 to avoid floats
    return {status: 'INSUFFICIENT_FUNDS', change: []}
  } else if (changeDue === cidTotal) { //if exact cash in drawer
    return {status: 'CLOSED', change: cid}
  } else { //if cash in drawer exceeds needed change
    cid=cid.reverse() //begins subtracting from largest units
    for (let elem of cid) {
      let valueReturn = [elem[0],0] //adds value to temp return for each elem
      let currUnit = elem[0]
      let currAvail = elem[1]
      while (changeDue >= denoms[currUnit] && currAvail > 0){
        changeDue -= denoms[currUnit]
        changeDue = changeDue.toFixed(2)
        valueReturn[1] += denoms[currUnit]
        currAvail -= denoms[currUnit]
      }
      if(valueReturn[1] > 0){ //adds non-zero elements to final return
        changeReturn.push(valueReturn)
      }
    }
    if (changeDue > 0) { //if exact change cannot be returned
      return {status: 'INSUFFICIENT_FUNDS', change: []}
    }
    return {status: 'OPEN', change: changeReturn}
  }
}

//tests
