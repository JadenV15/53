import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Separator } from '@/components/ui/separator.jsx';
import confetti from 'canvas-confetti';
import './App.css';

function ConfettiTrigger() {
  function shootStars() {
    const defaults = {
      spread: 360,
      ticks: 50,
      gravity: 0,
      decay: 0.94,
      startVelocity: 30,
      colors: ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8']
    };

    function shoot() {
      confetti({
        ...defaults,
        particleCount: 40,
        scalar: 1.2,
        shapes: ['star']
      });

      confetti({
        ...defaults,
        particleCount: 10,
        scalar: 0.75,
        shapes: ['circle']
      });
    }
    
    let timers = []
    for (let i = 0; i < 8; i++) {
      timers.push(setTimeout(shoot, i*120));
    }

    return () => {
      timers.forEach(clearTimeout);
    };
  }

  function shootRandom() {
    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }
    
    function shoot() {
      confetti({
        angle: randomInRange(55, 125),
        spread: randomInRange(50, 70),
        particleCount: randomInRange(50, 100),
        origin: { y: 0.6 }
      });
    }

    let timers = []
    for (let i = 0; i < 3; i++) {
      timers.push(setTimeout(shoot, i*500));
    }

    return () => {
      timers.forEach(clearTimeout);
    };
  }

  function shootAll() {
    const a = shootStars();
    const b = shootRandom();
    return () => {
      a();
      b();
    };
  }

  useEffect(() => {
    return shootAll();
  }, []);

  return (
    <Button onClick={shootAll} variant='ghost' size='icon' className='rounded-full'>
      🎉
    </Button>
  );
}

function ModeToggle() {
  return (
    <Button onClick={() => {document.body.classList.toggle('dark');setDark(!dark)}} variant='ghost' size='icon' className='rounded-full'>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4.5"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
        <path d="M12 3l0 18" />
        <path d="M12 9l4.65 -4.65" />
        <path d="M12 14.3l7.37 -7.37" />
        <path d="M12 19.6l8.85 -8.85" />
      </svg>
    </Button>
  );
}

function Overlays() {
  const [dark, setDark] = useState(false);
  return (
    <div className='flex justify-center items-center gap-[1.5px] fixed top-3 right-3 rounded-lg border-6 border-transparent ring-1 ring-foreground/25'>
    {/*For some reason, padding is ignored, so use the border as padding and ring as border*/}
      <ConfettiTrigger />
      <ModeToggle />
    </div>
  );
}

function Header() {
  return (
    <>
    </>
  );
}

function Main() {
  return (
    <div className='flex-1 flex flex-col justify-center items-center w-full px-4 my-4'>
      <div className='flex flex-col justify-center items-center h-fit w-fit gap-0'>
        <video muted loop controls preload="none" poster="/cake.png" className="object-contain h-100 w-auto max-h-full max-w-full rounded-t-2xl dark:ring-1 dark:ring-foreground/25">
          <source src="/cake.mp4" type="video/mp4" />
          {/*Fallback*/}
          <img src='/cake.png' className='object-contain h-100 w-auto max-h-full max-w-full rounded-t-2xl dark:ring-1 dark:ring-foreground/25' alt="Cake image (note: your browser doesn't support video" />
        </video>
        <div className='flex justify-center items-center w-[calc(100%-2.5px)] h-12 dark:w-full rounded-b-2xl ring-1 ring-foreground/25 bg-card dark:bg-[rgb(0,0,0)]'>
          <span className='font-semibold text-base'>Happy birthday! 🎂✨</span>
        </div>
      </div>
    </div>
  );
}

function Foot() {
  return (
    <div className='flex justify-center items-center w-full min-h-fit px-4 ring-1 ring-foreground/25 dark:bg-[rgb(0,0,0)]'>
      <div className='flex justify-center items-center h-10 gap-2'>
        <span className='text-sm'>Made by Jaden, with Blender</span>
        {/*Use self-center to override shadcn self-stretch*/}
        <Separator orientation='vertical' className='h-6 !w-[1.5px] !self-center' />
        <a href='/#' className='text-sm hover:underline underline-offset-3'>Github</a>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className='min-h-screen min-w-screen flex flex-col overflow-hidden'>
      <Overlays />
      <Header />
      <Main />
      <Foot />
    </div>
  );
}

