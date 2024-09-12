

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AddItem from './AddItem';
import { createInvoice } from '../redux/invoiceActions';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'; // Import axios
import Select from 'react-select'
import {
validateInvoicenumber,
validateCLientPhone,
validateCLientName,
validateClientCity,
validateStatus,
validateClientStreetAddress,
validateItemCount,
validateItemCount1,
validateItemName,
validateItemPrice,
validateClientCountry,
} from '../function/createInvoiceValidator';

const CreateInvoice = ({ setOpenCreateInvoice, type, invoice }) => {
const dispatch = useDispatch();
const [isFirstLoad, setIsFirstLoad] = useState(true);
const [isValidatorActive, setIsValidatorActive] = useState(false);
const [isValid, setIsValid] = useState(true);
const [filterValue, setFilterValue] = useState('');
const deliveryTimes = [
{ text: 'Next 1 months', value: 30 },
{ text: 'Next 3 months', value: 93 },
{ text: 'Next 6 months', value: 186 },
{ text: 'Next 1 year', value: 372 },
];
const STATUS = [
    {  label: 'pending', value:'pending'},
    {  label: 'paid' , value:'paid'},
    {  label: 'draft', value: 'draft' }
  ]
const [invoiceData, setInvoiceData] = useState({
    Invoicenumber: '',
    clientName: '',
    clientPhone: '',
    clientStreet: '',
    clientCity: '',
    clientstatus:'',
    clientCountry: '',
    description: '',
    selectDeliveryDate: '',
    selectDeliveryDatefrom: '',
    selectDeliveryDateto: '',
    paymentTerms: deliveryTimes[0].value,
    items: [
        {
            name: '',
            months: 1,
            Delay: 1,
            stampmoney: 0,
            TVA: 0,
            price: 0,
            total: 0,
            FinalP: 0,
            id: uuidv4(),
        },
    ],
});


const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validator()) {
        setIsValidatorActive(true);
        setIsValid(false);
        return;
    }
    const formattedItems = invoiceData.items.map((item) => ({
        ...invoiceData,
        itemName: item.name,
        months: item.months,
        Delay: item.Delay,
        stampmoney: item.stampmoney,
        TVA: item.TVA,
        price: item.price,
        total: item.total,
        FinalP: item.FinalP,
    }));
    try {
        const response = await axios.post('http://localhost:5000/api/invoices', { formattedItems });
        console.log('Form submitted successfully:', response.data);
    } catch (error) {
        console.error('Error submitting form:', error);
    }
};

const onDelete = (id) => {
    setInvoiceData((prevData) => ({
        ...prevData,
        items: prevData.items.filter((item) => item.id !== id),
    }));
};

const handelOnChange = (id, e) => {
    let data = [...invoiceData.items];
    let foundData = data.find((el) => el.id === id);

    if (['months', 'Delay', 'price', 'total', 'stampmoney', 'TVA', 'FinalP'].includes(e.target.name)) {
        foundData[e.target.name] = e.target.value;
        foundData['total'] = (
            Number(foundData.months) * Number(foundData.price) +
            Number(foundData.months) * Number(foundData.price) * Number(foundData.Delay) * 0.05
        ).toFixed(2);
        foundData['stampmoney'] = (
            (Number(foundData.months) * Number(foundData.price) - 100) * 0.015 + 4.5
        ).toFixed(2);
        foundData['TVA'] = (Number(foundData.months) * Number(foundData.price) * 0.09).toFixed(2);
        foundData['FinalP'] = (
            Number(foundData.total) + Number(foundData.stampmoney) + Number(foundData.TVA)
        ).toFixed(2);
    } else {
        foundData[e.target.name] = e.target.value;
    }

    setInvoiceData((prevData) => ({ ...prevData, items: data }));
};

