import React from 'react';
import { TrashIcon } from '@heroicons/react/24/solid';
import {
  validateItemCount,
  validateItemName,
  validateItemPrice,
  validateStampmoney
} from '../function/createInvoiceValidator';

function AddItem({ itemDetails, isValidatorActive, onDelete, handelOnChange }) {
  if (!itemDetails) {
    return null; // or a loading spinner, or some fallback UI
  }

  return (
    <div>
      <div className='flex dark:text-white justify-between items-center'>
        <div className='flex flex-wrap w-full'>

          {/* Item Name */}
          {/* <div className='flex w-full md:w-1/2 px-2 py-2 flex-col items-start'>
            <h1>Item Name</h1>
            <input
              name='itemName19'
              type='text'
              onChange={(e) => { handelOnChange(itemDetails.id, e) }}
              value={itemDetails.itemName19}
              className={`dark:bg-[#32407B] py-2 w-full px-4 border-[.2px] rounded-lg focus:outline-blue-400 border-gray-300 focus:outline-none ${isValidatorActive && !validateItemName(itemDetails.itemName19) && 'border-red-500 dark:border-red-500 outline-red-500 border-2'} dark:border-gray-800`}
            />
          </div> */}

          {/* Monthly Rent */}
          <div className='flex w-full md:w-1/2 px-2 py-2 flex-col items-start'>
            <h1>Monthly Rent</h1>
            <input
              name='price19'
              type='number'
              onChange={(e) => { handelOnChange(itemDetails.id, e) }}
              value={itemDetails.price19}
              min={0}
              className={`dark:bg-[#32407B] py-2 w-full px-4 border-[.2px] rounded-lg focus:outline-blue-400 border-gray-300 focus:outline-none ${isValidatorActive && !validateItemPrice(itemDetails.price19) && 'border-red-500 dark:border-red-500 outline-red-500 border-2'} dark:border-gray-800`}
            />
          </div>

          {/* Delay */}
          <div className='flex w-full md:w-1/2 px-2 py-2 flex-col items-start'>
            <h1>Delay (Days)</h1>
            <input
              name='Delay19'
              type='number'
              onChange={(e) => { handelOnChange(itemDetails.id, e) }}
              value={itemDetails.Delay19}
              min={0}
              className={`dark:bg-[#32407B] py-2 w-full px-4 border-[.2px] rounded-lg focus:outline-blue-400 border-gray-300 focus:outline-none ${isValidatorActive && !validateItemCount(itemDetails.Delay19) && 'border-red-500 dark:border-red-500 outline-red-500 border-2'} dark:border-gray-800`}
            />
          </div>

          {/* Months */}
          <div className='flex w-full md:w-1/2 px-2 py-2 flex-col items-start'>
            <h1>Months</h1>
            <input
              name='months19'
              type='number'
              onChange={(e) => { handelOnChange(itemDetails.id, e) }}
              value={itemDetails.months19}
              min={0}
              className={`dark:bg-[#32407B] py-2 w-full px-4 border-[.2px] rounded-lg focus:outline-blue-400 border-gray-300 focus:outline-none ${isValidatorActive && !validateItemCount(itemDetails.months19) && 'border-red-500 dark:border-red-500 outline-red-500 border-2'} dark:border-gray-800`}
            />
          </div>

          {/* Total */}
          <div className='flex w-full md:w-1/2 px-2 py-2 flex-col items-start'>
            <h1>Total</h1>
            <div className='w-full dark:bg-[#32407B] py-2 px-4 border-[.2px] rounded-lg focus:outline-none focus:outline-blue-400 border-gray-300 dark:border-gray-800 dark:text-white'>
              {itemDetails.total19}
            </div>
          </div>

          {/* Stamp Money */}
          <div className='flex w-full md:w-1/2 px-2 py-2 flex-col items-start'>
            <h1>Stamp Money</h1>
            <input
              name='stampmoney19'
              type='number'
              onChange={(e) => { handelOnChange(itemDetails.id, e) }}
              value={itemDetails.stampmoney19}
              min={0}
              className={`dark:bg-[#32407B] py-2 w-full px-4 border-[.2px] rounded-lg focus:outline-blue-400 border-gray-300 focus:outline-none ${isValidatorActive && !validateStampmoney(itemDetails.stampmoney19) && 'border-red-500 dark:border-red-500 outline-red-500 border-2'} dark:border-gray-800`}
            />
          </div>

          {/* TVA */}
          <div className='flex w-full md:w-1/2 px-2 py-2 flex-col items-start'>
            <h1>TVA</h1>
            <input
              name='TVA19'
              type='number'
              onChange={(e) => { handelOnChange(itemDetails.id, e) }}
              value={itemDetails.TVA19}
              min={0}
              className='dark:bg-[#32407B] py-2 w-full px-4 border-[.2px] rounded-lg focus:outline-blue-400 border-gray-300 focus:outline-none dark:border-gray-800'
            />
          </div>

          {/* Final Price */}
          <div className='w-full'>
            <div className='flex px-2 py-2 flex-col items-start'>
              <h1>Final Price</h1>
              <div className='w-full dark:bg-[#32407B] py-2 px-4 border-[.2px] rounded-lg focus:outline-none focus:outline-blue-400 border-gray-300 dark:border-gray-800 dark:text-white'>
                {itemDetails.FinalP19}
              </div>
            </div>
          </div>

        </div>

        <button onClick={() => { onDelete(itemDetails.id) }}>
          <TrashIcon className='text-gray-500 hover:text-red-500 cursor-pointer mt-4 h-6 w-6' />
        </button>
      </div>
    </div>
  );
}

export default AddItem;
