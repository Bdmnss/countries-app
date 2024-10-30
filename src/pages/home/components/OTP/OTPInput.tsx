import React, { useState, useRef } from 'react';
import styles from './OTPInput.module.css';

interface OTPInputProps {
  numInputs: number;
  onChange: (otp: string) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({ numInputs, onChange }) => {
  const [otp, setOtp] = useState<string[]>(Array(numInputs).fill(''));
  const inputsRef = useRef<HTMLInputElement[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;
    if (/^[0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      onChange(newOtp.join(''));
      if (index < numInputs - 1) {
        inputsRef.current[index + 1].focus();
      } else {
        inputsRef.current[index].blur();
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === 'Backspace') {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
      onChange(newOtp.join(''));
      if (index > 0) {
        inputsRef.current[index - 1].focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').slice(0, numInputs);
    const newOtp = pasteData
      .split('')
      .map((char, index) => (/^[0-9]$/.test(char) ? char : otp[index]));
    setOtp(newOtp);
    onChange(newOtp.join(''));
    inputsRef.current[Math.min(pasteData.length - 1, numInputs - 1)].focus();
  };

  return (
    <div className={styles['otp-container']}>
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          ref={(el) => (inputsRef.current[index] = el!)}
          className={styles['otp-input']}
        />
      ))}
    </div>
  );
};

export default OTPInput;
