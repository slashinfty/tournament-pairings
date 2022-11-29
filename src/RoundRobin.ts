import { Match } from './Match.js';
import { shuffle } from './Shuffle.js';

export function RoundRobin(players: number | string[], startingRound: number = 1, ordered: boolean = false) : Match[] {
    let matches = [];
    let playerArray = [];
    if (Array.isArray(players)) {
        playerArray = ordered ? players : shuffle(players);
    } else {
        playerArray = [...new Array(players)].map((_, i) => i + 1);
    }
    if (playerArray.length % 2 === 1) {
        playerArray.push(null);
    }
    for (let r = startingRound; r < startingRound + playerArray.length - 1; r++) {
        let round = [];
        for (let i = 0; i < playerArray.length / 2; i++) {
            round.push({
                round: r,
                match: i + 1,
                player1: null,
                player2: null
            });
        }
        if (r === startingRound) {
            round.forEach((m, i) => {
                m.player1 = playerArray[i];
                m.player2 = playerArray[playerArray.length - i - 1];
            });
        } else {
            const prevRound = matches.filter(m => m.round === r - 1);
            const indexFind = idx => {
                if (idx + (playerArray.length / 2) > playerArray.length - 2) {
                    return idx + 1 - (playerArray.length / 2);
                } else {
                    return idx + (playerArray.length / 2);
                }
            }
            for (let i = 0; i < round.length; i++) {
                const prev = prevRound[i];
                const curr = round[i];
                if (i === 0) {
                    if (prev.player2 === playerArray[playerArray.length - 1]) {
                        curr.player1 = playerArray[playerArray.length - 1];
                        curr.player2 = playerArray[indexFind(playerArray.findIndex(p => p === prev.player1))];
                    } else {
                        curr.player2 = playerArray[playerArray.length - 1];
                        curr.player1 = playerArray[indexFind(playerArray.findIndex(p => p === prev.player2))];
                    }
                } else {
                    curr.player1 = playerArray[indexFind(playerArray.findIndex(p => p === prev.player1))];
                    curr.player2 = playerArray[indexFind(playerArray.findIndex(p => p === prev.player2))];
                }
            }
        }
        matches = [...matches, ...round];
    }
    return matches;
}