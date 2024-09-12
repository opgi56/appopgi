import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInvoices19 } from '../redux/invoiceActions'; // Updated to fetch invoices19
import formatDate from '../function/formatDate';

function InvoiceTable2() {
  const dispatch = useDispatch();
  const invoices19 = useSelector((state) => state.invoices.invoices19 || []); // Updated to use invoices19
  const [searchTerm, setSearchTerm] = useState(''); // State to track search input

  useEffect(() => {
    // Fetch all invoices from invoices19 when the component mounts
    dispatch(fetchInvoices19());
  }, [dispatch]);

  // Filter invoices based on the search term
  const filteredInvoices = invoices19.filter((invoice) =>
    invoice.clientName19.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='dark:bg-[#071950] scrollbar-hide duration-300 min-h-screen bg-[#40A2D8] py-[34px] px-2 md:px-8 lg:px-12 lg:py-[72px]'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='lg:text-4xl md:text-2xl text-xl dark:text-white tracking-wide font-semibold mb-6'>Invoices 19%</h1>
        <input
          type='text'
          placeholder='Search by Client Name'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='w-[400px] mb-4 p-2 border rounded-lg dark:bg-white dark:text-black'
        />
        {filteredInvoices.length > 0 ? (
          <div className='overflow-x-auto'>
            <table className='min-w-full bg-white dark:bg-[#1e2139] rounded-lg shadow-md'>
              <thead>
                <tr>
                  <th className='py-3 px-6 bg-gray-200 dark:bg-[#3A3A35] text-left text-xs font-semibold text-gray-700 dark:text-white uppercase tracking-wider'>Invoice Number</th>
                  <th className='py-3 px-6 bg-gray-200 dark:bg-[#3A3A35] text-left text-xs font-semibold text-gray-700 dark:text-white uppercase tracking-wider'>Client Name</th>
                  <th className='py-3 px-6 bg-gray-200 dark:bg-[#3A3A35] text-left text-xs font-semibold text-gray-700 dark:text-white uppercase tracking-wider'>Phone Number</th>
                  <th className='py-3 px-6 bg-gray-200 dark:bg-[#3A3A35] text-left text-xs font-semibold text-gray-700 dark:text-white uppercase tracking-wider'>Payment Date From </th>
                  <th className='py-3 px-6 bg-gray-200 dark:bg-[#3A3A35] text-left text-xs font-semibold text-gray-700 dark:text-white uppercase tracking-wider'>Payment Date To</th>
                  <th className='py-3 px-6 bg-gray-200 dark:bg-[#3A3A35] text-left text-xs font-semibold text-gray-700 dark:text-white uppercase tracking-wider'>Client City</th>
                  <th className='py-3 px-6 bg-gray-200 dark:bg-[#3A3A35] text-left text-xs font-semibold text-gray-700 dark:text-white uppercase tracking-wider'>Client Status</th>
                  <th className='py-3 px-6 bg-gray-200 dark:bg-[#3A3A35] text-left text-xs font-semibold text-gray-700 dark:text-white uppercase tracking-wider'>Final Price</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.slice().reverse().map((invoice) => (
                  <tr key={invoice.Id} className='border-b'> {/* Assigning a unique key here */}
                    <td className='py-4 px-6 text-sm font-medium text-gray-900 dark:text-white'>{invoice.Invoicenumber19}</td>
                    <td className='py-4 px-6 text-sm text-gray-700 dark:text-white'>{invoice.clientName19}</td>
                    <td className='py-4 px-6 text-sm text-gray-700 dark:text-white'>{invoice.clientPhone19}</td>
                    <td className='py-4 px-6 text-sm text-gray-700 dark:text-white'>{formatDate(invoice.selectDeliveryDatefrom19)}</td>
                    <td className='py-4 px-6 text-sm text-gray-700 dark:text-white'>{formatDate(invoice.selectDeliveryDateto19)}</td>
                    <td className='py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white'>{invoice.clientCity19} </td>
                    <td className='py-4 px-6 text-sm font-semibold text-[#6C946F] dark:text-[#7776B3]'>{invoice.clientstatus19} </td>
                    <td className='py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white'>{invoice.FinalP19} $</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className='text-center text-gray-500'>No invoices found</p>
        )}
      </div>
    </div>
  );
}

export default InvoiceTable2;
