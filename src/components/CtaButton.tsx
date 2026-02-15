"use client";

import Link from "next/link";
import { ReactNode } from "react";

interface CtaButtonProps {
    href: string;
    children: ReactNode;
    className?: string;
    target?: string;
}

export function CtaButton({ href, children, className = "", target }: CtaButtonProps) {
    return (
        <Link
            href={href}
            target={target}
            className={`
                inline-block 
                bg-[#e44c65] 
                text-white 
                font-bold 
                px-8 py-3 
                rounded-xl 
                hover:bg-[#c43c52] 
                transition-all 
                transform hover:scale-[1.02] 
                shadow-[0_4px_14px_0_rgba(228,76,101,0.39)] 
                hover:shadow-[0_6px_20px_rgba(228,76,101,0.23)]
                ${className}
            `}
        >
            {children}
        </Link>
    );
}
