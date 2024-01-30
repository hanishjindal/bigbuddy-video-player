'use client'
import React, { useState } from 'react'
import { DATA_SIDENAV, SIDENAV_ITEMS } from './config'
import { RiArrowLeftDoubleFill } from "react-icons/ri";

const Sidebar = () => {
    const [sidenav, setSidenav] = useState(SIDENAV_ITEMS[0]?.name);
    const [sidenavWidth, setsidenavWidth] = useState(" w-72 ");
    const [data, setData] = useState(DATA_SIDENAV)

    const handleSidenavSelect = (index) => {
        setSidenav(SIDENAV_ITEMS[index]?.name)
        setTimeout(() => {
            setsidenavWidth(" w-72 ")
        }, 10);
    }

    const handleCloseSidenav = () => {
        setsidenavWidth(" w-0 ")
        setTimeout(() => {
            setSidenav("")
        }, 100);
    }

    return (
        <nav className='h-full flex border-r-2'>
            <div className='h-full flex flex-col justify-between'>
                {
                    SIDENAV_ITEMS.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className={`${sidenav === item?.name ? "bg-white" : "bg-gray-200"} px-2 h-full w-full flex flex-col justify-center items-center hover:bg-white cursor-pointer`}
                                onClick={() => handleSidenavSelect(index)}
                            >
                                <span>{item?.icon}</span>
                                <span className='text-xs font-medium'>{item?.name}</span>
                            </div>
                        )
                    })
                }
            </div>

            {sidenav &&
                <div className={`p-8 pr-4 flex flex-col gap-5 duration-200 ${sidenavWidth}`}>
                    <div className='flex justify-between items-center'>
                        <h2 className='text-xl font-medium'>{sidenav}</h2>
                        <RiArrowLeftDoubleFill
                            className='cursor-pointer'
                            size={25}
                            onClick={handleCloseSidenav}
                        />
                    </div>

                    <div className='flex flex-wrap gap-2'>
                        {
                            data.map((link, index) => {
                                return (
                                    <img
                                        key={index}
                                        className='w-28 py-1 bg-gray-100 border-gray-400 border rounded-md cursor-pointer'
                                        src={link}
                                        alt=" "
                                    />
                                )
                            })
                        }
                    </div>
                </div>
            }
        </nav>
    )
}

export default Sidebar