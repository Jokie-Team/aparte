"use client";

import React, { useState } from "react";
import { ExpandMoreIcon } from "@/src/components/icons/expand-more";

interface Props {
    text: string;
    maxChars?: number;
    readMoreLabel: string;
    readLessLabel: string;
}

export default function ExpandableText({
    text,
    maxChars = 500,
    readMoreLabel,
    readLessLabel,
}: Props) {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggle = () => setIsExpanded((prev) => !prev);

    const renderText = (content: string) =>
        content.split("\n").map((line, index) => (
            <React.Fragment key={index}>
                {line}
                <br />
            </React.Fragment>
        ));

    const croppedText = text.length > maxChars
        ? text.slice(0, text.lastIndexOf(".", maxChars) + 1 || maxChars)
        : text;

    return (
        <div className="text-gray-600">
            {renderText(isExpanded ? text : croppedText)}
            {text.length > maxChars && (
                <span
                    onClick={handleToggle}
                    className="font-extrabold text-blue-600 hover:text-blue-800 mt-2 cursor-pointer flex items-center gap-2"
                >
                    {isExpanded ? readLessLabel : readMoreLabel}
                    <ExpandMoreIcon rotate180={isExpanded} />
                </span>
            )}
        </div>
    );
}
