import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { NavBar } from './components/NavBar';
import { TypingArea } from './components/TypingArea';
import { ResultScreen } from './components/ResultScreen';
import { reset } from './store/typingSlice';
import './assets/styles/main.scss';



export function App() {
  const dispatch = useDispatch();
  const input = useSelector((state: RootState) => state.typing.input);
  const text = useSelector((state: RootState) => state.typing.text);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    if (timeLeft === 0) {
    
      return;
    }
    if (timeLeft !== null) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTime) => (prevTime !== null ? prevTime - 1 : null));
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [timeLeft]);

  useEffect(() => {
    if (input.length > 0 && timeLeft === null) {
    
      setTimeLeft(30);
    }
  }, [input]);

  useEffect(() => {
    if (input === text) {
      setTimeLeft(0);
    }
  }, [input, text]);

  const handleRestart = () => {
    dispatch(reset());
    setTimeLeft(null);
  };

  return (
    <div className="app">
      <NavBar />
      {timeLeft === 0 ? (
        <ResultScreen onRestart={handleRestart} />
      ) : (
        <TypingArea onRestart={handleRestart} />
      )}
      {timeLeft !== null && timeLeft > 0 && (
        <div className="timer">
          {timeLeft} 
        </div>
      )}
      <footer className='footer'>created by Daniel Kirushin</footer>
    </div>
  );
}
