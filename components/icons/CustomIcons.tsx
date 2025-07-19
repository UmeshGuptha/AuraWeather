
import React from 'react';

export const Running: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="5" r="1"></circle>
        <path d="M16.7 19.3 14 16l-1.5 2L10 16l-3.5 4.5"></path>
        <path d="M12 12.5 9.5 10l-2 3.5"></path>
        <path d="m14.5 10.5 2-3"></path>
    </svg>
);

export const Tractor: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M3 4h14l4 4v4H3V4z"></path>
        <path d="M3 12h18v4H3v-4z"></path>
        <path d="M6 16v4"></path>
        <path d="M18 16v4"></path>
        <path d="M12 4V2"></path>
        <path d="M12 12v-2"></path>
        <path d="m7 12-2-2"></path>
        <path d="m17 12 2-2"></path>
        <path d="M9 16H3"></path>
        <path d="M15 16h6"></path>
    </svg>
);
