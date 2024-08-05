import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface ResultScreenProps {
    onRestart: () => void;
}

export function ResultScreen({ onRestart }: ResultScreenProps) {
    const {text, startTime, endTime, errors } = useSelector((state: RootState) => state.typing);

    const duration = endTime && startTime ? (endTime - startTime) / 1000 : 30;
    const words = text.split(' ').length;
    const wpm = Math.floor((words / (duration / 60)));

    return (
        <div className="result-screen">
            <h2>RESULTS</h2>
            <p>Words per minute: {wpm}</p>
            <p>Errors: {errors}</p>
            <button onClick={onRestart}>Restart</button>
        </div>
    );
}
