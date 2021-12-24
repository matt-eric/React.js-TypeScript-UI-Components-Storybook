import React, { forwardRef, Fragment, HTMLAttributes, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faMinus } from '@fortawesome/free-solid-svg-icons';

export interface Props extends HTMLAttributes<HTMLInputElement> {
  checked?: boolean;
  disabled?: boolean;
  id: string;
  indeterminate?: boolean;
  label?: string;
  onChange: () => void;
}

export const Checkbox = forwardRef<HTMLInputElement, Props>(
  (
    {
      checked = false,
      disabled = false,
      id,
      indeterminate = false,
      label = '',
      onChange,
      title,
      ...props
    },
    ref
  ) => {
    const handleChange = (): void => {
      !disabled && onChange();
    };

    const handleKeyDown = (code: string): void => {
      if (!disabled && ['Space', 'Enter'].includes(code)) {
        handleChange();
      }
    };

    const hasValue: boolean = useMemo(
      () => checked || indeterminate,
      [checked, indeterminate]
    );

    return (
      <Fragment>
        <span
          className={`absolute flex justify-center items-center h-4 w-4 m-1 rounded border border-gray-500 focus:outline-none focus-visible transition duration-100 ease-in-out filter ${
            !disabled &&
            'border-green-500 cursor-pointer hover:brightness-110 hover:shadow-sm'
          } ${hasValue && 'bg-green-500'} `}
          onClick={handleChange}
          onKeyDown={(e) => handleKeyDown(e.code)}
          tabIndex={0}
        >
          {hasValue && (
            <FontAwesomeIcon
              className="absolute text-white"
              icon={indeterminate ? faMinus : faCheck}
              size="sm"
            />
          )}
        </span>
        <input
          aria-label={id}
          checked={checked}
          className="hidden"
          disabled={disabled}
          id={id}
          onChange={handleChange}
          ref={ref}
          tabIndex={-1}
          title={title}
          type="checkbox"
          {...props}
        />
        <div className="ml-6">
          <label className="select-none" htmlFor={id}>
            {label}
          </label>
        </div>
      </Fragment>
    );
  }
);
