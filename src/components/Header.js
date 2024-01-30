/**
 * @param {string} projectName - The Title of the project.
 * @param {boolean} cloudSave - To check project is saved or not.
 * @param {function} setProjectName - A callback function to set project name.
 * @param {function} handleInput - A callback function to handle change project name.
 * @param {function} triggerImport - A function to import project.
 * @param {function} triggerExport - A function to export project.
 */

import React, { useState, useRef } from 'react'
import { BsCloudArrowUp, BsCloudCheck } from "react-icons/bs";
import { RiStackFill } from "react-icons/ri";

const Header = ({ projectName, setProjectName, cloudSave, triggerImport, triggerExport }) => {
    const [editName, setEditName] = useState(false);
    const [newName, setNewName] = useState(projectName);
    const inputRef = useRef()

    const handleChangeName = () => {
        setEditName(true);
        setTimeout(() => {
            inputRef.current.focus();
        }, 0);
    }

    const handleInput = (e) => {
        setNewName(e.target.value);
    }

    const handleInputFocusOut = () => {
        setEditName(false);
        const name = newName.trim();
        if (name) {
            setNewName(name);
            setProjectName(name);
        } else {
            setNewName(projectName)
        }
    }
    return (
        <header className='w-full px-5 py-3 bg-black text-white flex justify-between items-center text-sm'>
            <div className=''>
                <RiStackFill className='text-white' size={30} />
            </div>

            <div className='flex items-center gap-4'>
                {editName ?
                    <input
                        type="text"
                        className='px-1 text-black w-32 focus-visible:outline-none'
                        value={newName}
                        onChange={handleInput}
                        onBlur={handleInputFocusOut}
                        ref={inputRef}
                    />
                    :
                    <span onClick={handleChangeName}>
                        {projectName}
                    </span>
                }

                {cloudSave ?
                    <BsCloudCheck className='text-white' size={20} />
                    :
                    <BsCloudArrowUp className='text-white' size={20} />
                }
            </div>

            <div className='flex items-center gap-8'>
                <button onClick={triggerImport}>Import</button>
                <button onClick={triggerExport}>Export</button>
                {/* <button>Play</button> */}
            </div>
        </header>
    )
}

export default Header