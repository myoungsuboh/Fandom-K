/**
 * string 타입의 입력을 받아 number 타입으로 리턴 (null이나 undefined인 경우 0 리턴)
 */
const stringToNumber = value => parseInt(value) || 0;

const formattingCredit = value => value.replace(/\D/g, '').replace(/^0+/, '');

export {stringToNumber, formattingCredit};
