export const random = (min = 0, max = 100): number => {
    return Math.round(min - 0.5 + Math.random() * (max - min + 1));
};
