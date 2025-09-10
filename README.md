# Tournament Pairings
Node.js package containing functions to generate tournament pairings.

If you want a full-fledged package for organizing tournaments, consider [`tournament-organizer`](https://github.com/slashinfty/tournament-organizer).

## Algorithms
Double elimination: avoids rematches in the loser's bracket by [alternating](https://miro.medium.com/max/1400/1*p9OYmhVdnAAMiHo_OM4PjQ.png) how matches are routed.

Round-robin: players are paired via [Berger tables](https://en.wikipedia.org/wiki/Round-robin_tournament#Berger_tables).

Swiss: generated using a weighted [blossom algorithm](https://brilliant.org/wiki/blossom-algorithm/) with maximum cardinality.

### Swiss Pairings
- Players are preferred to play against other players with equal point totals
- If there are an odd number of players, players with the lowest point total who have not previously received a bye are preferred to receive the bye
- If the tournament is rated, players are preferred to play other players with similar ratings
- If the seating in a tournament is relevant, such as white and black in chess, players are preferred to play the opposite seat than last played and strongly preferred to not play the same seat more than two times consecutively

## Requirements
This is an ESM module. You will need to use `import` instead of `require` and add `type: "module"` to your `package.json`.

## Discussion

You can discuss this repository more in my [Discord](https://discord.gg/N6Rcd7UF7d).

# Documentation

## Installation
```
npm i tournament-pairings
```

## Importing

Named imports:
```js
import {
    SingleElimination,
    DoubleElimination,
    RoundRobin,
    Stepladder,
    Swiss
} from 'tournament-pairings'
```

Namespace import:
```js
import * as Pairings from 'tournament-pairings'
```

Interfaces for TypeScript:
```js
import {
    Match,
    Player
} from 'tournament-pairings/interfaces'
```

## Functions

Single elimination:
```ts
SingleElimination(
    players: Number | Array<String>,
    startingRound: Number = 1,
    consolation: Boolean = false,
    ordered: Boolean = false
): Array<Match>
```

Double elimination:
```ts
DoubleElimination(
    players: Number | Array<String>,
    startingRound: Number = 1,
    ordered: Boolean = false
): Array<Match>
```

Round-robin:
```ts
RoundRobin(
    players: Number | Array<String>,
    startingRound: Number = 1,
    ordered: Boolean = false
): Array<Match>
```

Stepladder:
```ts
Stepladder(
    players: Number | Array<String>,
    startingRound: Number = 1,
    ordered: Boolean = true
): Array<Match>
```

Swiss:
```ts
Swiss(
    players: Array<Player>,
    round: Number,
    rated: Boolean = false,
    seating: Boolean = false
): Array<Match>

Player {
    id: String | Number,
    score: Number,
    pairedUpDown?: Boolean,
    receivedBye? : Boolean,
    avoid?: Array<String | Number>,
    seating?: Array<-1 | 1>,
    rating?: Number | null
}
```

### Notes on Parameters

`players`: if provided a number *n* (except for Swiss), then players are array of numbers from 1 to *n*.

`consolation`: if there is an additional match in the final round to determine third place.

`ordered`: if the array provided for players is ordered.

`rated`: if the players have a rating to be considered for pairing.

`seating`: if the seating of the players needs to be considered.

### Notes on `Player` Interface

`pairedUpDown`: if the player has been paired with someone outside their point group in a prior round.

`receivedBye`: if the player was unpaired in a prior round.

`avoid`: an array of IDs representing prior opponents of the player.

`seating`: an array of either 1 or -1 to represent seating. The most obvious example is playing white or black in chess.

## Return Value

Each function returns an `Array<Match>`.
```ts
Match {
    round: number,
    match: number,
    player1: string | number | null,
    player2: string | number | null,
    win?: {
        round: number,
        match: number
    },
    loss?: {
        round: number,
        match: number
    }
}
```

The Swiss function returns matches for the given round, while all other functions return matches for the entire tournament.
