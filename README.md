# tournament-pairings
Functions to generate pairings for tournaments

## Requirements
This is an ESM module. You will need to use `import` instead of `require` and add `type: "module"` to your `package.json`. See [this](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c) for more information.

## Installation
```
npm i tournament-pairings
```

## Documentation

### Imports
There are 4 named exports you can import into your project.

```js
import {
    SingleElimination,
    DoubleElimination,
    RoundRobin,
    Swiss
} from 'tournament-pairings';
```

### Parameters

`SingleElimination()` has three parameters:

- `players`: either a number or an array of unique strings or numbers
- `consolation` (optional): a boolean to determine if a third place match should be created (default: false)
- `ordered` (optional): a boolean to indicate if the array provided for `players` is ordered (default: false)

`DoubleElimination()` and `RoundRobin()` have two parameters:

- `players`: either a number or an array of unique strings or numbers
- `ordered` (optional): a boolean to indicate if the array provided for `players` is ordered (default: false)

`Swiss()` has two parameters:

- `players`: an array of objects with the following structure
```ts
{
    id: String | Number, // unique identifier
    score: Number, // current score
    avoid?: String[] | Number[], // array of IDs the player can not be paired with (optional)
    rating?: Number | null // rating of the player (optional)
}
```
- `rated` (optional): a boolean to indicate if the players have a rating that should be considered when pairing (default: false)

### Returns
Each function returns an array of matches. Matches are objects with the following structure:

```ts
{
    round: Number,
    match: Number,
    player1: String | Number | null,
    player2: String | Number | null,
    // the following objects are only present in elimination pairings
    win?: {
        round: Number,
        match: Number
    },
    loss?: {
        round: Number,
        match: Number
    }
}
```
The Swiss function returns matches for one round, while single/double elimination and round-robin functions return all matches for the tournament.

## Examples
Creating a generic single elimination bracket for 8 players with a third place match:
```js
import { SingleElimination } from 'tournament-pairings';

const elimBracket = SingleElimination(8, true);

console.log(elimBracket);
/*
Expected output:
[
  {
    round: 1,
    match: 1,
    player1: 1,
    player2: 8,
    win: { round: 2, match: 1 }
  },
  {
    round: 1,
    match: 2,
    player1: 4,
    player2: 5,
    win: { round: 2, match: 1 }
  },
  {
    round: 1,
    match: 3,
    player1: 2,
    player2: 7,
    win: { round: 2, match: 2 }
  },
  {
    round: 1,
    match: 4,
    player1: 3,
    player2: 6,
    win: { round: 2, match: 2 }
  },
  {
    round: 2,
    match: 1,
    player1: null,
    player2: null,
    win: { round: 3, match: 1 },
    lose: { round: 3, match: 2 }
  },
  {
    round: 2,
    match: 2,
    player1: null,
    player2: null,
    win: { round: 3, match: 1 },
    lose: { round: 3, match: 2 }
  },
  { round: 3, match: 1, player1: null, player2: null },
  { round: 3, match: 2, player1: null, player2: null }
]
*/
```