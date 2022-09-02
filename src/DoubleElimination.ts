import { Match } from './Match';
import { shuffle } from './Shuffle.js';

export function DoubleElimination(players: Number | String[], ordered: Boolean = false) : Match[] {
    const matches = [];
    let playerArray = [];
    if (Array.isArray(players)) {
        playerArray = ordered ? players : shuffle(players);
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
            const nextMatch = matches.filter(n => n.round === 2).find(n => n.player1 === p2 || n.player2 === p2);
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
    matches.push({
        round: round,
        match: 1,
        player1: null,
        player2: null,
    });
    matches.find(m => m.round === round - 1).win = {
        round: round,
        match: 1
    };
    round++;
    const roundDiff = round - 1;
    if (remainder !== 0) {
        if (remainder <= 2 ** Math.floor(exponent) / 2) {
            for (let i = 0; i < remainder; i++) {
                matches.push({
                    round: round,
                    match: i + 1,
                    player1: null,
                    player2: null
                });
            }
            round++;
        } else {
            for (let i = 0; i < remainder - 2 ** (Math.floor(exponent) - 1); i++) {
                matches.push({
                    round: round,
                    match: i + 1,
                    player1: null,
                    player2: null
                });
            }
            round++;
            for (let i = 0; i < 2 ** (Math.floor(exponent) - 1); i++) {
                matches.push({
                    round: round,
                    match: i + 1,
                    player1: null,
                    player2: null
                });
            }
            round++;
        }
    }
    let loserExponent = Math.floor(exponent) - 2;
    do {
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2 ** loserExponent; j++) {
                matches.push({
                    round: round,
                    match: j + 1,
                    player1: null,
                    player2: null
                });
            }
            round++;
        }
        loserExponent--;
    } while (loserExponent > -1);
    const fillPattern = (matchCount, fillCount) => {
        const a = Array.from({length: matchCount}, (_, i) => i + 1);
        const c = fillCount % 4;
        const x = arr.slice(0, a.length / 2);
        const y = arr.slice(a.length / 2);
        return c === 0 ? a : c === 1 ? a.reverse() : c === 2 ? x.reverse().concat(y.reverse()) : y.concat(x);
    }
    let fillCount = 0;
    let winRound = 1;
    let loseRound = roundDiff + 1;
    if (remainder === 0) {
        const winMatches = matches.filter(m => m.round === winRound);
        const fill = fillPattern(winMatches.length, fillCount);
        fillCount++;
        let counter = 0;
        matches.filter(m => m.round === loseRound).forEach(m => {
            for (let i = 0; i < 2; i++) {
                const match = winMatches.find(m => m.match === fill[counter]);
                match.lose = {
                    round = m.round,
                    match = m.match
                }
                counter++;
            }
        });
        winRound++;
        loseRound++;
    } else if (remainder <= 2 ** Math.floor(exponent) / 2) {
        
    } else {

    }
    return matches;
}