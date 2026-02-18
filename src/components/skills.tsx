export const Skills = () => {
    const skillset = [
        {
            category: "Languages",
            items: ["Rust", "Python", "C", "Bash", "SQL"]
        },
        {
            category: "Offensive",
            items: ["Active Directory", "Reverse Engineering", "Web Exploitation", "Network Recon", "Privilege Escalation"]
        },
        {
            category: "Infrastructure",
            items: ["Linux (Arch)", "Docker", "Git", "AWS", "Terraform"]
        }
    ];

    return (
        <section id="skills" className="py-20 px-6 max-w-4xl mx-auto border-t border-terminal-gray/30">
            <h3 className="text-lg font-bold text-gray-300 mb-8 flex items-center gap-2">
                <span className="text-terminal-red">02.</span> Technical Capabilities
            </h3>

            <div className="grid md:grid-cols-3 gap-8">
                {skillset.map((group) => (
                    <div key={group.category}>
                        <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                            <span className="w-1 h-3 bg-terminal-red"></span>
                            {group.category}
                        </h4>
                        <ul className="space-y-2 font-mono text-sm text-gray-400">
                            {group.items.map((item) => (
                                <li key={item} className="flex items-center gap-2 hover:text-terminal-green transition-colors cursor-crosshair">
                                    <span>::</span> {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
};
