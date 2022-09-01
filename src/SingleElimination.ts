import { Match } from './Match.js';
import { shuffle } from './Shuffle.js';

export function SingleElimination(players: Number | String[], consolation: Boolean = false, ordered: Boolean = false) : Match[] {
    const matches = [];
    let playerArray = [];
    if (Array.isArray(players)) {
        if (!ordered) {
            playerArray = shuffle(players);
        } else {
            playerArray = players;
        }
    } else {
        playerArray = [...new Array(players)].map((_, i) => i + 1);
    }
    const exponent = Math.log2(playerArray.length);
    const remainder = Math.round(2 ** exponent) % (2 ** Math.floor(exponent));
    const bracket = [1, 4, 2, 3];
    for (let i = 3; i <= Math.floor(exponent); i++) {
        for (let j = 0; j < bracket.length; j += 2) {
            bracket.splice(j + 1, 0, 2 ** i + 1 - bracket[j]);
        }
    }
    let round = 1;
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
    } while (round < Math.ceil(exponent) + 1);
    const startRound = remainder === 0 ? 1 : 2;
    matches.filter(m => m.round === startRound).forEach((m, i) => {
        m.player1 = playerArray[bracket[2 * i] - 1];
        m.player2 = playerArray[bracket[2 * i + 1] - 1];
    });
    if (remainder !== 0) {
        matches.filter(m => m.round === 1).forEach((m, i) => {
            m.player1 = playerArray[2 ** Math.floor(exponent) + i];
            const p2 = playerArray[2 ** Math.floor(exponent) - i - 1];
            const nextMatch = matches.filter(n => n.round === 2).find(n => (n.player1 !== null && n.player1 === p2) || (n.player2 !== null && n.player2 === p2));
            if (nextMatch.player1 === p2) {
                nextMatch.player1 = null;
            } else {
                nextMatch.player2 = null;
            }
            m.player2 = p2;
            m.win = {
                round: 2,
                match: nextMatch.match
            };
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
        matches.filter(m => m.round === lastRound - 1).forEach(m => m.lose = {
            round: lastRound,
            match: lastMatch + 1
        });
    }
    return matches;
}
