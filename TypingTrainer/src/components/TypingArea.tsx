import { ChangeEvent, useRef, useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setInput, setStartTime, reset, selectNextSentence } from '../store/typingSlice';
import { ArrowPathIcon, ForwardIcon } from '@heroicons/react/24/solid';

interface TypingAreaProps {
    onRestart: () => void;
}

export function TypingArea({ onRestart }: TypingAreaProps) {
    const dispatch = useDispatch();
    const { text, input, startTime } = useSelector((state: RootState) => state.typing);
    const inputRef = useRef<HTMLInputElement>(null);
    const [timer, setTimer] = useState<number>(30);


    useEffect(() => {
        if (!startTime || timer <= 0) return;

        const interval = setInterval(() => {
            setTimer(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    dispatch(reset());
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [startTime, timer, dispatch]);

    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        if (newValue.length <= text.length && (startTime || newValue.length === 1)) {
            dispatch(setInput(newValue));
            if (!startTime) {
                dispatch(setStartTime(Date.now()));
            }
        }
    }, [dispatch, startTime, text]);

    const getColor = (char: string, index: number): string => {
        if (index >= input.length) return 'gray';
        return char === input[index] ? 'green' : 'red';
    };

    const renderedText = text.split('').map((char, index) => (
        <span key={index} style={{ color: getColor(char, index) }}>
            {char}
        </span>
    ));

    const focusInput = useCallback(() => {
        inputRef.current?.focus();
    }, []);

    return (
        <section className="typing-area" onClick={focusInput}>
            <div className="controls">
                <button onClick={onRestart} className="restart-button" aria-label="Restart">
                    <ArrowPathIcon className="icon" />
                </button>
                <button onClick={() => dispatch(selectNextSentence())} className="forward-button" aria-label="Next Sentence">
                    <ForwardIcon className="icon" />
                </button>
            </div>
            <div className="text-container">
                {renderedText}
            </div>
            <input
                type="text"
                value={input}
                onChange={handleChange}
                autoFocus
                ref={inputRef}
                className="hidden-input"
                style={{ opacity: 0, position: 'absolute', pointerEvents: 'none' }}
                aria-label="Typing Input"
            />
        </section>
    );
}
