import React from 'react';

interface TerminalUIProps {
    title?: string;
    children: React.ReactNode;
    className?: string;
}

export const TerminalUI: React.FC<TerminalUIProps> = ({ title = "term", children, className = "" }) => {
    return (
        <div className={`border border-terminal-gray bg-black/50 backdrop-blur-sm rounded-sm overflow-hidden ${className}`}>
            <div className="flex items-center justify-between px-3 py-1 bg-terminal-gray border-b border-terminal-gray/50">
                <span className="text-xs text-gray-400 font-mono flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500/50"></span>
                    {title}
                </span>
                <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-terminal-dim/20"></div>
                    <div className="w-2 h-2 rounded-full bg-terminal-dim/20"></div>
                </div>
            </div>
            <div className="p-4 font-mono text-sm md:text-base">
                {children}
            </div>
        </div>
    );
};
