'use client';
import React, { PropsWithChildren } from 'react';
import '@/styles/card.css';


const Card: React.FC<PropsWithChildren> = ({ children}) => {
  return (
    <div className="card" data-lenis-prevent>
        {children}
    </div>
  );
};

export default Card;