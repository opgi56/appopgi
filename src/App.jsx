import React from 'react';
import Header from './components/Header';
import Center from './components/center';
import Center2 from './components/center2';
import { AnimatePresence } from 'framer-motion';
import InvoiceTable from './components/InvoiceTable'
import InvoiceTable2 from './components/InvoiceTable2'
import { Routes, Route, useLocation } from 'react-router-dom';
import InvoiceInfo from './components/InvoiceInfo';
import InvoiceInfo2 from './components/InvoiceInfo2';
import { useDispatch } from 'react-redux';
import invoiceSlice from './redux/invoiceSlice';
import Login from './components/Login'
import PrivateRoute from './components/PrivateRoute';
//import invoiceSlice2 from './redux/invoiceSlice2';

function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  const onDelete = (id) => {
    dispatch(invoiceSlice.actions.deleteInvoice({ id }));
    dispatch(invoiceSlice2.actions.deleteInvoice({ id }));
  };

  return (
    <div className='dark:bg-[#201658] bg-[#40A2D8] duration-300 min-h-screen'>
       <Header />
 
      <AnimatePresence mode='wait'>
      {/* <Login /> */}
        <Routes location={location} key={location.pathname}>
        {/* <Route path="/login" element={<Login />} /> */}
         {/* Protected Route */}
        {/* <Route path="/Header" element={<PrivateRoute><Header /></PrivateRoute>} /> */}

        <Route path="/center" element={<Center />} />
        <Route path="/center2" element={<Center2 />} />
          <Route path='/' element={<Center />} />
          <Route path="/InvoiceTable" element={<InvoiceTable />} />
        <Route path="/InvoiceTable2" element={<InvoiceTable2/>} />
          <Route path='/invoice/:invoiceId' element={<InvoiceInfo onDelete={onDelete} />} />
         {/* <Route path='/invoice/:Id' element={<InvoiceInfo2 onDelete={onDelete} />} />  */}
         <Route path="/invoice19/:Id" element={<InvoiceInfo2/>} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
