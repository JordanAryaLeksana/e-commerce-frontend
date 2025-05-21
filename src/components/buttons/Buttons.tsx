import clsxm from "@/lib/clsxm";


enum ButtonType {
    "button",
    "submit",
    'reset'
}

enum ColorType {
    "Light",
    "Dark"
}
interface ButtonProps {
    onClick: () => void;
    className?: string;
    type: keyof typeof ButtonType;
    color: keyof typeof ColorType;
    children: React.ReactNode;
}

export default function Button({
    onClick,
    className,
    type = 'button',
    color,
    children,
}: ButtonProps) {
    return (
        <button className={clsxm(
            "relative px-6 py-3 ",
            [
                color === "Light" && "bg-white",
                color === "Dark" && "bg-black"
            ],
            [
                type === "button" && "div",
                type === "submit" && "submit",
                type === "reset" && "reset"

            ],
            className
        )}
            onClick={onClick}
            >
            {children}
        </button>
        )
} 