useEffect(() => {
    if (type === 'edit' && isFirstLoad) {
        const updatedItemsArray = invoice.items.map((obj, index) => ({ ...obj, id: index + 1 }));

        setInvoiceData({
            Invoicenumber: invoice.Invoicenumber,
            clientName: invoice.clientName,
            clientphone: invoice.clientPhone,
            clientStreet: invoice.clientAddress.street,
            clientCity: invoice.clientAddress.city,
            clientstatus: invoice.clientAddress.clientstatus,
            clientCountry: invoice.clientAddress.country,
            description: invoice.description,
            selectDeliveryDate: invoice.selectDeliveryDate,
            selectDeliveryDatefrom: invoice.selectDeliveryDatefrom,
            selectDeliveryDateto: invoice.selectDeliveryDateto,
            paymentTerms: invoice.paymentTerms,
            items: updatedItemsArray,
        });

        setIsFirstLoad(false);
    }
}, [invoice, isFirstLoad, type]);

function itemsValidator() {
    const itemName = invoiceData.items.map((i) => validateItemName(i.name));
    const itemCount1 = invoiceData.items.map((i) => validateItemCount1(i.months));
    const itemCount = invoiceData.items.map((i) => validateItemCount(i.Delay));
    const itemPrice = invoiceData.items.map((i) => validateItemPrice(i.price));
    const allItemsElement = itemName.concat(itemCount1, itemPrice);
    return !allItemsElement.includes(false);
}

function validator() {
    return (
        validateCLientPhone(invoiceData.clientPhone) &&
        validateCLientName(invoiceData.clientName) &&
        validateInvoicenumber(invoiceData.Invoicenumber) &&
        validateClientCity(invoiceData.clientCity) &&
        validateStatus(invoiceData.clientstatus) &&
        validateClientStreetAddress(invoiceData.clientStreet) &&
        validateClientCountry(invoiceData.clientCountry) &&
        itemsValidator()
    );
}

