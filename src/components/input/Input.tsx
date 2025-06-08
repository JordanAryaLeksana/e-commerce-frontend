import React, { forwardRef } from 'react'
import { get, RegisterOptions, useFormContext, FieldValues } from 'react-hook-form';
import clsxm from '@/lib/clsxm';
import { HiExclamation } from 'react-icons/hi';
import Typography from '../Typography/Typography';
import { useState } from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { motion } from 'framer-motion';
type InputTextProps = {
    id: string;
    type: string;
    required?: boolean;
    name: string;
    label: string;
    showPassword?: boolean;
    placeholder: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    children?: React.ReactNode;
    className?: string;
    disabled?: boolean;
    readonly?: boolean;
    style?: React.CSSProperties;
    as?: React.ElementType;
    helper?: React.ReactNode;
    autoComplete?: string;
    validation?: RegisterOptions<FieldValues, string>;
}
// 👇 pakai forwardRef
const Input = forwardRef<HTMLInputElement, InputTextProps>(function Input(
    {
        id,
        type,
        required = false,
        autoComplete = "off",
        name,
        label,
        showPassword = false,
        placeholder,
        leftIcon,
        rightIcon,
        className,
        disabled = false,
        readonly = false,
        style = {},
        as = "div",
        helper,
        validation,
        ...rest
    },
    ref
) {
    const {
        register,
        formState: { errors },
    } = useFormContext();
    
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const error = get(errors, name);
    const Component = as;
    return (
        <Component>
            <div className={`grid grid-cols-1 gap-2 ${className}`} style={style}>
                <label htmlFor={id} className='block text-sm font-semibold text-white'>
                    <h1 className='text-xl font-extralight text-white shadow-sm'>
                        {label}{' '}g
                        {required && <span className='font-bold text-red-500'>*</span>}
                    </h1>
                </label>
                <div className='w-full flex items-center bg-gray-900 transition-opacity duration-700 justify-between border rounded-md shadow-sm focus-within:border-blue-900 focus-within:ring-1 focus-within:ring-blue-900'>
                    {leftIcon && <span className='px-2'>{leftIcon}</span>}
                    <input
                        {...register(name, validation)}
                        name={name}
                        id={id ?? name}
                        type={type === 'password' && showPassword && isPasswordVisible ? 'text' : type}
                        required={required}
                        
                        readOnly={readonly}
                        placeholder={placeholder}
                        disabled={disabled}
                        autoComplete={autoComplete}
                        ref={ref}
                        className={clsxm(
                            'w-full rounded-md bg-gray-900   p-2 text-white font-light placeholder-gray-500 focus:outline-none',
                            error && 'border border-red-500 ring-1 ring-red-500',
                            className
                        )}

                        {...rest}
                    />
                    {rightIcon && <span className='px-2'>{rightIcon}</span>}
                    {showPassword && (
                        <span className=" pr-2   z-10">
                            <motion.button
                                type="button"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                                className="text-gray-400 hover:text-cyan-400 transition-colors duration-200"
                            >
                                {isPasswordVisible ? <HiEyeOff className="text-lg" /> : <HiEye className="text-lg" />}
                            </motion.button>
                        </span>
                    )
                    }
                </div>
                <div className='mt-1'>
                    {error && (
                        <span className='flex items gap-2 text-sm text-red-500'>
                            <HiExclamation className='text-xl text-red-500' />
                            {error?.message as unknown as string}
                        </span>
                    )}
                    {helper && <p className='text-xs text-gray-500'>{helper}</p>}
                </div>
            </div>
        </Component>
    );
});

export default Input;
