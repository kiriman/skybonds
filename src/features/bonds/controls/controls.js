import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import Grid from '@material-ui/core/Grid'

import { BOND_TYPE_OPTIONS, INTERVAL_OPTIONS } from 'constants/ids'

import { useSelector, useDispatch } from 'react-redux'
import {
  setBondTypeId,
  setChartIntervalId,
  fetchBonds,

  selectBondTypeId,
  selectChartIntervalId,
  selectIsLoading,
} from '../bondsSlice'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}))

function Controls(){
  const classes = useStyles()
  const dispatch = useDispatch()
  const bondTypeId = useSelector(selectBondTypeId)
  const chartIntervalId = useSelector(selectChartIntervalId)
  const isLoading = useSelector(selectIsLoading)

  const handleFetch = () => {
    dispatch(fetchBonds({ bondTypeId, chartIntervalId }))
  }

  const handleInterval = (event, value) => {
    if(value){
      dispatch(setChartIntervalId(value))
    }
  }

  const handlePrice = (event) => {
    const value = event.target.value
    if(value){
      dispatch(setBondTypeId(event.target.value))
    }
  }
  
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
    >
        <ToggleButtonGroup
          value={chartIntervalId}
          exclusive
          onChange={handleInterval}
          aria-label="interval"
        >
          {INTERVAL_OPTIONS.map(({ value, label }) => (
            <ToggleButton key={label} value={value}>
              {label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={bondTypeId}
          onChange={handlePrice}
          label="Type"
        >
          {BOND_TYPE_OPTIONS.map(({ value, label }) => (
            <MenuItem key={label} value={value}>{label}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button disabled={isLoading} variant="contained" onClick={handleFetch}>{isLoading ? 'Fetching' : 'Fetch'}</Button>
    </Grid>
  )
}

export default Controls