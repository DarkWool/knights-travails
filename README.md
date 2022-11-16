# Knights Travails Project

I decided to solve this problem using recursion and iteration. On the file _knights-travails.js_ you will find 3 different functions that do exactly the same but in different ways, all of them use the same _search algorithm_: **BFS** (Breadth-first search).

`knightMoves` => Personally I think this is the cleanest solution, this method only logs the result of `getPath` which solves the problem by using recursion, this way you don't 'pollute' the `getPath` method with unnecessary things like logging or formatting the result.

`knightMovesRec` => solves the problem by using recursion and doesn't needs any other functions to produce the expected output.

`knightMovesIt` => solves the problem with an iterative approach.

[Check the assignment here!](https://www.theodinproject.com/lessons/javascript-knights-travails)

## Specifications

Your task is to build a function `knightMoves` that shows the shortest possible way to get from one square to another by outputting all squares the knight will stop on along the way.

1. Put together a script that creates a game board.
1. Treat all possible moves the knight could make as children in a tree. Don’t allow any moves to go off the board.
1. Decide which _search algorithm_ is best to use for this case.
1. Use the chosen _search algorithm_ to find the shortest path between the starting square (or node) and the ending square. Output what that full path looks like, e.g.:

```
  knightMoves([3,3],[4,3])
  => You made it in 3 moves!  Here's your path:
    [3,3]
    [4,5]
    [2,4]
    [4,3]
```

## How to test it?

You can do this using the _node_ command

```
node knights-travails.js
```

### Improvements that can be done

I would like to add tests for this project, although I'm just starting to learn how to use them, in the future I can come back to improve it!
