"use client";

import { useRouter } from "next/navigation";
import { Arrow } from "../icons/arrow";

export default function BackButton() {
    const router = useRouter();

    return (
        <button
            onClick={() => router.back()}
            className="group w-10 h-10 flex items-center justify-center hover:border hover:border-black hover:rounded-full"
            aria-label="Voltar"
        >
            <Arrow size={24} direction="left" />
        </button>
    );
}
