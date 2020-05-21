const RESPONSE = [{
  isin: 'XS0971721963',
  data: {id: 0}
},{
  isin: 'RU000A0JU4L3',
  data: {id: 1}
}]

const getBondsData = async ({date, isins}) => {
  const storedBonds = JSON.parse(localStorage.getItem('bonds')) || {}

  let storedValues = {}
  if(storedBonds[date]){
    storedValues = storedBonds[date]
  }

  let result = []

  const nextIsins = isins.reduce((acc, isin) => {
    if(!storedValues[isin]){
      return [...acc, isin]
    }

    result.push(storedValues[isin])

    return acc
  }, [])

  if(nextIsins.length > 0){
    // const RESPONSE = await http.post({
    //   url: `/bonds/${date}`,
    //   body: nextIsins
    // })

    const nextStoredValues = RESPONSE.reduce((acc, obj) => {
      acc[obj.isin] = obj
      result.push(obj)
      return acc
    }, storedValues)
    console.log('nextStoredValues: ', nextStoredValues)

    const nextStoredBonds = {
      [date]: nextStoredValues
    }

    localStorage.setItem('bonds', JSON.stringify(nextStoredBonds))
  }

  return result
}

const handleFetch = async () => {
  const response = await getBondsData({
    date: '20180120',
    isins: ['XS0971721963', 'RU000A0JU4L3']
  })
}

const handleClear = () => {
  localStorage.clear()
}

