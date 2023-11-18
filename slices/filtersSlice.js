import { createSlice } from "@reduxjs/toolkit";

const { useRouter } = require("next/router")


// const router = useRouter();

// const query = router?.query;

// Object.keys(query).forEach(key => {
//   if (key.split('.')[1]) {
//     const newKey = key.split('.')[1];
//     query[newKey] = query[key].join(',');
//     delete query[key];
//   }
//   if (query.id) {
//     delete query.id
//   }
// })

const initialState = {
  filters: {}
}

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    updateFilters: (state, action) => {
      state.filters = action.payload
    } 
  }
})

export const {updateFilters} = filtersSlice.actions;

export const selectFilters = (state) => state.filtersSelect.filters;

export default filtersSlice.reducer