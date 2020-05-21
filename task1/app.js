function randomPartValue(min, max) {
  let rand = min + Math.random() * (max - min);
  return rand.toFixed(1);
}

function calculate(parts) {
  const increaseValues = parts.map(value => value * 10000)
  const sum = increaseValues.reduce( (acc, val) => {
    return acc + val
  }, 0)
  return increaseValues.map(partialValue => (100 * partialValue  / sum).toFixed(3))
}

function handleGenerate() {
  const partsValue = document.getElementById('arrayCount').value

  // const values = ["1.5", "3", "6", "1.5"]
  const parts = [...new Array(parseInt(partsValue))].map(() =>  randomPartValue(0, 10))

  if(parts > 7000000){
    return
  }

  const startTime = new Date
  const percentages = calculate(parts)
  const runTime = new Date - startTime
  
  const result = {
    runTime,
    parts,
    percentages
  }
  document.querySelector("#output").innerHTML = `<div>Run time: `+runTime+`ms</div>`
  console.log('result: ', result)

  // const html = `<div>Run time: `+runTime+`ms<br />`+parts.map((val, index) => {
  //   return `<div>`+val+` - `+percentages[index]+`%</div>`
  // })+`</div>`
  // document.querySelector("#output").innerHTML = html
}