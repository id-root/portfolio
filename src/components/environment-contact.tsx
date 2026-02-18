export const EnvironmentContact = () => {
    return (
        <section className="py-20 px-6 max-w-4xl mx-auto border-t border-terminal-gray/30 mb-20">
            <div className="grid md:grid-cols-2 gap-12">

                {/* Environment */}
                <div>
                    <h3 className="text-lg font-bold text-gray-300 mb-6 flex items-center gap-2">
                        <span className="text-terminal-red">04.</span> Environment
                    </h3>
                    <div className="bg-terminal-black border border-terminal-gray/30 p-4 font-mono text-sm text-gray-400">
                        <div className="flex justify-between border-b border-terminal-gray/20 pb-2 mb-2">
                            <span>OS</span>
                            <span className="text-white">Arch Linux</span>
                        </div>
                        <div className="flex justify-between border-b border-terminal-gray/20 pb-2 mb-2">
                            <span>Shell</span>
                            <span className="text-white">zsh / tmux</span>
                        </div>
                        <div className="flex justify-between border-b border-terminal-gray/20 pb-2 mb-2">
                            <span>Editor</span>
                            <span className="text-white">Neovim</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Font</span>
                            <span className="text-white">JetBrains Mono</span>
                        </div>
                    </div>
                </div>

                {/* Contact */}
                <div id="contact">
                    <h3 className="text-lg font-bold text-gray-300 mb-6 flex items-center gap-2">
                        <span className="text-terminal-red">05.</span> Initialize Handshake
                    </h3>
                    <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                        I am currently open to red team engagements and security research opportunities.
                        If you have a secure channel request or a project in mind, ping me.
                    </p>
                    <div className="flex flex-col gap-3">
                        <a href="mailto:vector@example.com" className="w-fit border border-terminal-red text-terminal-red px-6 py-3 font-mono text-sm hover:bg-terminal-red hover:text-black transition-all">
                            Initiate Email Protocol
                        </a>
                    </div>
                </div>

            </div>
        </section>
    );
};
