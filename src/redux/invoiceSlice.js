import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import moment from 'moment';
import axios from 'axios';
import generateID from '../function/generateId';
import getForwardDate from '../function/forwardDate';

const today = moment().format('YYYY-MM-DD');

// Existing Async thunks
export const getInvoiceById = createAsyncThunk(
  'invoices/getInvoiceById',
  async ({ invoiceId }) => {
    const response = await axios.get(`/api/invoices/${invoiceId}`);
    return response.data;
  }
);

export const deleteInvoiceAsync = createAsyncThunk(
  'invoices/deleteInvoice',
  async (invoiceId, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:5000/api/invoices/${invoiceId}`);
      return invoiceId;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchFilteredInvoices = createAsyncThunk(
  'invoices/fetchFilteredInvoices',
  async ({ name }) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/invoices/filter?name=${name}`);
      return response.data;
    } catch (error) {
      throw Error('Error fetching filtered invoices');
    }
  }
);

export const createInvoice = createAsyncThunk(
  'invoices/createInvoice',
  async ({ formattedItems }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/invoices', { formattedItems });
      return response.data;
    } catch (error) {
      throw Error('Error creating invoice');
    }
  }
);

export const fetchInvoices = createAsyncThunk(
  'invoices/fetchInvoices',
  async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/invoices');
      return response.data;
    } catch (error) {
      throw Error('Error fetching invoices');
    }
  }
);

export const createInvoice19 = createAsyncThunk(
  'invoices/createInvoice19',
  async ({ formattedItems }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/invoices19', { formattedItems });
      return response.data;
    } catch (error) {
      throw Error('Error creating invoice in invoices19');
    }
  }
);

export const fetchInvoices19 = createAsyncThunk(
  'invoices/fetchInvoices19',
  async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/invoices19');
      return response.data;
    } catch (error) {
      throw Error('Error fetching invoices from invoices19');
    }
  }
);

