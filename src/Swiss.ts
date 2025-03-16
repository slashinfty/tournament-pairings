import blossom from 'edmonds-blossom-fixed';
import { Match } from './Match.js';
import { shuffle } from './Shuffle.js';

export interface Player {
    id: string | number,
    score: number,
    pairedUpDown?: boolean,
    receivedBye? : boolean,
    avoid?: Array<string | number>,
    seating?: Array<-1 | 1>,
    rating?: number | null
}

export function Swiss(players: Player[], round: number, rated: boolean = false, seating: boolean = false) : Match[] {
    const matches = [];
    let playerArray = [];
    if (Array.isArray(players)) {
        playerArray = players;
    } else {
        playerArray = [...new Array(players)].map((_, i) => i + 1);
    }
    if (rated) {
        playerArray.filter(p => !p.hasOwnProperty('rating') || p.rating === null).forEach(p => p.rating = 0);
    }
    if (seating) {
        playerArray.filter(p => !p.hasOwnProperty('seating')).forEach(p => p.seating = []);
    }
    playerArray = shuffle(playerArray);
    playerArray.forEach((p, i) => p.index = i);
    const scoreGroups = [...new Set(playerArray.map(p => p.score))].sort((a, b) => a - b);
    const scoreSums = [...new Set(scoreGroups.map((s, i, a) => {
        let sums = [];
        for (let j = i; j < a.length; j++) {
            sums.push(s + a[j]);
        }
        return sums;
    }).flat())].sort((a, b) => a - b);
    let pairs = [];
    for (let i = 0; i < playerArray.length; i++) {
        const curr = playerArray[i];
        const next = playerArray.slice(i + 1);
        const sorted = rated ? [...next].sort((a, b) => Math.abs(curr.rating - a.rating) - Math.abs(curr.rating - b.rating)) : [];
        for (let j = 0; j < next.length; j++) {
            const opp = next[j];
            if (curr.hasOwnProperty('avoid') && curr.avoid.includes(opp.id)) {
                continue;
            }
            let wt = 75 - 75 / (scoreGroups.findIndex(s => s === Math.min(curr.score, opp.score)) + 2);
            wt += 5 - 5 / (scoreSums.findIndex(s => s === curr.score + opp.score) + 1);
            let scoreGroupDiff = Math.abs(scoreGroups.findIndex(s => s === curr.score) - scoreGroups.findIndex(s => s === opp.score));
            if (scoreGroupDiff === 1 && curr.hasOwnProperty('pairedUpDown') && curr.pairedUpDown === false && opp.hasOwnProperty('pairedUpDown') && opp.pairedUpDown === false) {
                scoreGroupDiff -= 0.65;
            } else if (scoreGroupDiff > 0 && ((curr.hasOwnProperty('pairedUpDown') && curr.pairedUpDown === true) || (opp.hasOwnProperty('pairedUpDown') && opp.pairedUpDown === true))) {
                scoreGroupDiff += 0.2;
            }
            wt += 23 / (2 *(scoreGroupDiff + 2));
            if (rated) {
                wt += 4 / (sorted.findIndex(p => p.id === opp.id) + 2);
            }
            if (seating) {
                let seatingDiff = Math.abs(curr.seating.reduce((sum, seat) => sum + seat, 0) - opp.seating.reduce((sum, seat) => sum + seat, 0));
                if (curr.seating.slice(-1)[0] !== opp.seating.slice(-1)[0]) {
                    seatingDiff += 0.5;
                }
                wt += Math.pow(2, seatingDiff - 1);
            }
            if ((curr.hasOwnProperty('receivedBye') && curr.receivedBye) || (opp.hasOwnProperty('receivedBye') && opp.receivedBye)) {
                wt += 40;
            }
            pairs.push([curr.index, opp.index, wt]);
        }
    }
    const blossomPairs = blossom(pairs, true);
    let playerCopy = [...playerArray];
    let byeArray = [];
    let match = 1;
    do {
        const indexA = playerCopy[0].index;
        const indexB = blossomPairs[indexA];
        if (indexB === -1) {
            byeArray.push(playerCopy.splice(0, 1)[0]);
            continue;
        }
        playerCopy.splice(0, 1);
        playerCopy.splice(playerCopy.findIndex(p => p.index === indexB), 1);
        let playerA = playerArray.find(p => p.index === indexA);
        let playerB = playerArray.find(p => p.index === indexB);
        if (seating) {
            const aScore = playerA.seating.reduce((sum: number, seat: number) => sum + seat, 0);
            const bScore = playerB.seating.reduce((sum: number, seat: number) => sum + seat, 0);
            if (
                JSON.stringify(playerB.seating.slice(-2)) === '[-1,-1]' ||
                JSON.stringify(playerA.seating.slice(-2)) === '[1,1]' ||
                (playerB.seating.slice(-1)[0] === -1 && playerA.seating.slice(-1)[0] === 1) ||
                bScore < aScore
            ) {
                [playerA, playerB] = [playerB, playerA];
            }
        }
        matches.push({
            round: round,
            match: match++,
            player1: playerA.id,
            player2: playerB.id
        });
    } while (playerCopy.length > blossomPairs.reduce((sum: number, idx: number) => idx === -1 ? sum + 1 : sum, 0));
    byeArray = [...byeArray, ...playerCopy];
    for (let i = 0; i < byeArray.length; i++) {
        matches.push({
            round: round,
            match: match++,
            player1: byeArray[i].id,
            player2: null
        })
    }
    return matches;
}