return (
    <form >
    <div
    onClick={(e) => {
    if (e.target !== e.currentTarget) {
    return;
    }
    setOpenCreateInvoice(false);
    }}
    className='fixed top-0 bottom-0 left-0 right-0 bg-[#000005be]'>
         <motion.div
            key='createInvoice-sidebar'
            initial={{ x: -500, opacity: 0 }}
            animate={{ opacity: 1, x: 0, transition: { type: 'spring', stiffness: 300, damping: 40, duration: 0.4 } }}
            exit={{ x: -700, transition: { duration: 0.2 } }}
            className='scrollbar-hide flex flex-col dark:text-white dark:bg-[#071952] bg-white md:pl-[150px] py-16 px-6 h-screen md:w-[768px] md:rounded-r-3xl' >
       
            <h1 className='font-semibold dark:text-white text-3xl'>
                {type === 'edit' ? 'Edit' : 'Create'} Invoice
            </h1>

            <div className='overflow-y-scroll scrollbar-hide my-14'>
                <div className='grid grid-cols-1 mx-1 space-y-4'>
                    {/* <div className='flex flex-col mr-4 col-span-1'>
                        <label className='text-Black-400 font-light'>Invoice Number</label>
                        <input
                            type='text'
                            id='Invoicenumber'
                            value={invoiceData.Invoicenumber}
                            onChange={(e) => setInvoiceData((prev) => ({ ...prev, Invoicenumber: e.target.value }))}
                            className={`dark:bg-[#32407B] py-2 px-4 border-[.2px] max-w-[400px] focus:outline-none rounded-lg focus:outline-blue-400 border-gray-300 ${
                                isValidatorActive && !validateInvoicenumber(invoiceData.Invoicenumber) && 'border-red-500 dark:border-red-500 outline-red-500 border-2'
                            } dark:border-gray-800`}
                        />
                    </div> */}

                    <div className='flex flex-col mr-4 col-span-2'>
                        <label className='text-Black-400 font-light'>Client's Name</label>
                        <input
                            type='text'
                            id='ClientsName'
                            value={invoiceData.clientName}
                            onChange={(e) => setInvoiceData((prev) => ({ ...prev, clientName: e.target.value }))}
                            className={`dark:bg-[#32407B] py-2 px-4 border-[.2px] max-w-[400px] focus:outline-none rounded-lg focus:outline-blue-400 border-gray-300 ${
                                isValidatorActive && !validateCLientName(invoiceData.clientName) && 'border-red-500 dark:border-red-500 outline-red-500 border-2'
                            } dark:border-gray-800`}
                        />
                    </div>

                    <div className='flex flex-col mr-4 col-span-2'>
                        <label className='text-Black-400 font-light'>Client's Phone</label>
                        <input
                            type='phone'
                            id='clientsPhone'
                            value={invoiceData.clientPhone}
                            onChange={(e) => setInvoiceData((prev) => ({ ...prev, clientPhone: e.target.value }))}
                            className={`dark:bg-[#32407B] py-2 px-4 border-[.2px] max-w-[400px] focus:outline-none rounded-lg focus:outline-blue-400 border-gray-300 ${
                                isValidatorActive && !validateCLientPhone(invoiceData.clientPhone) && 'border-red-500 dark:border-red-500 outline-red-500 border-2'
                            } dark:border-gray-800`}
                        />
                    </div>

                    <div className='flex flex-col mr-4 col-span-2'>
                        <label className='text-Black-400 font-light'>Client's Street Address</label>
                        <input
                            type='text'
                            id='streetaddress'
                            value={invoiceData.clientStreet}
                            onChange={(e) => setInvoiceData((prev) => ({ ...prev, clientStreet: e.target.value }))}
                            className={`dark:bg-[#32407B] py-2 px-4 border-[.2px] max-w-[400px] focus:outline-none rounded-lg focus:outline-blue-400 border-gray-300 ${
                                isValidatorActive && !validateClientStreetAddress(invoiceData.clientStreet) && 'border-red-500 dark:border-red-500 outline-red-500 border-2'
                            } dark:border-gray-800`}
                        />
                    </div>

                    <div className='flex flex-col mr-4 col-span-2'>
                        <label className='text-Black-400 font-light'>Client's City</label>
                        <input
                            type='text'
                            id='city'
                            value={invoiceData.clientCity}
                            onChange={(e) => setInvoiceData((prev) => ({ ...prev, clientCity: e.target.value }))}
                            className={`dark:bg-[#32407B] py-2 px-4 border-[.2px] max-w-[400px] focus:outline-none rounded-lg focus:outline-blue-400 border-gray-300 ${
                                isValidatorActive && !validateClientCity(invoiceData.clientCity) && 'border-red-500 dark:border-red-500 outline-red-500 border-2'
                            } dark:border-gray-800`}
                        />
                    </div>

                     <div className='flex flex-col mr-4 col-span-2'>
                        <label className='text-Black-400 font-light'>Client status</label>
                        <select
                            value={invoiceData.clientstatus}
                            onChange={(e) => setInvoiceData((prev) => ({ ...prev, clientstatus: e.target.value }))}
                            className='dark:bg-[#32407B] py-2 px-4 border-[.2px] max-w-[400px] focus:outline-none rounded-lg focus:outline-blue-400 border-gray-300 dark:border-gray-800'
                        >
                            {STATUS.map((statue) => (
                                <option key={statue.value} value={statue.value}>
                                    {statue.label}
                                </option>
                            ))}
                        </select>
                    </div> 

                    <div className='flex flex-col mr-4 col-span-2'>
                        <label className='text-Black-400 font-light'>Client's Country</label>
                        <input
                            type='text'
                            id='country'
                            value={invoiceData.clientCountry}
                            onChange={(e) => setInvoiceData((prev) => ({ ...prev, clientCountry: e.target.value }))}
                            className={`dark:bg-[#32407B] py-2 px-4 border-[.2px] max-w-[400px] focus:outline-none rounded-lg focus:outline-blue-400 border-gray-300 ${
                                isValidatorActive && !validateClientCountry(invoiceData.clientCountry) && 'border-red-500 dark:border-red-500 outline-red-500 border-2'
                            } dark:border-gray-800`}
                        />
                    </div>

                    <div className='flex flex-col mr-4 col-span-2'>
                        <label className='text-Black-400 font-light'>Description</label>
                        <textarea
                        id='description'
                            value={invoiceData.description}
                            onChange={(e) => setInvoiceData((prev) => ({ ...prev, description: e.target.value }))}
                            className='dark:bg-[#32407B] py-2 px-4 border-[.2px] max-w-[400px] focus:outline-none rounded-lg focus:outline-blue-400 border-gray-300 dark:border-gray-800'
                            rows='5'
                        />
                    </div>

                    {/* <div className='flex flex-col mr-4 col-span-2'>
                        <label className='text-Black-400 font-light'>Payment Terms</label>
                        <select
                            value={invoiceData.paymentTerms}
                            onChange={(e) => setInvoiceData((prev) => ({ ...prev, paymentTerms: e.target.value }))}
                            className='dark:bg-[#32407B] py-2 px-4 border-[.2px] max-w-[400px] focus:outline-none rounded-lg focus:outline-blue-400 border-gray-300 dark:border-gray-800'
                        >
                            {deliveryTimes.map((term) => (
                                <option key={term.value} value={term.value}>
                                    {term.text}
                                </option>
                            ))}
                        </select>
                    </div> */}

                    <div className='flex flex-col mr-4 col-span-2'>
                        <label className='text-Black-400 font-light'>Select Delivery Date</label>
                        <input
                            type='date'
                            id='date1'
                            value={invoiceData.selectDeliveryDate}
                            onChange={(e) => setInvoiceData((prev) => ({ ...prev, selectDeliveryDate: e.target.value }))}
                            className='dark:bg-[#32407B] py-2 px-4 border-[.2px] max-w-[400px] focus:outline-none rounded-lg focus:outline-blue-400 border-gray-300 dark:border-gray-800'
                        />
                    </div>

                    <div className='flex flex-col mr-4 col-span-2'>
                        <label className='text-Black-400 font-light'>Select Delivery Date From</label>
                        <input
                            type='date'
                            id='dateto'
                            value={invoiceData.selectDeliveryDatefrom}
                            onChange={(e) => setInvoiceData((prev) => ({ ...prev, selectDeliveryDatefrom: e.target.value }))}
                            className='dark:bg-[#32407B] py-2 px-4 border-[.2px] max-w-[400px] focus:outline-none rounded-lg focus:outline-blue-400 border-gray-300 dark:border-gray-800'
                        />
                    </div>

                    <div className='flex flex-col mr-4 col-span-2'>
                        <label className='text-Black-400 font-light'>Select Delivery Date To</label>
                        <input
                            type='date'
                            id='datefrom'
                            value={invoiceData.selectDeliveryDateto}
                            onChange={(e) => setInvoiceData((prev) => ({ ...prev, selectDeliveryDateto: e.target.value }))}
                            className='dark:bg-[#32407B] py-2 px-4 border-[.2px] max-w-[400px] focus:outline-none rounded-lg focus:outline-blue-400 border-gray-300 dark:border-gray-800'
                        />
                    </div>
                </div>

                <div className='my-4'>
                    <h2 className='text-Black-400 font-light text-lg'>Invoice Items</h2>

                    {invoiceData.items.map((itemDetails, index) => (
                        <AddItem
                            key={itemDetails.id}
                            itemDetails={itemDetails}
                            setItem={setInvoiceData}
                            isValidatorActive={isValidatorActive}
                            onDelete={onDelete}
                            handelOnChange={handelOnChange}
                        />
                    ))}

                    <button
                        onClick={() => {
                            setInvoiceData((prevData) => ({
                                ...prevData,
                                items: [
                                    ...prevData.items,
                                    {
                                        name: '',
                                        months: 1,
                                        Delay: 1,
                                        stampmoney: 0,
                                        TVA: 0,
                                        price: 0,
                                        total: 0,
                                        FinalP: 0,
                                        id: uuidv4(),
                                    },
                                ],
                            }));
                        }}
                        className='mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                    >
                        Add Item
                    </button>
                </div>
            </div>

            <div className='flex justify-between'>
                <button
                    onClick={() => setOpenCreateInvoice(false)}
                    className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'
                >
                    Cancel
                </button>
                
                <button
                   type="submit"
                   onClick={handleSubmit}
                   
                   className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                >
                        Save
                </button>
       
            </div>
        </motion.div>
    </div>
   </form>
);
}

export default CreateInvoice; 