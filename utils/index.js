const random = i => Math.random() * i
export const binRandom = () => Math.random() > 0.5 ? 1 : -1

export const getRandomRange = (start, end) => Math.ceil(random(end - start)) + start