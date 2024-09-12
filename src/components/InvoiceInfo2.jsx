import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import leftArrow from '../assets/icon-arrow-left.svg';
import { AnimatePresence, motion } from 'framer-motion';
import PaidStatus from './PaidStatus';
import { useDispatch } from 'react-redux';
import { updateInvoiceStatus } from '../redux/invoiceSlice';
import formatDate from '../function/formatDate';
import DeleteModal from './DeleteModal';
import CreateInvoice2 from './CreateInvoice2';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';
import { PDFDownloadLink } from '@react-pdf/renderer';
import InvoicePDF2 from './InvoicePDF2';

function InvoiceInfo2({ onDelete }) {
  const navigate = useNavigate();
  const { Id } = useParams();
  const dispatch = useDispatch();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [invoice, setInvoice] = useState(null);
  const componentRef = useRef();

  const onMakePaidClick = () => {
    dispatch(updateInvoiceStatus({ Id, clientstatus: 'paid' }));
    fetchInvoice(); // Refetch the updated invoice
  };

  const fetchInvoice = () => {
    console.log('Fetching invoice with ID:', Id);
    axios
      .get(`http://localhost:5000/api/invoices19/${Id}`)
      .then((response) => {
        console.log('Invoice fetched:', response.data);
        setInvoice(response.data);
      })
      .catch((error) => {
        console.error('Error fetching invoice:', error);
        console.log('Error details:', error.response); // Additional logging
      });
  };

  useEffect(() => {
    if (Id) {
      fetchInvoice();
    }
  }, [Id]);

  const onDeleteButtonClick = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/invoices19/${Id}`);
      navigate('/'); // Navigate back to the invoice list or another route
    } catch (error) {
      console.error("Error deleting the invoice:", error);
    }
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Invoice_${invoice?.Id || ''}`
  });

  if (!invoice) {
    return <div>Loading...</div>; // Render a loading state if the invoice is not yet loaded
  }

  return (
    <div className="bg-[#40A2D8] dark:bg-[#071950] min-h-screen py-4 px-4 md:px-8 lg:px-16 flex justify-center">
      {isDeleteModalOpen && (
        <DeleteModal
          Id={Id}
          onDeleteButtonClick={onDeleteButtonClick}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
        />
      )}
      {isEditOpen && (
        <CreateInvoice2
          items={invoice.Id} // Assuming items are part of the invoice
          mode="edit"
          invoice={invoice}
          onClose={() => setIsEditOpen(false)}
        />
      )}
      <div className="invoice-container">
        <motion.div
          ref={componentRef}
          key="invoice-info"
          initial={{ x: 0 }}
          animate={{ x: 0 }}
          exit={{ x: '200%' }}
          transition={{ duration: 0.5 }}
          className="dark:bg-[#071950] mx-auto duration-300 min-h-screen bg-[#D3E0EA] py-[34px] px-2 md:px-8 lg:px-12 max-w-3xl lg:py-[72px]"
        >
          <div>
            <button onClick={() => navigate(-1)} className="flex items-center space-x-4 group dark:text-white font-thin">
              <img src={leftArrow} alt="Go back" />
              <p className="group-hover:opacity-80">Go back</p>
            </button>

            <div className="mt-8 rounded-lg w-full flex items-center justify-between px-6 py-6 bg-white dark:bg-[#1e2139]">
              <div className="flex space-x-2 justify-between md:justify-start md:w-auto w-full items-center">
                <h1 className="text-gray-600 dark:text-gray-400">Status</h1>
                <PaidStatus status={invoice.clientstatus || 'pending'} />
              </div>
              <div className="md:block hidden">
                <PDFDownloadLink
                  document={<InvoicePDF2 invoice={invoice} />}
                  fileName={`Invoice_${invoice.Id}.pdf`}
                  className="ml-3 text-center text-white bg-gray-500 hover:opacity-80 p-3 px-7 rounded-full"
                >
                  {({ blob, url, loading, error }) =>
                    loading ? 'Loading document...' : 'Print'
                  }
                </PDFDownloadLink>
                <button
                  onClick={() => setIsDeleteModalOpen(true)}
                  className="ml-3 text-center text-white bg-red-500 hover:opacity-80 p-3 px-7 rounded-full"
                >
                  Delete
                </button>
                {/* <button
                  onClick={onMakePaidClick}
                  className="ml-3 text-center text-white bg-[#7c5dfa] hover:opacity-80 p-3 px-7 rounded-full"
                >
                  Mark as Paid
                </button> */}
              </div>
            </div>

            <div className="mt-4 rounded-lg w-full px-6 py-6 bg-white dark:bg-[#1e2139]">
              <div className="flex flex-col md:flex-row items-start justify-between w-full">
                <div>
                  <h1 className="font-semibold dark:text-white text-xl">
                    <span className="text-[#7e88c3]">#</span>
                    {invoice.Id}
                  </h1>
                  <p className="text-sm text-gray-500">{invoice.clientName19}</p>
                </div>
                <div className="mt-4 md:mt-0 text-left text-gray-400 text-sm md:text-right flex flex-col items-center">
                  <p>Invoice Date: {formatDate(invoice.selectDeliveryDate19)}</p>                
                  <p>Invoice Number: {invoice.Id}</p>
                  <p>OPGI Djanet</p>
                  <p>029 48 10 78</p>
                </div>
              </div>

              <div className="mt-10 w-full">
                <h3 className="text-lg font-semibold mb-4 dark:text-white">Client Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 font-thin">Client Name</p>
                    <p className="dark:text-white text-bg text-black-500">{invoice.clientName19}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 font-thin">Invoice Date From:</p>
                    <p className="dark:text-white">{formatDate(invoice.selectDeliveryDatefrom19)}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 font-thin">Invoice Date To:</p>
                    <p className="dark:text-white"> {formatDate(invoice.selectDeliveryDateto19)}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 font-thin">Client Address:</p>
                    <p className="dark:text-white">
                      {invoice.clientStreet19}, {invoice.clientCity19}, {invoice.clientCountry19}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-3 w-full">
                <h3 className="text-lg font-semibold mb-3 dark:text-white">Invoice Items</h3>
                <div className="grid grid-cols-7 gap-1">
                  <p className="text-gray-400 font-thin">Months</p>
                  <p className="text-gray-400 font-thin">Delay</p>
                  <p className="text-gray-400 font-thin">Monthly Rent</p>
                  <p className="text-gray-400 font-thin">Stamp Money</p>
                  <p className="text-gray-400 font-thin">TVA (9%)</p>
                  <p className="text-gray-400 font-thin">Delay/Total</p>
                  <p className="text-gray-400 font-thin">Final Price</p>
                  <p className="dark:text-white">{invoice.months19}</p>
                  <p className="dark:text-white">{invoice.Delay19}</p>
                  <p className="dark:text-white">{invoice.price19}</p>
                  <p className="dark:text-white">{invoice.stampmoney19}</p>
                  <p className="dark:text-white">{invoice.TVA19}</p>
                  <p className="dark:text-white">{invoice.total19}</p>
                  <p className="dark:text-white">{invoice.FinalP19}</p>
                </div>
                <div className=' p-3 font-semibold 
                  text-white rounded-lg rounded-t-none 
                  justify-between flex dark:bg-black 
                  bg-gray-700 '>
                  <h3 className=' text-xl '>
                    FINAL PRICE : 
                  </h3>
                  <h1 className=' text-3xl'>
                    {invoice.FinalP19}
                  </h1>
                </div>
              </div>
            </div>
            {isDeleteModalOpen && (
              <DeleteModal
                onDeleteButtonClick={onDeleteButtonClick}
                setIsDeleteModalOpen={setIsDeleteModalOpen}
                Id={Id}
              />
            )}
            <AnimatePresence>{isEditOpen && <CreateInvoice2 invoice={invoice} type="edit" setOpenCreateInvoice={setIsEditOpen} />}</AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default InvoiceInfo2;
