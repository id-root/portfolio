'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import CodeBlock from './CodeBlock';
import ImageLightbox from './ImageLightbox';
import GlossaryTooltip from './GlossaryTooltip';
import { glossaryIndex } from '@/lib/glossary-data';
import { Components } from 'react-markdown';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface MarkdownRendererProps {
    content: string;
}

/* ─── Glossary text processor ─── */
/**
 * Scans a text string for glossary terms and wraps the first occurrence
 * of each term with a <GlossaryTooltip> component.
 * Returns an array of ReactNode (strings + tooltip components).
 */
function processTextWithGlossary(text: string): ReactNode[] {
    const { pattern, map } = glossaryIndex;

    // Reset regex state
    pattern.lastIndex = 0;

    const result: ReactNode[] = [];
    const matchedTerms = new Set<string>(); // only first occurrence per term
    let lastIndex = 0;

    // Find all matches
    const matches: { index: number; length: number; term: string }[] = [];
    let match: RegExpExecArray | null;

    while ((match = pattern.exec(text)) !== null) {
        const termLower = match[1].toLowerCase();
        if (!matchedTerms.has(termLower)) {
            matchedTerms.add(termLower);
            matches.push({
                index: match.index,
                length: match[0].length,
                term: termLower,
            });
        }
    }

    if (matches.length === 0) return [text];

    for (const m of matches) {
        // Add text before this match
        if (m.index > lastIndex) {
            result.push(text.slice(lastIndex, m.index));
        }

        const entry = map.get(m.term);
        const originalText = text.slice(m.index, m.index + m.length);

        if (entry) {
            result.push(
                <GlossaryTooltip key={`glossary-${m.index}`} entry={entry}>
                    {originalText}
                </GlossaryTooltip>
            );
        } else {
            result.push(originalText);
        }

        lastIndex = m.index + m.length;
    }

    // Add remaining text
    if (lastIndex < text.length) {
        result.push(text.slice(lastIndex));
    }

    return result;
}

/**
 * Recursively process React children to find text nodes and apply glossary.
 * Skips code elements to avoid wrapping terms inside code blocks.
 */
function processChildren(children: ReactNode): ReactNode {
    if (typeof children === 'string') {
        const processed = processTextWithGlossary(children);
        return processed.length === 1 ? processed[0] : <>{processed}</>;
    }

    if (Array.isArray(children)) {
        return children.map((child, i) => {
            if (typeof child === 'string') {
                const processed = processTextWithGlossary(child);
                return processed.length === 1
                    ? <span key={i}>{processed[0]}</span>
                    : <span key={i}>{processed}</span>;
            }
            // Don't recurse into code elements
            if (
                typeof child === 'object' &&
                child !== null &&
                'type' in child &&
                ((child as any).type === 'code' || (child as any).type === 'pre')
            ) {
                return child;
            }
            return child;
        });
    }

    return children;
}

/* ─── Animated heading wrapper ─── */
function AnimatedHeading({ level, children, id, ...props }: { level: number; children: React.ReactNode; id?: string; [key: string]: unknown }) {
    const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;

    return (
        <motion.div
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
        >
            <Tag id={id} {...props}>
                {children}
            </Tag>
            {level === 2 && (
                <motion.div
                    className="h-[2px] bg-gradient-to-r from-[var(--color-primary)] to-transparent mb-4 mt-1"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2, ease: 'circOut' }}
                    style={{ transformOrigin: 'left' }}
                />
            )}
        </motion.div>
    );
}

const markdownComponents: Components = {
    /* Unwrap images from <p> tags to prevent hydration mismatch */
    p({ children, ...props }) {
        // Check if any child is an image (which becomes a block-level ImageLightbox)
        const childArray = Array.isArray(children) ? children : [children];
        const hasImage = childArray.some(
            (child) => typeof child === 'object' && child !== null && 'props' in child && typeof (child as any).props === 'object' && (child as any).props?.node?.tagName === 'img'
        );
        if (hasImage) {
            return <>{children}</>;
        }
        return <p {...props}>{processChildren(children)}</p>;
    },
    code({ className, children, ...props }) {
        const match = /language-(\w+)/.exec(className || '');
        const isInline = !match && !className;

        if (isInline) {
            return (
                <code className="bg-[var(--color-primary)]/15 px-1.5 py-0.5 rounded text-[0.88em] font-[var(--font-mono)] text-[var(--color-emerald-800)] dark:text-[var(--color-primary)]" {...props}>
                    {children}
                </code>
            );
        }

        return (
            <CodeBlock className={className}>
                {children}
            </CodeBlock>
        );
    },
    pre({ children }) {
        return <>{children}</>;
    },
    img({ src, alt }) {
        if (!src || typeof src !== 'string') return null;
        return <ImageLightbox src={src} alt={alt || ''} />;
    },
    table({ children }) {
        return (
            <div className="overflow-x-auto my-6 custom-scrollbar">
                <table className="w-full border-collapse text-sm">
                    {children}
                </table>
            </div>
        );
    },
    td({ children, ...props }) {
        return <td {...props}>{processChildren(children)}</td>;
    },
    li({ children, ...props }) {
        return <li {...props}>{processChildren(children)}</li>;
    },
    blockquote({ children }) {
        return (
            <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, type: 'spring' }}
            >
                <blockquote className="intel-brief">
                    <div className="intel-brief-icon">
                        <span className="material-symbols-outlined text-sm">info</span>
                    </div>
                    <div className="intel-brief-content">
                        {children}
                    </div>
                </blockquote>
            </motion.div>
        );
    },
    h2({ children, id, ...props }) {
        return <AnimatedHeading level={2} id={id} {...props}>{children}</AnimatedHeading>;
    },
    h3({ children, id, ...props }) {
        return <AnimatedHeading level={3} id={id} {...props}>{children}</AnimatedHeading>;
    },
};

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {

    return (
        <div className="prose-article">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw, rehypeHighlight, rehypeSlug]}
                components={markdownComponents}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}
