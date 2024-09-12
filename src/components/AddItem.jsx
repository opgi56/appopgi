import React from 'react';
import { TrashIcon } from '@heroicons/react/24/solid';
import { validateItemCount, validateItemName, validateItemPrice, validateStampmoney } from '../function/createInvoiceValidator';

function AddItem({ itemDetails, setItem, isValidatorActive, onDelete, handelOnChange }) {
if (!itemDetails) {
return null; // or a loading spinner, or some fallback UI
}return (
    <div>
        <div className='flex dark:text-white justify-between items-center'>
            <div className='flex flex-wrap w-full'>

                {/* Monthly Rent and Delay */}
                <div className='flex w-full md:w-1/2 px-2 py-2 flex-col items-start'>
                    <h1>Monthly rent</h1>
                    <input
                        name='price'
                        type='number'
                        onChange={(e) => { handelOnChange(itemDetails.id, e) }}
                        value={itemDetails.price}
                        min={0}
                        className={`dark:bg-[#32407B] py-2 w-full px-4 border-[.2px] rounded-lg focus:outline-blue-400 border-gray-300 focus:outline-none ${isValidatorActive && !validateItemPrice(itemDetails.price) && 'border-red-500 dark:border-red-500 outline-red-500 border-2'} dark:border-gray-800`}
                    />
                </div>

                <div className='flex w-full md:w-1/2 px-2 py-2 flex-col items-start'>
                    <h1>Delay</h1>
                    <input
                        name='Delay'
                        type='number'
                        onChange={(e) => { handelOnChange(itemDetails.id, e) }}
                        value={itemDetails.Delay}
                        min={0}
                        className={`dark:bg-[#32407B] py-2 w-full px-4 border-[.2px] rounded-lg focus:outline-blue-400 border-gray-300 focus:outline-none ${isValidatorActive && !validateItemCount(itemDetails.Delay) && 'border-red-500 dark:border-red-500 outline-red-500 border-2'} dark:border-gray-800`}
                    />
                </div>

                {/* Months and Total/Delay */}
                <div className='flex w-full md:w-1/2 px-2 py-2 flex-col items-start'>
                    <h1>Months</h1>
                    <input
                        name='months'
                        type='number'
                        onChange={(e) => { handelOnChange(itemDetails.id, e) }}
                        value={itemDetails.months}
                        min={0}
                        className={`dark:bg-[#32407B] py-2 w-full px-4 border-[.2px] rounded-lg focus:outline-blue-400 border-gray-300 focus:outline-none ${isValidatorActive && !validateItemCount(itemDetails.months) && 'border-red-500 dark:border-red-500 outline-red-500 border-2'} dark:border-gray-800`}
                    />
                </div>

                <div className='flex w-full md:w-1/2 px-2 py-2 flex-col items-start'>
                    <h1>Total/delay</h1>
                    <div className='w-full dark:bg-[#32407B] py-2 px-4 border-[.2px] rounded-lg focus:outline-none focus:outline-blue-400 border-gray-300 dark:border-gray-800 dark:text-white'>
                        {itemDetails.total}
                    </div>
                </div>

                {/* Stamp Money and TVA */}
                <div className='flex w-full md:w-1/2 px-2 py-2 flex-col items-start'>
                    <h1>Stamp money</h1>
                    <div className='w-full dark:bg-[#32407B] py-2 px-4 border-[.2px] rounded-lg focus:outline-none focus:outline-blue-400 border-gray-300 dark:border-gray-800 dark:text-white'>
                        {itemDetails.stampmoney}
                    </div>
                </div>

                <div className='flex w-full md:w-1/2 px-2 py-2 flex-col items-start'>
                    <h1>TVA</h1>
                    <div className='w-full dark:bg-[#32407B] py-2 px-4 border-[.2px] rounded-lg focus:outline-none focus:outline-blue-400 border-gray-300 dark:border-gray-800 dark:text-white'>
                        {itemDetails.TVA}
                    </div>
                </div>

                {/* Final Price */}
                <div className='w-full'>
                    <div className='flex px-2 py-2 flex-col items-start'>
                        <h1>Final Price</h1>
                        <div className='w-full dark:bg-[#32407B] py-2 px-4 border-[.2px] rounded-lg focus:outline-none focus:outline-blue-400 border-gray-300 dark:border-gray-800 dark:text-white'>
                            {itemDetails.FinalP}
                        </div>
                    </div>
                </div>

            </div>

            <button onClick={() => { onDelete(itemDetails.id) }}>
                <TrashIcon className='text-gray-500 hover:text-red-500 cursor-pointer mt-4 h-6 w-6' />
            </button>
        </div>
    </div>
);}

export default AddItem;