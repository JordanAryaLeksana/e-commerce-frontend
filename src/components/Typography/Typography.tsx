import clsxm from "@/lib/clsxm";


interface TypographyProps {
    className?: String;
    size: keyof typeof TypographySizes;
    type?: keyof typeof TypographyVariant;
    children: React.ReactNode;
    as?: keyof JSX.IntrinsicElements
}

enum TypographyVariant {
    'Header',
    'Paragraph'
}

enum TypographySizes {
    '7xl', '6xl', '5xl', '4xl', '3xl', '2xl', 'xl', 'lg', 'base', 'sm', 'xs'
}


export default function Typography({
    as = 'p',
    children,
    size = 'base',
    type,
    className
}: TypographyProps) {
    const Component = as
    return (
        <Component className={clsxm(
            [
                type === "Header" && "font-inter",
                type === "Paragraph" && "font-poppins"
            ],
            [
                size === "7xl" && "text-[64px] leading-[62px]",
                size === "6xl" && "text-[48px] leading-[58px]",
                size === "5xl" && "text-[42px] leading-[52px]",
                size === "4xl" && "text-[36px] leading-[44px]",
                size === "3xl" && "text-[32px] leading-[38px]",
                size === "2xl" && "text-[24px] leading-[30px]",
                size === "xl" && "text-[20px] leading-[24px]",
                size === "lg" && "text-[18px] leading-[22px]",
                size === "base" && "text-[16px] leading-[18px]",
                size === "sm" && "text-[14px] leading-[16px]",
                size === "xs" && "text-[12px] leading-[14px]",
            ],
            className
        )}>
            {children}
        </Component>
    )
}