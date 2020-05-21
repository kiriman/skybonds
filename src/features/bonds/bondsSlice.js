import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import orderBy from 'lodash/orderBy'
import reduce from 'lodash/reduce'
import get from 'lodash/get'

import { BOND_TYPE_OPTIONS, INTERVAL_OPTIONS, FAKE_DATA } from 'constants/ids'

export const fetchBonds = createAsyncThunk(
  'bonds/fetchBonds',
  async ({ chartIntervalId, bondTypeId }) => {
    console.log('chartIntervalId: ', chartIntervalId)
    console.log('bondTypeId: ', bondTypeId)
    try {
      const response = await axios.post('https://app.fakejson.com/q', {
        token: 'c1CpibqSrpskDEhV-gY70Q',
        consistent: false,
        data: {
          date: 'date|ISOdate',
          numberFloat: 'numberFloat|80,160|2',
          _repeat: chartIntervalId
        }
      })
      return response.data
    } catch (error) {
      return { error: get(error, 'response.data', null) }
    }
  }
)

const initialState = {
  entities: [],
  bondTypeId: 0,
  chartIntervalId: INTERVAL_OPTIONS[0].value,

  error: null,
  idLoading: false,
  idLoaded: false,
  key: 'Bananas',
}

export const bondsSlice = createSlice({
  name: 'bonds',
  initialState,
  reducers: {
    setBondTypeId: (state, action) => {
      state.bondTypeId = action.payload
    },
    setChartIntervalId: (state, action) => {
      state.chartIntervalId = action.payload
    },
  },
  extraReducers: {
    [fetchBonds.pending]: (state, action) => {
      state.isLoading = true
    },
    [fetchBonds.fulfilled]: (state, action) => {
      state.isLoading = false
      state.isLoaded = true
      const error = get(action, 'error', null)
      //TODO: Use local FAKE_DATA if we get limit free queries per day on the app.fakejson.com
      let orderedData = FAKE_DATA

      if(action.payload.error){
        state.error = error
      } else {
        orderedData = orderBy(action.payload, 'date')
      }

      const bondTypeId = get(action, 'meta.arg.bondTypeId')
      const key = BOND_TYPE_OPTIONS[bondTypeId].label
      const normlzrData = reduce(orderedData, (acc, { date, numberFloat }) => {
        acc.push({
          key,
          date,
          [key]: numberFloat
        })
        return acc
      }, [])
      normlzrData.columns = ['date', key]
      state.entities = normlzrData
    },
    [fetchBonds.rejected]: (state, action) => {
      state.isLoading = false
    },
  }
})

export const { setBondTypeId, setChartIntervalId } = bondsSlice.actions

export const selectBonds = state => state.bonds.entities
export const selectBondTypeId = state => state.bonds.bondTypeId
export const selectChartIntervalId = state => state.bonds.chartIntervalId
export const selectIsLoading = state => state.bonds.isLoading
export const selectIsLoaded = state => state.bonds.isLoaded
export const selectError = state => state.bonds.error

export default bondsSlice.reducer
