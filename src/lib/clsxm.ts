import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

//merge tailwind class with clsxm
export default function clsxm(...inputs:ClassValue[]){
    return twMerge(clsx(inputs))
}