"use client";
import { Fragment, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Loader from './loader';
import Solution from './solution';
import TreeView from './tree';
const { generatePuzzle, convertToBoard, convertBoardToData } = require('../utils/helper');

export default function PuzzleGame() {
    const [board, setBoard] = useState(convertToBoard([1,2,3,4,5,6,7,8,0]));
    const [loading, setLoading] = useState(false);
    const [solution, setSolution] = useState(null);

    const handleKeyPress = (event) => {
        const emptyRow = board.findIndex((row) => row.includes(null));
        const emptyCol = board[emptyRow].indexOf(null);
    
        let rowOffset = 0;
        let colOffset = 0;
    
        switch (event.key) {
          case 'ArrowUp':
            rowOffset = -1;
            break;
          case 'ArrowDown':
            rowOffset = 1;
            break;
          case 'ArrowLeft':
            colOffset = -1;
            break;
          case 'ArrowRight':
            colOffset = 1;
            break;
          default:
            return;
        }
    
        const newRow = emptyRow + rowOffset;
        const newCol = emptyCol + colOffset;
    
        if (isValidMove(newRow, newCol)) {
          const newBoard = [...board];
          newBoard[emptyRow][emptyCol] = newBoard[newRow][newCol];
          newBoard[newRow][newCol] = null;
          setBoard(newBoard);
    
          if (isGoalState(newBoard)) {
            toast.success('Congratulations! You won the game!');
          }
        }
    };
    
    const isValidMove = (row, col) => {
        return row >= 0 && row < 3 && col >= 0 && col < 3;
    };
    
    const isGoalState = (currentBoard) => {
        const goalState = [
          [1, 2, 3],
          [4, 5, 6],
          [7, 8, null],
        ];
    
        return JSON.stringify(currentBoard) === JSON.stringify(goalState);
    };

    const handleNewGame = () => {
        setBoard(convertToBoard(generatePuzzle()));
    };

    const handleSolutionClick = () => {
        setLoading(true);
        fetch("https://puzzle-solver-api.vercel.app/api/solve", {
            method: "POST",
            body: JSON.stringify({ initialState: convertBoardToData(board) }),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => response.json())
        .then((data) => {
            setSolution(data);
            console.log(data.tree);
            setLoading(false);
        })
        .catch((error) => console.error(error));
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    return (
        <div>
            <div className='flex gap-5 mb-10'>
                <button onClick={handleNewGame} className='border-color rounded-md primary-text py-2 px-3'>New Game</button>
                <button onClick={handleSolutionClick} className='primary-bg rounded-md py-2 px-3'>Solution</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="max-h-max grid grid-cols-3 max-w-md border-color rounded-xl overflow-hidden">
                    {board.map((row, rowIndex) =>
                        row.map((col, colIndex) => (
                            <button
                            key={colIndex}
                            className={`${
                                col === null ? 'bg-[#08DB06] opacity-80' : ''
                            } p-12 font-bold text-xl text-[#08DB06] outline-none border border-[#08DB06]`}
                            onClick={() => handleKeyPress({ key: 'Click' })}
                            >
                            {col}
                            </button>
                        ))
                    )}
                </div>
                <div>
                    { loading && <Loader/> }
                    {solution && (
                        <div className='py-2 flex flex-col gap-3 max-w-md'>
                            <Solution data={solution.steps} totalSteps={solution.totalStep}/>
                        </div>
                    )}
                </div>
            </div>
            { solution && 
                <div className='my-10 bg-white rounded-md overflow-hidden'>
                    <TreeView tree={solution.tree}/>
                </div>
            }
        </div>
    )
}
