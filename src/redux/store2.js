// 

import { configureStore } from "@reduxjs/toolkit";
//import invoiceReducer from '../redux/invoiceSlice'; // Adjust the path if necessary
import invoiceReducer from '../redux/invoiceSlice2'; // Adjust the path if necessary

const store2 = configureStore({
  reducer: {
    invoices19: invoiceReducer,
    
    
  }
});

export default store2;
