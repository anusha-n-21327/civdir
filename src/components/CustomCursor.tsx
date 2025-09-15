import { useMousePosition } from '@/hooks/useMousePosition';
import { cn } from '@/lib/utils';
import React, { useState, useEffect } from 'react';

const CustomCursor = () => {
  const { x, y } = useMousePosition();
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, .cursor-pointer')) {
        setIsPointer(true);
      } else {
        setIsPointer(false);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="hidden md:block"> {/* Hide on mobile where there's no cursor */}
      <div
        className={cn(
          "pointer-events-none fixed z-[9999] h-8 w-8 rounded-full border-2 border-primary transition-transform duration-300 ease-out",
          isPointer ? "scale-150 opacity-50" : ""
        )}
        style={{
          left: x,
          top: y,
          transform: `translate(-50%, -50%)`,
        }}
      />
      <div
        className="pointer-events-none fixed z-[9999] h-2 w-2 rounded-full bg-primary"
        style={{
          left: x,
          top: y,
          transform: `translate(-50%, -50%)`,
        }}
      />
    </div>
  );
};

export default CustomCursor;