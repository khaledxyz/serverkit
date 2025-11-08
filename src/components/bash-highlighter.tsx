/** biome-ignore-all lint/suspicious/noArrayIndexKey: <not needed> */
import type { JSX } from "react";

interface Match {
  type: string;
  start: number;
  end: number;
  text: string;
}

interface Props {
  code?: string;
}

export default function BashHighlighter({ code = "" }: Props): JSX.Element {
  const highlight = (code: string): JSX.Element[] => {
    const parts: JSX.Element[] = [];
    let lastIndex = 0;
    const matches: Match[] = [];

    const commentRegex = /#.*/g;
    let match = commentRegex.exec(code);
    while (match !== null) {
      matches.push({
        type: "comment",
        start: match.index,
        end: match.index + match[0].length,
        text: match[0],
      });
      match = commentRegex.exec(code);
    }

    const stringRegex = /(["'])(?:(?=(\\?))\2.)*?\1/g;
    match = stringRegex.exec(code);
    while (match !== null) {
      matches.push({
        type: "string",
        start: match.index,
        end: match.index + match[0].length,
        text: match[0],
      });
      match = stringRegex.exec(code);
    }

    const keywords =
      /\b(if|then|else|elif|fi|for|while|do|done|case|esac|function|return|in|export|source|alias)\b/g;
    match = keywords.exec(code);
    while (match !== null) {
      matches.push({
        type: "keyword",
        start: match.index,
        end: match.index + match[0].length,
        text: match[0],
      });
      match = keywords.exec(code);
    }

    const variables = /\$\{?[\w_]+\}?|\$\d+/g;
    match = variables.exec(code);
    while (match !== null) {
      matches.push({
        type: "variable",
        start: match.index,
        end: match.index + match[0].length,
        text: match[0],
      });
      match = variables.exec(code);
    }

    matches.sort((a, b) => a.start - b.start);

    const filtered: Match[] = [];
    for (const m of matches) {
      if (!filtered.some((f) => f.start <= m.start && f.end > m.start)) {
        filtered.push(m);
      }
    }

    filtered.forEach((m, i) => {
      if (m.start > lastIndex) {
        parts.push(<span key={`t${i}`}>{code.slice(lastIndex, m.start)}</span>);
      }
      parts.push(
        <span className={m.type} key={`m${i}`}>
          {m.text}
        </span>
      );
      lastIndex = m.end;
    });

    if (lastIndex < code.length) {
      parts.push(<span key="end">{code.slice(lastIndex)}</span>);
    }

    return parts;
  };

  return (
    <>
      <style>{`
        .bash-code { background: #1e1e1e; color: #d4d4d4; padding: 1rem; border-radius: 0.5rem; overflow-x: auto; font-family: monospace; font-size: 14px; line-height: 1.5; }
        .comment { color: #6a9955; }
        .string { color: #ce9178; }
        .keyword { color: #569cd6; }
        .variable { color: #9cdcfe; }
      `}</style>
      <pre className="bash-code">
        <code>{highlight(code)}</code>
      </pre>
    </>
  );
}
