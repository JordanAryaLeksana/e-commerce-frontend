import { get, RegisterOptions, useFormContext, FieldValues } from 'react-hook-form';
import clsxm from '@/lib/clsxm';
import { HiExclamation } from 'react-icons/hi';
import { ZodType } from 'zod';
import Typography from '../Typography/Typography';
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
    style?: React.CSSProperties
    as?: React.ElementType;
    helper?: React.ReactNode;
    validation?: RegisterOptions<FieldValues, string>;
}

export default function Input({
    id,
    type,
    required = false,
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
}: InputTextProps) {
    const {
        register,
        formState: { errors, touchedFields },

    } = useFormContext()


    const error = get(errors, name)
    const Component = as
    return (
        <Component>

            <div className={`grid grid-cols-1 gap-2 ${className} `} style={style}>
                <label
                    htmlFor={id}
                    className={clsxm(
                        'block text-sm font-semibold text-white',

                    )}
                >
                    <Typography type="Header" size='2xl' className='text-sm font-semibold text-white'>
                        {label}{' '}
                    </Typography>
                    {required && <span className='font-bold text-red-500'>*</span>}
                </label>
                <div className='w-full border rounded-md shadow-sm focus-within:border-gray-500 focus-within:ring-1 focus-within:ring-gray-500'>
                    {leftIcon && <span className='px-2'>{leftIcon}</span>}
                    <input
                        {...register(id, validation)}
                        {...rest}
                        type={type}
                        name={id}
                        id={id}
                        readOnly={readonly}
                        placeholder={placeholder}
                        disabled={disabled}
                        className={clsxm(
                            'block w-full  bg-gray-800 text-white rounded-md px-3 py-2 border-none outline-none focus:outline-none',
                            className,
                            error && 'border-red-500',
                        )}
                    />
                    {rightIcon && <span className='px-2'>{rightIcon}</span>}
                </div>
                <div className='mt-1 '>
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
    )
}