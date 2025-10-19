export const normalizeText = (text: string | null | undefined) =>
    (text || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9]/g, "")
        .toLowerCase();

export const getCroppedText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    const cropped = text.slice(0, maxLength);
    const lastPeriodIndex = cropped.lastIndexOf(".");
    return lastPeriodIndex !== -1
        ? cropped.slice(0, lastPeriodIndex + 1)
        : cropped + "...";
};

