import * as React from 'react';
import { ChevronDown } from './Icon';

export function Dropdown({ label, size = 'sm' }: { label: string; size?: 'sm' | 'lg' }) {
  return (
    <button className={size === 'lg' ? 'dropdown dropdown--lg' : 'dropdown'} type="button">
      <span>{label}</span>
      <ChevronDown size={16} />
    </button>
  );
}
