"use client";
import { Fragment, useEffect, useState } from 'react';
const { convertToBoard } = require('../utils/helper');

export default function Solution({data, totalSteps}) {
    const [board, setBoard] = useState(convertToBoard(data[0]));
    const [currentStep, setCurrentStep] = useState(0)

    const handleNextStep = () => {
        setCurrentStep(currentStep + 1);
        setBoard(convertToBoard(data[currentStep + 1 ]))
    };
    
    const handlePreviousStep = () => {
        setCurrentStep(currentStep - 1);
        setBoard(convertToBoard(data[currentStep - 1]))
    };

    useEffect(() => {
        setBoard(convertToBoard(data[0]));
        setCurrentStep(0);
    }, [data]);

    return (
        <div>
            <div className="grid grid-cols-3 max-w-md border-color rounded-xl overflow-hidden">
                {board.map((row, rowIndex) =>
                    row.map((col, colIndex) => (
                        <button
                        key={colIndex}
                        className={`${
                            col === null ? 'bg-[#08DB06] opacity-80' : ''
                        } p-12 font-bold text-xl text-[#08DB06] outline-none border border-[#08DB06]`}
                        >
                            {col}
                        </button>
                    ))
                )}
            </div>

            <div>
                <div className='my-5'>
                    <h3 className='text-xl primary-text'>Step: {currentStep + 1}</h3>
                    <h3 className='text-xl primary-text'>Total Steps: {totalSteps}</h3>
                </div>
                <div className='flex justify-between gap-2'>
                    <button 
                        className='w-full border-color py-2 px-3 rounded-md primary-text'
                        onClick={handlePreviousStep} disabled={currentStep <= 0}
                    >
                        Previous
                    </button>
                    <button
                        className='w-full border-color py-2 px-3 rounded-md primary-text'
                        onClick={handleNextStep}
                        disabled={ currentStep == data.length -1 }
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}
