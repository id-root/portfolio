import React from 'react';

export const Sidebar = () => {
    return (
        <aside className="w-full lg:w-[350px] flex flex-col gap-6 shrink-0">
            {/* Research Log */}
            <div className="border border-vector-border bg-vector-panel p-4 md:p-5 relative group">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-vector-border border-dashed">
                    <h3 className="text-white font-bold flex items-center gap-2">
                        <span className="text-vector-green text-xs">▲</span> Research Log
                    </h3>
                    <div className="w-2 h-2 rounded-full bg-vector-green animate-pulse"></div>
                </div>

                <div className="space-y-6 text-xs font-mono">

                    {/* Item 1 */}
                    <div className="relative pl-4 border-l border-vector-border">
                        <div className="absolute -left-[3px] top-0 w-1.5 h-1.5 bg-vector-green/50"></div>
                        <div className="flex justify-between items-baseline mb-1">
                            <span className="text-vector-text-dim">0x1A :: Kernel</span>
                            <span className="text-[#a58d34] bg-[#a58d34]/10 px-1 text-[10px]">RESEARCH_ONLY</span>
                        </div>
                        <p className="text-gray-400 leading-relaxed">
                            Driver Fuzzing techniques in Windows 11 22H2 using modified syzkaller.
                        </p>
                    </div>

                    {/* Item 2 */}
                    <div className="relative pl-4 border-l border-vector-border">
                        <div className="absolute -left-[3px] top-0 w-1.5 h-1.5 bg-vector-green/50"></div>
                        <div className="flex justify-between items-baseline mb-1">
                            <span className="text-vector-text-dim">0x1B :: Evasion</span>
                            <span className="text-purple-400 bg-purple-400/10 px-1 text-[10px]">ALPHA</span>
                        </div>
                        <p className="text-gray-400 leading-relaxed">
                            Indirect syscall execution via Halo&apos;s Gate implementation in Rust.
                        </p>
                    </div>

                    {/* Item 3 */}
                    <div className="relative pl-4 border-l border-vector-border">
                        <div className="absolute -left-[3px] top-0 w-1.5 h-1.5 bg-vector-green/50"></div>
                        <div className="flex justify-between items-baseline mb-1">
                            <span className="text-vector-text-dim">0x1C :: Network</span>
                            <span className="text-blue-400 bg-blue-400/10 px-1 text-[10px]">POC</span>
                        </div>
                        <p className="text-gray-400 leading-relaxed">
                            eBPF Rootkit capabilities for hiding network packets on Linux 5.15+.
                        </p>
                    </div>

                    <button className="w-full py-2 mt-4 border border-vector-border border-dashed text-vector-text-dim hover:text-vector-green hover:border-vector-green transition-colors text-xs">
                        Load_More_Logs()
                    </button>
                </div>
            </div>

            {/* Public Key */}
            <div className="border border-vector-border bg-vector-panel p-4 md:p-5">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2 text-sm">
                    <span className="grid gap-0.5">
                        <span className="w-1 h-1 bg-vector-green"></span>
                        <span className="w-1 h-1 bg-transparent border border-gray-600"></span>
                    </span>
                    Public Key
                </h3>

                <div className="bg-black/40 p-3 border border-vector-border font-mono text-[10px] text-vector-green/70 overflow-hidden leading-tight select-all">
                    -----BEGIN PGP PUBLIC KEY BLOCK-----<br />
                    mQINBGI... (truncated)<br />
                    R3d9FzS... 9z8f7d6<br />
                    -----END PGP PUBLIC KEY BLOCK-----
                </div>

                <div className="flex gap-2 mt-3 justify-end">
                    <button className="text-vector-text-dim hover:text-white" title="Copy">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                    </button>
                    <button className="text-vector-text-dim hover:text-white" title="Download">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    </button>
                </div>
            </div>
        </aside>
    );
};
