import PuzzleGame from '@/components/game';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const home = () => {  
  return (
    <Fragment>
      <header className='px-3 max-w-6xl m-auto'>
        <nav className='flex justify-between items-center py-5'>
          <ul className='flex gap-2 items-center'>
            <Link href={'/'} className='text-2xl font-bold logo-text'>Puzzle Game Solver</Link>
          </ul>
          <div className='flex gap-5'>
            <Link href={'/join'} className='flex items-center justify-center w-24 h-11 bg-[#0D2106] text-md primary-text border-color rounded-md'>Join</Link>
            <button>
              <Image src={'/menu-btn.svg'} width={48} height={48} alt=''/>
            </button>
          </div>
        </nav>
      </header>
      <main className='max-w-6xl px-3 m-auto pt-12'>
        <PuzzleGame/>
      </main>
      <footer>

      </footer>
      <ToastContainer position="top-center" autoClose={3000} />
    </Fragment>
  );
};

export default home;
