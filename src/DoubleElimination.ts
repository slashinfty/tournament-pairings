import { Match } from './Match.js';
import { shuffle } from './Shuffle.js';

export function DoubleElimination(players: number | string[], startingRound: number = 1, ordered: boolean = false) : Match[] {
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
        matches.filter(m => m.round === startingRound).forEach((m, i) => {
            m.player1 = playerArray[2 ** Math.floor(exponent) + i];
            const p2 = playerArray[2 ** Math.floor(exponent) - i - 1];
            const nextMatch = matches.filter(n => n.round === startingRound + 1).find(n => n.player1 === p2 || n.player2 === p2);
            if (nextMatch.player1 === p2) {
                nextMatch.player1 = null;
            } else {
                nextMatch.player2 = null;
            }
            m.player2 = p2;
            m.win = {
                round: startingRound + 1,
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
        const a = [...new Array(matchCount)].map((_, i) => i + 1);
        const c = fillCount % 4;
        const x = a.slice(0, a.length / 2);
        const y = a.slice(a.length / 2);
        return c === 0 ? a : c === 1 ? a.reverse() : c === 2 ? x.reverse().concat(y.reverse()) : y.concat(x);
    }
    let fillCount = 0;
    let winRound = startingRound;
    let loseRound = roundDiff + 1;
    if (remainder === 0) {
        const winMatches = matches.filter(m => m.round === winRound);
        const fill = fillPattern(winMatches.length, fillCount);
        fillCount++;
        let counter = 0;
        matches.filter(m => m.round === loseRound).forEach(m => {
            for (let i = 0; i < 2; i++) {
                const match = winMatches.find(m => m.match === fill[counter]);
                match.loss = {
                    round: m.round,
                    match: m.match
                }
                counter++;
            }
        });
        winRound++;
        loseRound++;
    } else if (remainder <= 2 ** Math.floor(exponent) / 2) {
        let winMatches = matches.filter(m => m.round === winRound);
        let fill = fillPattern(winMatches.length, fillCount);
        fillCount++;
        matches.filter(m => m.round === loseRound).forEach((m, i) => {
            const match = winMatches.find(m => m.match === fill[i]);
            match.loss = {
                round: m.round,
                match: m.match
            };
        });
        winRound++;
        loseRound++;
        winMatches = matches.filter(m => m.round === winRound);
        fill = fillPattern(winMatches.length, fillCount);
        fillCount++;
        let countA = 0;
        let countB = 0;
        let routeNumbers = matches.filter(m => m.round === 2 && (m.player1 === null || m.player2 === null)).map(m => Math.ceil(m.match / 2));
        let routeCopy = [...routeNumbers];
        matches.filter(m => m.round === loseRound).forEach(m => {
            for (let i = 0; i < 2; i++) {
                const match = winMatches.find(m => m.match === fill[countA]);
                if (routeCopy.some(n => n === m.match)) {
                    const lossMatch = matches.filter(x => x.round === loseRound - 1)[countB];
                    countB++;
                    match.loss = {
                        round: lossMatch.round,
                        match: lossMatch.match
                    };
                    routeCopy.splice(routeCopy.indexOf(m.match), 1);
                } else {
                    match.loss = {
                        round: m.round,
                        match: m.match
                    };
                }
                countA++;
            }
        });
        winRound++;
        loseRound++;
        matches.filter(m => m.round === roundDiff + 1).forEach((m, i) => {
            const match = matches.find(x => x.round === m.round + 1 && x.match === routeNumbers[i]);
            m.win = {
                round: match.round,
                match: match.match
            };
        });
    } else {
        const winMatches = matches.filter(m => m.round === winRound);
        const loseMatchesA = matches.filter(m => m.round === loseRound);
        loseRound++;
        const loseMatchesB = matches.filter(m => m.round === loseRound);
        const fill = fillPattern(winMatches.length, fillCount);
        fillCount++;
        let countA = 0;
        let countB = 0;
        let routeNumbers = matches.filter(m => m.round === 2 && m.player1 === null && m.player2 === null).map(m => m.match);
        loseMatchesB.forEach(m => {
            const winMatchA = winMatches.find(x => x.match === fill[countA]);
            if (routeNumbers.some(n => n === m.match)) {
                const lossMatch = loseMatchesA[countB];
                winMatchA.loss = {
                    round: lossMatch.round,
                    match: lossMatch.match
                };
                countA++;
                countB++;
                const winMatchB = winMatches.find(x => x.match === fill[countA]);
                winMatchB.loss = {
                    round: lossMatch.round,
                    match: lossMatch.match
                };
            } else {
                winMatchA.loss = {
                    round: m.round,
                    match: m.match
                }
            }
            countA++;
        });
        winRound++;
        matches.filter(m => m.round === roundDiff + 1).forEach((m, i) => {
            const match = matches.find(x => x.round === m.round + 1 && x.match === routeNumbers[i]);
            m.win = {
                round: match.round,
                match: match.match
            };
        });
    }
    let ffwd = 0;
    for (let i = winRound; i < roundDiff; i++) {
        let loseMatchesA = matches.filter(m => m.round === loseRound - winRound + ffwd + i);
        const lostMatchesB = matches.filter(m => m.round === loseRound - winRound + ffwd + i + 1);
        if (loseMatchesA.length === lostMatchesB.length) {
            loseMatchesA = lostMatchesB;
            ffwd++;
        }
        const winMatches = matches.filter(m => m.round === i);
        const fill = fillPattern(winMatches.length, fillCount);
        fillCount++;
        loseMatchesA.forEach((m, j) => {
            const match = winMatches.find(m => m.match === fill[j]);
            match.loss = {
                round: m.round,
                match: m.match
            };
        });
    }
    for (let i = remainder === 0 ? roundDiff + 1 : roundDiff + 2; i < matches.reduce((max, curr) => Math.max(max, curr.round), 0); i++) {
        const loseMatchesA = matches.filter(m => m.round === i);
        const loseMatchesB = matches.filter(m => m.round === i + 1);
        loseMatchesA.forEach((m, j) => {
            const match = loseMatchesA.length === loseMatchesB.length ? loseMatchesB[j] : loseMatchesB[Math.floor(j / 2)];
            m.win = {
                round: match.round,
                match: match.match
            };
        });
    }
    matches.filter(m => m.round === matches.reduce((max, curr) => Math.max(max, curr.round), 0))[0].win = {
        round: roundDiff,
        match: 1
    };
    return matches;
}