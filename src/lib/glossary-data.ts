export interface GlossaryEntry {
    term: string;
    fullForm: string | null;
    definition: string;
    category: string;
}

export const glossary: GlossaryEntry[] = [
    // ── Web Security ──────────────────────────────────────────
    {
        term: 'SSRF',
        fullForm: 'Server-Side Request Forgery',
        definition: 'A vulnerability where an attacker tricks a server into making HTTP requests to unintended internal or external destinations, bypassing access controls.',
        category: 'Web Security',
    },
    {
        term: 'XSS',
        fullForm: 'Cross-Site Scripting',
        definition: 'An injection attack where malicious scripts are injected into trusted websites, executing in the context of the victim\'s browser.',
        category: 'Web Security',
    },

    // ── Networking ────────────────────────────────────────────
    {
        term: 'DNS',
        fullForm: 'Domain Name System',
        definition: 'The hierarchical naming system that translates human-readable domain names into IP addresses that computers use to identify each other on the network.',
        category: 'Networking',
    },
    {
        term: 'SMTP',
        fullForm: 'Simple Mail Transfer Protocol',
        definition: 'The standard protocol for sending email across networks. Operates on port 25 by default.',
        category: 'Networking',
    },
    {
        term: 'MX',
        fullForm: 'Mail Exchanger',
        definition: 'A DNS record type that specifies the mail server responsible for accepting email messages on behalf of a domain.',
        category: 'Networking',
    },
    {
        term: 'SSH',
        fullForm: 'Secure Shell',
        definition: 'A cryptographic network protocol for secure remote login, command execution, and data transfer over an unsecured network.',
        category: 'Networking',
    },
    {
        term: 'SOCKS',
        fullForm: 'Socket Secure',
        definition: 'A network protocol that routes network packets between a client and server through a proxy, commonly used for tunneling traffic.',
        category: 'Networking',
    },
    {
        term: 'TCP',
        fullForm: 'Transmission Control Protocol',
        definition: 'A connection-oriented transport protocol that provides reliable, ordered delivery of data between applications.',
        category: 'Networking',
    },

    // ── Active Directory ──────────────────────────────────────
    {
        term: 'LDAP',
        fullForm: 'Lightweight Directory Access Protocol',
        definition: 'An open protocol used to access and manage directory information services, commonly used in Active Directory environments for authentication.',
        category: 'Active Directory',
    },
    {
        term: 'Kerberoasting',
        fullForm: null,
        definition: 'An Active Directory attack that extracts service account ticket hashes (TGS) which can be cracked offline to recover plaintext passwords.',
        category: 'Active Directory',
    },

    // ── Authentication ────────────────────────────────────────
    {
        term: 'OTP',
        fullForm: 'One-Time Password',
        definition: 'A password that is valid for only one login session or transaction, commonly used as a second factor in multi-factor authentication.',
        category: 'Authentication',
    },
    {
        term: '2FA',
        fullForm: 'Two-Factor Authentication',
        definition: 'A security process requiring two different authentication factors to verify identity, typically something you know and something you have.',
        category: 'Authentication',
    },

    // ── Cryptography ──────────────────────────────────────────
    {
        term: 'AES',
        fullForm: 'Advanced Encryption Standard',
        definition: 'A symmetric-key block cipher adopted as an encryption standard. Uses 128, 192, or 256-bit keys for encrypting data.',
        category: 'Cryptography',
    },
    {
        term: 'SHA1',
        fullForm: 'Secure Hash Algorithm 1',
        definition: 'A cryptographic hash function that produces a 160-bit (40 hex character) digest. Considered broken for security purposes but still encountered in legacy systems.',
        category: 'Cryptography',
    },

    // ── General Security ──────────────────────────────────────
    {
        term: 'CTF',
        fullForm: 'Capture The Flag',
        definition: 'A cybersecurity competition where participants solve security challenges to find hidden "flags" — secret strings that prove exploitation success.',
        category: 'General',
    },
    {
        term: 'RCE',
        fullForm: 'Remote Code Execution',
        definition: 'A critical vulnerability that allows an attacker to execute arbitrary code on a remote machine, often leading to full system compromise.',
        category: 'Exploitation',
    },

    // ── Binary Exploitation ───────────────────────────────────
    {
        term: 'UAF',
        fullForm: 'Use-After-Free',
        definition: 'A memory corruption vulnerability where a program continues to use a pointer after the memory it references has been freed, allowing heap manipulation.',
        category: 'Binary Exploitation',
    },
    {
        term: 'FSOP',
        fullForm: 'File Stream Oriented Programming',
        definition: 'An advanced exploitation technique that corrupts FILE structures in libc to hijack control flow through the vtable mechanism.',
        category: 'Binary Exploitation',
    },
    {
        term: 'Tcache',
        fullForm: 'Thread Cache',
        definition: 'A per-thread caching mechanism in glibc\'s malloc implementation that speeds up small allocations. Often targeted in heap exploitation for poisoning attacks.',
        category: 'Binary Exploitation',
    },
    {
        term: 'NX',
        fullForm: 'No-Execute',
        definition: 'A memory protection feature that marks certain memory regions as non-executable, preventing code injection attacks from running shellcode on the stack.',
        category: 'Memory Protection',
    },
    {
        term: 'PIE',
        fullForm: 'Position-Independent Executable',
        definition: 'A binary compiled to be loaded at a random memory address each time, making exploitation harder by requiring address leaks.',
        category: 'Memory Protection',
    },
    {
        term: 'ASLR',
        fullForm: 'Address Space Layout Randomization',
        definition: 'An OS security feature that randomizes the memory layout of a process, making it difficult for attackers to predict target addresses.',
        category: 'Memory Protection',
    },

    // ── Linux / System ────────────────────────────────────────
    {
        term: 'SUID',
        fullForm: 'Set User ID',
        definition: 'A Unix permission bit that allows a program to run with the privileges of the file owner (often root), commonly exploited for privilege escalation.',
        category: 'Linux',
    },
    {
        term: 'ptrace',
        fullForm: 'Process Trace',
        definition: 'A Linux system call that allows one process to observe and control another, used by debuggers like GDB and tracers like strace.',
        category: 'Linux',
    },

    // ── Reverse Engineering ───────────────────────────────────
    {
        term: 'GDB',
        fullForm: 'GNU Debugger',
        definition: 'The standard debugger for Linux systems, allowing inspection of program state, setting breakpoints, and stepping through assembly instructions.',
        category: 'Reverse Engineering',
    },
    {
        term: 'DBI',
        fullForm: 'Dynamic Binary Instrumentation',
        definition: 'A technique that injects analysis code into a running binary at runtime, used by tools like Intel Pin, DynamoRIO, and Frida.',
        category: 'Reverse Engineering',
    },
    {
        term: 'ELF',
        fullForm: 'Executable and Linkable Format',
        definition: 'The standard binary file format for executables, object code, and shared libraries on Linux and Unix systems.',
        category: 'Reverse Engineering',
    },

    // ── CPU / x86 Architecture ────────────────────────────────
    {
        term: 'RDTSC',
        fullForm: 'Read Time-Stamp Counter',
        definition: 'An x86 instruction that reads the processor\'s time-stamp counter (TSC), commonly used in anti-debugging to measure execution timing.',
        category: 'x86 Architecture',
    },
    {
        term: 'TSC',
        fullForm: 'Time Stamp Counter',
        definition: 'A 64-bit register in x86 CPUs that counts processor cycles. Used for high-precision timing measurements and anti-debug detection.',
        category: 'x86 Architecture',
    },
    {
        term: 'LFENCE',
        fullForm: 'Load Fence',
        definition: 'An x86 serialization instruction that ensures all previous instructions complete before RDTSC reads, preventing out-of-order measurement corruption.',
        category: 'x86 Architecture',
    },
    {
        term: 'CPUID',
        fullForm: 'CPU Identification',
        definition: 'An x86 instruction that returns processor information including vendor, features, and virtualization status. Used to detect hypervisors.',
        category: 'x86 Architecture',
    },
    {
        term: 'MSR',
        fullForm: 'Model-Specific Register',
        definition: 'Special CPU registers that control hardware features like performance monitoring, power management, and debugging facilities.',
        category: 'x86 Architecture',
    },
    {
        term: 'SMT',
        fullForm: 'Simultaneous Multi-Threading',
        definition: 'A CPU technique (e.g., Intel Hyper-Threading) that allows multiple threads to share a single core, introducing timing noise for anti-debug measurements.',
        category: 'CPU',
    },

    // ── Hardware Tracing ──────────────────────────────────────
    {
        term: 'Intel PT',
        fullForm: 'Intel Processor Trace',
        definition: 'A hardware tracing feature that captures complete instruction-level execution traces with near-zero overhead, effectively invisible to user-space anti-debugging.',
        category: 'Hardware Tracing',
    },
    {
        term: 'PEBS',
        fullForm: 'Precise Event-Based Sampling',
        definition: 'A hardware performance monitoring feature that captures precise architectural state at the point of a performance event.',
        category: 'Hardware Tracing',
    },
    {
        term: 'LBR',
        fullForm: 'Last Branch Record',
        definition: 'CPU registers that record the source and destination of recent branch instructions, used for tracing and profiling.',
        category: 'Hardware Tracing',
    },

    // ── Kernel / Virtualization ───────────────────────────────
    {
        term: 'eBPF',
        fullForm: 'Extended Berkeley Packet Filter',
        definition: 'A kernel technology that allows running sandboxed programs inside the Linux kernel for tracing, monitoring, and networking without modifying kernel source.',
        category: 'Kernel',
    },
    {
        term: 'VMX',
        fullForm: 'Virtual Machine Extensions',
        definition: 'Intel\'s hardware virtualization technology that enables hypervisors to run virtual machines with near-native performance.',
        category: 'Virtualization',
    },
    {
        term: 'SMM',
        fullForm: 'System Management Mode',
        definition: 'A special CPU operating mode (Ring -2) used for firmware-level tasks. Invisible to the operating system and all software above it.',
        category: 'CPU',
    },

    // ── Windows ───────────────────────────────────────────────
    {
        term: 'PEB',
        fullForm: 'Process Environment Block',
        definition: 'A Windows data structure containing process-wide information, including the IsDebuggerPresent flag checked by classic anti-debugging techniques.',
        category: 'Windows',
    },
];

/**
 * Build a pre-compiled regex and lookup map for efficient matching.
 * Terms are sorted by length (longest first) so "Intel PT" matches before "Intel".
 */
function buildGlossaryIndex() {
    const sorted = [...glossary].sort((a, b) => b.term.length - a.term.length);
    const map = new Map<string, GlossaryEntry>();
    for (const entry of sorted) {
        map.set(entry.term.toLowerCase(), entry);
    }

    // Build regex: escape special chars, word-boundary match
    const escaped = sorted.map(e =>
        e.term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    );
    const pattern = new RegExp(`\\b(${escaped.join('|')})\\b`, 'gi');

    return { pattern, map };
}

export const glossaryIndex = buildGlossaryIndex();
