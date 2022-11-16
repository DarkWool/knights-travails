class GraphNode {
    constructor(coords) {
        this.coords = coords;
        this.edges = [];
    }
}

class ChessBoard {
    constructor(boardSize) {
        this.data = this.createBoard(boardSize);
    }
    
    createBoard(size) {
        const board = [];
        for (let y = 0; y < size; y++) {
            const row = [];

            for (let x = 0; x < size; x++) {
                row.push(new GraphNode([y, x]));
            }

            board.push(row);
        }

        return board;
    }
    
    addEdges() {
        const len = this.data.length;

        for (let y = 0; y < len; y++) {
            for (let x = 0; x < len; x++) {
                // All possible movements
                let movements = [
                    [y + 2, x + 1],
                    [y + 2, x - 1],
                    [y + 1, x + 2],
                    [y - 1, x + 2],
                    [y - 2, x - 1],
                    [y - 2, x + 1],
                    [y + 1, x - 2],
                    [y - 1, x - 2]
                ];

                const node = this.data[y][x];
                node.edges = movements.filter(movement => {
                    const [y, x] = movement;
                    return ((x < 0 || y < 0) || (x >= len || y >= len)) ? false : true;
                });
            }
        }
    }

    getPath(startCoords, endCoords, queue = [startCoords], visited = []) {
        const dequeued = queue.shift();  // Get first element from the queue
        
        // Base cases
        if (dequeued[0] === endCoords[0] && dequeued[1] === endCoords[1]) return [dequeued];
        if (visited.find((edge) => edge[0] === dequeued[0] && edge[1] === dequeued[1])) {
            return this.getPath(startCoords, endCoords, queue);
        }
        else visited.push(dequeued);

        
        // Add "children" (edges) to the queue
        const edges = this.data[dequeued[0]][dequeued[1]].edges;
        queue.push(...edges);
        
        let path = this.getPath(startCoords, endCoords, queue);

        // Check if the last element added to the path is a child of "dequeued"
        if (edges.find((edge) => edge[0] === path[0][0] && edge[1] === path[0][1])) {
            return [dequeued, ...path];
        }
        else return path;
    }

    knightMoves(startCoords, endCoords) {
        // First check if the coords are inside the board's range
        const boardLen = this.data.length - 1;
        const coords = [...startCoords, ...endCoords];
        if (coords.find((num) => num < 0 || num > boardLen)) return null;
        
        const path = this.getPath(startCoords, endCoords);
        console.log(`You made it in ${path.length - 1} moves! Here's your path:`);
        for (const move of path) {
            console.log(move);
        }
    }

    knightMovesRec(startCoords, endCoords, queue = [startCoords]) {
        const dequeued = queue.shift();  // Get first element from the queue

        // Base case
        if (dequeued[0] === endCoords[0] && dequeued[1] === endCoords[1]) return [dequeued];
        
        // Add "children" (edges) to the queue
        const edges = this.data[dequeued[0]][dequeued[1]].edges;
        queue.push(...edges);
        
        let path = this.knightMovesRec(startCoords, endCoords, queue);

        // Check if the last element added to the path is a child of "dequeued"
        if (edges.find((edge) => edge[0] === path[0][0] && edge[1] === path[0][1])) {
            path = [dequeued, ...path];

            if (startCoords[0] === path[0][0] && startCoords[1] === path[0][1]) {
                console.log(`You made it in ${path.length - 1} moves! Here's your path:`);
                for (const move of path) console.log(move);
            }

            return path;
        }
        else return path;
    }

    knightMovesIt(startCoords, endCoords) {
        const queue = [startCoords];
        const visited = [startCoords];
        const path = [];

        // While there is something left on the queue
        while (queue.length > 0) {
            const dequeued = queue.shift();
            const edges = this.data[dequeued[0]][dequeued[1]].edges;
            queue.push(...edges);

            if (dequeued[0] === endCoords[0] && dequeued[1] === endCoords[1]) {
                path.push(dequeued);
                break;
            }

            // Check if the node has been added before so you don't add it twice
            if (!visited.find(edge => (edge[0] === dequeued[0] && edge[1] === dequeued[1]))) {
                visited.push(dequeued);
            }
        }

        // Find out what was the shortest path
        for (let i = visited.length - 1; i >= 0; i--) {
            const [y, x] = visited[i];
            const edges = this.data[y][x].edges;
            
            for (const edge of edges) {
                if (edge[0] === path[0][0] && edge[1] === path[0][1]) {
                    path.unshift(visited[i]);
                    break;
                }
            }
        }

        console.log(`You made it in ${path.length - 1} moves! Here's your path:`);
        for (const move of path) console.log(move);

        return path;
    }
}


const graph = new ChessBoard(8);
graph.addEdges();

graph.knightMoves([0, 0], [3, 3]);
graph.knightMovesRec([0, 0], [3, 3]);
graph.knightMovesIt([0, 0], [3, 3]);

graph.knightMoves([3, 3], [0, 0]);
graph.knightMovesRec([3, 3], [0, 0]);
graph.knightMovesIt([3, 3], [0, 0]);

graph.knightMoves([0, 0], [1, 2]);
graph.knightMovesRec([0, 0], [1, 2]);
graph.knightMovesIt([0, 0], [1, 2]);

graph.knightMoves([0, 6], [6, 1]);
graph.knightMovesRec([0, 6], [6, 1]);
graph.knightMovesIt([0, 6], [6, 1]);

graph.knightMoves([3, 3], [4, 3]);
graph.knightMovesRec([3, 3], [4, 3]);
graph.knightMovesIt([3, 3], [4, 3]);
