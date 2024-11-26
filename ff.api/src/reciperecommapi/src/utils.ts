// src/utils.ts

export const cosineSimilarity = (
    vec1: number[],
    vec2: number[],
    magnitude1?: number,
    magnitude2?: number
): number => {
    const dotProduct = vec1.reduce((sum, val, i) => sum + val * vec2[i], 0);
    const mag1 = magnitude1 ?? Math.sqrt(vec1.reduce((sum, val) => sum + val ** 2, 0));
    const mag2 = magnitude2 ?? Math.sqrt(vec2.reduce((sum, val) => sum + val ** 2, 0));
    return mag1 && mag2 ? dotProduct / (mag1 * mag2) : 0;
};