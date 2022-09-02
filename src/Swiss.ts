import blossom from 'edmonds-blossom';
import { Match } from './Match';

interface Player {
    id: String | Number,
    score: Number,
    pairedUpDown?: Boolean,
    receivedBye? : Boolean,
    avoid?: (String | Number)[],
    rating?: Number | null
}

export function Swiss(players: Player[], round: Number, rated: Boolean = false) : Match[] {
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
            let wt = 12 * Math.log10(scoreSums.findIndex(s => s === curr.score + opp.score) + 1);
            const scoreGroupDiff = Math.abs(scoreGroups.findIndex(s => s === curr.score) - scoreGroups.findIndex(s => s === opp.score));
            wt += scoreGroupDiff < 2 ? 5 / (2 * Math.log10(scoreGroupDiff + 2)) : 1 / Math.log10(scoreGroupDiff + 2);
            if (scoreGroupDiff === 1 && curr.hasOwnProperty('pairedUpDown') && curr.pairedUpDown === false && opp.hasOwnProperty('pairedUpDown') && opp.pairedUpDown === false) {
                wt += 1.1;
            }
            if (rated) {
                wt += (1 / 3) * (Math.log2(sorted.length) - Math.log2(sorted.findIndex(p => p.id === opp.id) + 1));
            }
            if ((curr.hasOwnProperty('receivedBye') && curr.receivedBye) || (opp.hasOwnProperty('receivedBye') && opp.receivedBye)) {
                wt *= 1.25;
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
        matches.push({
            round: round,
            match: match++,
            player1: playerArray.find(p => p.index === indexA).id,
            player2: playerArray.find(p => p.index === indexB).id
        });
    } while (playerCopy.length > blossomPairs.reduce((sum, idx) => idx === -1 ? sum + 1 : sum, 0));
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
