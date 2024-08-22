import { Match } from './Match.js';
import { shuffle } from './Shuffle.js';

export function SingleElimination(players: number | string[], startingRound: number = 1, consolation: boolean = false, ordered: boolean = false) : Match[] {
    const matches = [];
    let playerArray = [];
    if (Array.isArray(players)) {
        playerArray = ordered ? players : shuffle(players);
    } else {
        playerArray = [...new Array(players)].map((_, i) => i + 1);
    }
    const exponent = Math.log2(playerArray.length);
    const remainder = Math.round(2 ** exponent) % (2 ** Math.floor(exponent));
    const bracket = exponent < 2 ? [1, 2] : [1, 4, 2, 3];
    for (let i = 3; i <= Math.floor(exponent); i++) {
        for (let j = 0; j < bracket.length; j += 2) {
            bracket.splice(j + 1, 0, 2 ** i + 1 - bracket[j]);
        }
    }
    let round = startingRound;
    if (remainder !== 0) {
        for (let i = 0; i < remainder; i++) {
            matches.push({
                round: round,
                match: i + 1,
                player1: null,
                player2: null
            });
        }
        round++;
    }
    let matchExponent = Math.floor(exponent) - 1;
    let iterated = false;
    do {
        for (let i = 0; i < 2 ** matchExponent; i++) {
            matches.push({
                round: round,
                match: i + 1,
                player1: null,
                player2: null
            });
        }
        if (!iterated) {
            iterated = true;
        } else {
            matches.filter(m => m.round === round - 1).forEach(m => m.win = {
                round: round,
                match: Math.ceil(m.match / 2)
            });
        }
        round++;
        matchExponent--;
    } while (round < startingRound + Math.ceil(exponent));
    const startRound = startingRound + (remainder === 0 ? 0 : 1);
    matches.filter(m => m.round === startRound).forEach((m, i) => {
        m.player1 = playerArray[bracket[2 * i] - 1];
        m.player2 = playerArray[bracket[2 * i + 1] - 1];
    });
    if (remainder !== 0) {
        const initialRound = matches.filter(m => m.round === startingRound);
        let counter = 0;
        matches.filter(m => m.round === startingRound + 1).forEach((m, i) => {
            const [index1, index2] = [playerArray.indexOf(m.player1), playerArray.indexOf(m.player2)];
            if (index1 >= Math.pow(2, Math.floor(exponent)) - remainder) {
                const initialMatch = initialRound[counter];
                initialMatch.player1 = m.player1;
                initialMatch.player2 = playerArray[Math.pow(2, Math.ceil(exponent)) - index1 - 1];
                initialMatch.win = {
                    round: startingRound + 1,
                    match: m.match
                }
                m.player1 = null;
                counter++;
            }
            if (index2 >= Math.pow(2, Math.floor(exponent)) - remainder) {
                const initialMatch = initialRound[counter];
                initialMatch.player1 = m.player2;
                initialMatch.player2 = playerArray[Math.pow(2, Math.ceil(exponent)) - index2 - 1];
                initialMatch.win = {
                    round: startingRound + 1,
                    match: m.match
                }
                m.player2 = null;
                counter++;
            }
        });
    }
    if (consolation) {
        const lastRound = matches.reduce((max, curr) => Math.max(max, curr.round), 0);
        const lastMatch = matches.filter(m => m.round === lastRound).reduce((max, curr) => Math.max(max, curr.match), 0);
        matches.push({
            round: lastRound,
            match: lastMatch + 1,
            player1: null,
            player2: null
        });
        matches.filter(m => m.round === lastRound - 1).forEach(m => m.loss = {
            round: lastRound,
            match: lastMatch + 1
        });
    }
    return matches;
}
