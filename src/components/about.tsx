export const About = () => {
    return (
        <section id="about" className="py-20 px-6 max-w-4xl mx-auto border-t border-terminal-gray/30">
            <h3 className="text-lg font-bold text-gray-300 mb-6 flex items-center gap-2">
                <span className="text-terminal-red">01.</span> Who Am I
            </h3>

            <div className="grid md:grid-cols-[2fr,1fr] gap-12">
                <div className="space-y-6 text-gray-400 leading-relaxed">
                    <p>
                        I am a security practitioner focused on <span className="text-white">offensive operations</span> and <span className="text-white">tool development</span>.
                        I don&apos;t believe in security through obscurity or reliance on automated scanners without understanding the underlying logic.

                    </p>
                    <p>
                        My philosophy is rooted in <span className="text-white">hands-on capability</span>. Degrees and certifications are useful waypoints,
                        but they are not proxies for competence. I build custom tools in Rust to understand low-level interactions and optimize for speed and stealth.
                    </p>
                </div>

                <div className="bg-terminal-gray/20 p-6 border border-terminal-gray/50 h-fit text-sm">
                    <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-4 border-b border-terminal-gray/50 pb-2">Current Focus</h4>
                    <ul className="space-y-3 text-gray-300 font-mono">
                        <li className="flex items-start gap-2">
                            <span className="text-terminal-green">➜</span> OSCP Preparation
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-terminal-green">➜</span> Rust Malware Dev
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-terminal-green">➜</span> AD Exploitation
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
};
