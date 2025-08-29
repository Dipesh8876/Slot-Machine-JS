// 1. Deposit some money
// 2. Determine no of lines to bet on
// 3. Collect a bet amount
// 4. Spin the slot machine
// 5. Check if the user won
// 6. Give the user their winnings
// 7. Play again

// Install VS code
// Install node.js
// npm init // created package.json
// npm i prompt - sync // adds packages to input and output from user
// node project.js // file name, this will run the project file

const prompt = require("prompt-sync")(); // imports the prompt-sync library and initializes it, giving you a prompt()

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = { //snake case, max count of characters in each reel or columns
    A: 2,
    B: 4,
    C: 6,
    D: 8
}

const SYMBOLS_VALUES = {  //multiplier
    A: 5,
    B: 4,
    C: 3,
    D: 2
}


const deposit = () => {
    while (true) {
        const depositAmount = prompt("Enter a deposit amount: ")
        const numberDepositAmount = parseFloat(depositAmount); // parseFloat takes input as string and converts it to floating point value and if "ab" given returns NaN
        if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
            console.log("Invalid deposit amount, try again")
        }
        else {
            return numberDepositAmount;
        }
    }
};

const getNumberofLines = () => {
    while (true) {
        const noOfLines = prompt("Enter the number of lines (1-3): ")
        const numberNoOfLines = parseFloat(noOfLines); // parseFloat takes input as string and converts it to floating point value and if "ab" given returns NaN
        if (isNaN(numberNoOfLines) || numberNoOfLines <= 0 || numberNoOfLines > 3) {
            console.log("Invalid no of Lines, try again")
        }
        else {
            return numberNoOfLines;
        }
    }

};

const getBet = (balance, noOfLines) => {
    while (true) {
        const bet = prompt("Enter the bet per line: ")
        const numberBet = parseFloat(bet); // parseFloat takes input as string and converts it to floating point value and if "ab" given returns NaN
        if (isNaN(numberBet) || numberBet <= 0 || numberBet * noOfLines > balance) {
            console.log("Invalid bet")
        }
        else {
            return numberBet;
        }
    }
};

const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol)
        }
    }
    const reels = [];
    for (let i = 0; i < COLS; i++) {
        reels.push([]);
        const reelSymbols = [...symbols]; // to delete the character if it gets over and to delete this from this copy of symbols array
        for (let j = 0; j < ROWS; j++) {
            const randomIndex = Math.floor(Math.random() * reelSymbols.length); // Math.random() ranges in [0,0.9999]
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1); // splice can remove, insert, or replace elements and also returns an array of removed elements
        }
    }
    return reels;
};

const transpose = (reels) => {
    const rows = [];
    for (let i = 0; i < ROWS; i++) {
        rows.push([]);
        for (let j = 0; j < COLS; j++) {
            rows[i].push(reels[j][i]);

        }
    }
    return rows
}

const printRows = (rows) => {
    for (const row of rows) {
        let rowString = "";
        for (const [i, symbol] of row.entries()) {
            rowString += symbol
            if (i != row.length - 1) {
                rowString += " | "
            }
        }
        console.log(rowString) // appends \n after printing
    }

};

const getWinnings = (rows, bet, lines) => {
    let winnings = 0;
    for (let row = 0; row < lines; row++) {
        const symbols = rows[row];
        let allSame = true;
        for (const symbol of symbols) {
            if (symbol != symbols[0]) {
                allSame = false;
                break; // didn't win in this particular line
            }
        }
        if (allSame) {
            winnings += bet * SYMBOLS_VALUES[symbols[0]];
        }
    }
    return winnings;
}

const game = () => {
    let balance = deposit();
    while (true) {
        console.log("You have a balance of $", + balance)
        const noOfLines = getNumberofLines();
        const bet = getBet(balance, noOfLines);
        balance -= bet * noOfLines;
        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);
        const winnings = getWinnings(rows, bet, noOfLines);
        balance += winnings;
        console.log("You won, $" + winnings.toString());
        if (balance <= 0) {
            console.log("You ran out of money!!!");
            break;
        }
        const playAgain = prompt("Do you want to play again (y/n)? ")
        if (playAgain != 'y') break;
    }

}
game();
// Now we want to rows to decide the win, so we will transpose








