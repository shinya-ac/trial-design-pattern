// numbers.ts

function sumNumbers(numbers: number[]): number {
    return numbers.reduce((acc, current) => acc + current, 0);
}

const numbers = [1, 2, 3, 4, 5];
console.log(`The sum is: ${sumNumbers(numbers)}`);
