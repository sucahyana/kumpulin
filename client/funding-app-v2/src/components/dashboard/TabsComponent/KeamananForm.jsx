import React from "react";
import {Password} from "primereact/password";

const KeamananForm = ({Button }) => {
    return (
        <form className="flex flex-col gap-6 text-gray-800 w-full ">
            <div className="flex flex-col w-fit">
                <label htmlFor="password"><span
                    className="text-base font-medium text-blue-950">Password Lama</span></label>
                <Password id="oldPassword"
                       className="border-2 border-gray-300 roundedbg-gray-50"
                       defaultValue="" toggleMask feedback={false}/>
            </div>

            <hr className="h-0.5"/>
            <div className="flex flex-row flex-wrap justify-between gap-4">
                <div className="flex flex-col w-fit">
                    <label htmlFor="password"><span
                        className="text-base font-medium text-blue-950">Password Baru</span></label>
                    <Password id="oldPassword"
                              className="border-2 border-gray-300 roundedbg-gray-50"
                              defaultValue="" toggleMask feedback={false}/>
                </div>
                <div className="flex flex-col w-fit">
                    <label htmlFor="password"><span
                        className="text-base font-medium text-blue-950">Confirm Password Baru</span></label>
                    <Password id="oldPassword"
                              className="border-2 border-gray-300 roundedbg-gray-50"
                              defaultValue="" toggleMask feedback={false}/>
                </div>
            </div>
            {Button()}
        </form>
    );
};

export default KeamananForm;