// Auth-related actions
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await axios.post('http://localhost:5000/api/auth/logout');
      return {};
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const invoiceSlice = createSlice({
  name: 'invoices',
  initialState: {
    invoices: [],
    invoices19: [],
    filteredInvoice: [],
    invoiceById: null,
    loading: false,
    error: null,
    // Auth state
    user: null,
    token: null,
    authLoading: false,
    authError: null,
  },
  reducers: {
    filterInvoice: (state, action) => {
      const { invoices19 } = state;
      if (action.payload.clientstatus === '') {
        state.filteredInvoice = invoices19;
      } else {
        const filteredData = invoices19.filter(
          (invoice) => invoice.clientstatus19 === action.payload.clientstatus
        );
        state.filteredInvoice = filteredData;
      }
    },
    saveInvoice: (state, action) => {
      state.invoices.push(action.payload);
    },
    updateInvoiceStatus: (state, action) => {
      const { invoiceId, clientstatus } = action.payload;
      const invoiceToUpdate = state.invoices.find(
        (invoice) => invoice.invoiceId === invoiceId
      );
      if (invoiceToUpdate) {
        invoiceToUpdate.clientstatus = clientstatus;
      }
    },
    addInvoice: (state, action) => {
      const {
        description,
        paymentTerms,
        Invoicenumber,
        clientName,
        clientPhone,
        selectDeliveryDate,
        selectDeliveryDatefrom,
        selectDeliveryDateto,
        clientStreet,
        clientCity,
        clientPostCode,
        clientCountry,
        items,
      } = action.payload;

      const finalData = {
        invoiceId: generateID(),
        Invoicenumber,
        selectDeliveryDate: today,
        selectDeliveryDatefrom,
        selectDeliveryDateto,
        paymentDue: getForwardDate(paymentTerms),
        description,
        paymentTerms,
        clientName,
        clientPhone,
        clientstatus: 'pending',
        clientStreet,
        clientCity,
        clientPostCode,
        clientCountry,
        items: items,
        total: items.reduce((acc, i) => acc + Number(i.total), 0),
        stampmoney: items.reduce((acc, i) => acc + Number(i.stampmoney), 0),
        TVA: items.reduce((acc, i) => acc + Number(i.TVA), 0),
        FinalP: items.reduce((acc, i) => acc + Number(i.FinalP), 0),
      };
      state.invoices.push(finalData);
    },
    editInvoice: (state, action) => {
      const {
        invoiceId,
        description,
        paymentTerms,
        Invoicenumber,
        clientName,
        clientPhone,
        selectDeliveryDate,
        selectDeliveryDatefrom,
        selectDeliveryDateto,
        clientStreet,
        clientCity,
        clientPostCode,
        clientCountry,
        items,
      } = action.payload;

      const invoiceIndex = state.invoices.findIndex(
        (invoice) => invoice.invoiceId === invoiceId
      );
      if (invoiceIndex !== -1) {
        const updatedInvoice = {
          ...state.invoices[invoiceIndex],
          Invoicenumber,
          selectDeliveryDate: today,
          selectDeliveryDatefrom,
          selectDeliveryDateto,
          paymentDue: getForwardDate(paymentTerms),
          description,
          paymentTerms,
          clientName,
          clientPhone,
          clientstatus: 'pending',
          clientStreet,
          clientCity,
          clientPostCode,
          clientCountry,
          items: items,
          total: items.reduce((acc, i) => acc + Number(i.total), 0),
          stampmoney: items.reduce((acc, i) => acc + Number(i.stampmoney), 0),
          TVA: items.reduce((acc, i) => acc + Number(i.TVA), 0),
          FinalP: items.reduce((acc, i) => acc + Number(i.FinalP), 0),
        };
        state.invoices[invoiceIndex] = updatedInvoice;
      }
    },
    // Auth-related reducers
    clearAuth: (state) => {
      state.user = null;
      state.token = null;
      state.authLoading = false;
      state.authError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Invoice-related reducers
      .addCase(fetchInvoices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInvoices.fulfilled, (state, action) => {
        state.loading = false;
        state.invoices = action.payload;
        state.filteredInvoice = action.payload;
      })
      .addCase(fetchInvoices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchInvoices19.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInvoices19.fulfilled, (state, action) => {
        state.loading = false;
        state.invoices19 = action.payload;
        state.filteredInvoice = action.payload;
      })
      .addCase(fetchInvoices19.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getInvoiceById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getInvoiceById.fulfilled, (state, action) => {
        state.loading = false;
        state.invoiceById = action.payload;
      })
      .addCase(getInvoiceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteInvoiceAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteInvoiceAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.invoices = state.invoices.filter(
          (invoice) => invoice.invoiceId !== action.payload
        );
        state.filteredInvoice = state.filteredInvoice.filter(
          (invoice) => invoice.invoiceId !== action.payload
        );
      })
      .addCase(deleteInvoiceAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchFilteredInvoices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFilteredInvoices.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredInvoice = action.payload;
      })
      .addCase(fetchFilteredInvoices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createInvoice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createInvoice.fulfilled, (state, action) => {
        state.loading = false;
        state.invoices.push(action.payload);
      })
      .addCase(createInvoice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createInvoice19.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createInvoice19.fulfilled, (state, action) => {
        state.loading = false;
        state.invoices19.push(action.payload);
      })
      .addCase(createInvoice19.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Auth-related reducers
      .addCase(loginUser.pending, (state) => {
        state.authLoading = true;
        state.authError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.authLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.authLoading = false;
        state.authError = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.authLoading = true;
        state.authError = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.authLoading = false;
        state.user = null;
        state.token = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.authLoading = false;
        state.authError = action.payload;
      });
  },
});

export const {
  filterInvoice,
  saveInvoice,
  updateInvoiceStatus,
  addInvoice,
  editInvoice,
  clearAuth,
} = invoiceSlice.actions;

export default invoiceSlice.reducer;
