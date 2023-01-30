import './SwitchButton.css';
import React, { FC } from 'react';

interface SwitchButtonProps {
    icon: React.ReactNode
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    state: number;
}

export const SwitchButton : FC<SwitchButtonProps>= ({icon, onClick}) => {
  return (
    <button onClick={onClick} className='switch_btn' >
      {icon}
    </button>
  );
};
