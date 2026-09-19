import React, { useState, useRef, useEffect } from 'react';
import { Send, AlertCircle, CornerDownLeft, Terminal } from 'lucide-react';

export default function AnswerInput({ onSubmit, disabled, statusFeedback, failureReason }) {
  const [value, setValue] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [disabled]);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!value.trim() || disabled) return;
    onSubmit(value);
    setValue('');
  };

  const inputFeedbackClass =
    statusFeedback === 'correct'
      ? 'input-feedback-correct'
      : statusFeedback === 'incorrect'
      ? 'input-feedback-incorrect shake-medium'
      : '';

  return (
    <div className="answer-wrapper">
      <form className={`answer-form glass-panel ${inputFeedbackClass}`} onSubmit={handleSubmit}>
        <div className="input-terminal-icon">
          <Terminal size={18} />
        </div>
        
        <input
          ref={inputRef}
          type="text"
          className="answer-input"
          placeholder={disabled ? "DECRYPTING PROTOCOL..." : "ENTER ANSWER / CODE..."}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={disabled}
          autoComplete="off"
          autoCapitalize="characters"
          spellCheck="false"
        />

        <button
          type="submit"
          className="answer-submit-btn"
          disabled={disabled || !value.trim()}
          title="Submit Answer (Enter)"
        >
          <span>TRANSMIT</span>
          <CornerDownLeft size={16} />
        </button>
      </form>

      {/* Validation Reason Alert Banner */}
      {statusFeedback === 'incorrect' && failureReason && (
        <div className="answer-failure-pill">
          <AlertCircle size={15} />
          <span>{failureReason}</span>
        </div>
      )}
    </div>
  );
}
