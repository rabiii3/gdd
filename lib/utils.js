export const COLORS = ['red', 'purple', 'indigo', 'lightBlue', 'teal', 'lightGreen', 'orange'];
const randomColor = () => COLORS[Math.round(Math.random() * (COLORS.length - 1))];
export const getColor = (obj = {}) => obj.color || randomColor();
