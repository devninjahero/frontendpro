import { useEffect, useRef, useState } from 'react';
import './Message.css';
import {
  TbCircleCheckFilled,
  TbInfoCircleFilled,
  TbAlertCircleFilled,
  TbCircleXFilled,
} from 'react-icons/tb';
import { VscClose } from 'react-icons/vsc';

export default function Message({ type, onClose }) {
  const totalTime = 4000;

  const timerRef = useRef(null);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);
  const remainingTimeRef = useRef(totalTime);
  const progressRef = useRef(null);

  const [timeLeft, setTimeLeft] = useState(totalTime);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    startCountdown(totalTime);
    startProgressBar(totalTime, 100);

    return () => {
      clearTimeout(timerRef.current);
      clearInterval(intervalRef.current);
    };
  }, []);

  function startCountdown(duration) {
    startTimeRef.current = Date.now();

    timerRef.current = setTimeout(() => {
      onClose();
    }, duration);

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const msLeft = Math.max(duration - elapsed, 0);
      setTimeLeft(msLeft);
    }, 100);
  }

  function startProgressBar(duration, fromPercent) {
    const progressEl = progressRef.current;
    if (!progressEl) return;

    // Set current width
    progressEl.style.transition = 'none';
    progressEl.style.width = `${fromPercent}%`;

    // Force reflow
    void progressEl.offsetWidth;

    // Animate to 0%
    progressEl.style.transition = `width ${duration}ms linear`;
    progressEl.style.width = `0%`;
  }

  function pauseTimer() {
    if (paused) return;
    setPaused(true);

    clearTimeout(timerRef.current);
    clearInterval(intervalRef.current);

    const elapsed = Date.now() - startTimeRef.current;
    remainingTimeRef.current -= elapsed;

    const percent = (remainingTimeRef.current / totalTime) * 100;

    if (progressRef.current) {
      progressRef.current.style.transition = 'none';
      progressRef.current.style.width = `${percent}%`;
    }
  }

  function resumeTimer() {
    if (!paused) return;
    setPaused(false);

    const remaining = remainingTimeRef.current;
    const percent = (remaining / totalTime) * 100;

    startCountdown(remaining);
    startProgressBar(remaining, percent);
  }

  return (
    <div
      className={`message-container b-${type.toLowerCase()}`}
      onMouseEnter={pauseTimer}
      onMouseLeave={resumeTimer}
    >
      <div className="svg-container">
        {type === 'Success' && <TbCircleCheckFilled className="icon-success" />}
        {type === 'Info' && <TbInfoCircleFilled className="icon-info" />}
        {type === 'Warning' && <TbAlertCircleFilled className="icon-warning" />}
        {type === 'Error' && <TbCircleXFilled className="icon-error" />}
      </div>
      <span className={`message msg-${type.toLowerCase()}`}>{type} toast notification</span>
      {/* <span className="timer">{Math.ceil(timeLeft / 1000)}s</span> */}
      <VscClose className="close-icon" onClick={onClose} />
      <div ref={progressRef} className={`message-timer-bar ${type.toLowerCase()}`}></div>
    </div>
  );
}
