import { useEffect, useRef, useState, type FormEvent } from 'react';
import { commands, suggestedCommands } from './terminalCommands';

interface TerminalProps {
  onToggleTheme: () => void;
}

interface Line {
  id: number;
  text: string;
}

export function Terminal({ onToggleTheme }: TerminalProps) {
  const [lines, setLines] = useState<Line[]>([{ id: 0, text: 'Type help to see commands.' }]);
  const [input, setInput] = useState('');
  const nextId = useRef(1);
  const logRef = useRef<HTMLDivElement>(null);

  // Keep the newest output in view.
  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [lines]);

  const append = (...texts: string[]) =>
    setLines((current) => [...current, ...texts.map((text) => ({ id: nextId.current++, text }))]);

  const run = (raw: string) => {
    const command = raw.trim().toLowerCase();
    if (!command) return;

    if (command === 'clear') {
      setLines([]);
    } else if (command === 'theme') {
      append(`$ ${command}`, 'Theme toggled.');
      onToggleTheme();
    } else {
      append(`$ ${command}`, commands[command]?.() ?? `command not found: ${command}`);
    }
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    run(input);
    setInput('');
  };

  return (
    <div>
      <div
        ref={logRef}
        className="terminal mindset__terminal"
        role="log"
        aria-label="Interactive terminal output"
        tabIndex={0}
      >
        {lines.map((line) => (
          <div key={line.id} className="mindset__line">
            {line.text}
          </div>
        ))}
      </div>

      <form className="mindset__prompt" onSubmit={onSubmit}>
        <label className="mono" htmlFor="terminal-input">
          Run a command
        </label>
        <input
          id="terminal-input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          autoComplete="off"
          spellCheck={false}
          placeholder="help"
        />
      </form>

      {/* Tap targets for touch devices, where typing a command is awkward. */}
      <div className="chips mindset__suggestions">
        {suggestedCommands.map((command) => (
          <button key={command} type="button" className="chip" onClick={() => run(command)}>
            {command}
          </button>
        ))}
      </div>
    </div>
  );
}
