// swap two elements in an array
function swap(array, i, j) {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

// generate a solvable 3x3 puzzle
function generatePuzzle() {
    const solvedGrid = [1, 2, 3, 4, 5, 6, 7, 8, 0];
    const moves = ['U', 'D', 'L', 'R'];
    
    // perform random valid moves on the solved grid
    let puzzle = [...solvedGrid];
    for (let i = 0; i < 1000; i++) {
    const randomMove = moves[Math.floor(Math.random() * moves.length)];
    const emptyIndex = puzzle.indexOf(0);
    
    switch (randomMove) {
            case 'U':
            if (emptyIndex > 2) {
                swap(puzzle, emptyIndex, emptyIndex - 3);
            }
            break;
            case 'D':
            if (emptyIndex < 6) {
                swap(puzzle, emptyIndex, emptyIndex + 3);
            }
            break;
            case 'L':
            if (emptyIndex % 3 !== 0) {
                swap(puzzle, emptyIndex, emptyIndex - 1);
            }
            break;
            case 'R':
            if (emptyIndex % 3 !== 2) {
                swap(puzzle, emptyIndex, emptyIndex + 1);
            }
            break;
        }
    }
    
    return puzzle;
}

const convertToBoard = (array, chunkSize = 3) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      const chunk = array.slice(i, i + chunkSize);
      if (chunk.includes(0)) {
        const nullIndex = chunk.indexOf(0);
        chunk[nullIndex] = null;
      }
      result.push(chunk);
    }
    return result;
}

const convertBoardToData = (array) => {
    return array.flat().map(element => element === null ? 0 : element)
}

module.exports = {
    generatePuzzle,
    convertToBoard,
    convertBoardToData,
}