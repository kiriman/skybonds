import { configureStore } from '@reduxjs/toolkit'
import bondsReducer from 'features/bonds/bondsSlice'

export default configureStore({
  reducer: {
    bonds: bondsReducer,
  },
});
