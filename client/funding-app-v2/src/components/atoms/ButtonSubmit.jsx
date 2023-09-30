import React from 'react';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';

const ButtonSubmit = ({
                          text = 'Submit',
                          isLoading = false,
                          onClick,
                          className,
                          ...props
                      }) => {
    const buttonClasses = `flex justify-center text-xs sm:text-sm md:text-base
    bg-info-500 text-info-050 w-full py-2 sm:py-3 rounded-md shadow-md
    hover:bg-blue-600 active:bg-info-700 focus:outline-none focus:ring
    focus:ring-info-300 transition duration-200 ${isLoading ? 'bg-green-500' : ''}
    ${className}`;

    return (
        <Button onClick={onClick} className={buttonClasses} disabled={isLoading} {...props}>
            {isLoading ? (
                <ProgressSpinner
                    style={{ width: '20px', height: '20px', background: 'none' }}
                    strokeWidth="8"
                    fill="var(--surface-ground)"
                    animationDuration=".5s"
                />
            ) : (
                <div className="font-medium">{text}</div>
            )}
        </Button>
    );
};

export default ButtonSubmit;
