/**
 * @param {string} projectName - The Title of the project.
 * @param {boolean} cloudSave - To check project is saved or not.
 * @param {function} onItemClick - A callback function to invoke when an item is clicked.
 */
import React, { useState } from 'react'
import { BsCloudArrowUp, BsCloudCheck } from "react-icons/bs";

const Header = ({ projectName, cloudSave }) => {
    const [editName, setEditName] = useState('')
    return (
        <header className='w-full px-5 py-6 bg-black text-white flex justify-between items-center text-sm'>
            <div className=''>
                <img
                    src="/next.svg"
                    alt="logo"
                    className='w-10'
                />
            </div>

            <div className='flex items-center gap-4'>
                <span>{projectName}</span>

                {cloudSave ?
                    <BsCloudCheck className='text-white' size={20} />
                    :
                    < BsCloudArrowUp className='text-white' size={20} />
                }
            </div>

            <div className='flex items-center gap-8'>
                <button>Import</button>
                <button>Export</button>
                {/* <button>Play</button> */}
            </div>
        </header>
    )
}

export default Header