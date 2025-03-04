import { expect } from 'chai';
import { Player, Swiss } from '../src/Swiss';

describe('Swiss', () => {
    it('9 players in round 1 yields 1 bye', () => {
        const players:Player[] = [
            {
                id: 'A',
                score: 0
            },
            {
                id: 'B',
                score: 0
            },
            {
                id: 'C',
                score: 0
            },
            {
                id: 'D',
                score: 0
            },
            {
                id: 'E',
                score: 0
            },
            {
                id: 'F',
                score: 0
            },
            {
                id: 'G',
                score: 0
            },
            {
                id: 'H',
                score: 0
            },
            {
                id: 'I',
                score: 0
            }
        ];
        expect(Swiss(players, 1).filter(match => match.player2 === null).length).to.equal(1);
    });

    it('10 players in round 2 with no draws yields 1 pair up/down', () => {
        const players = [
            {
                id: 'A',
                score: 1
            },
            {
                id: 'B',
                score: 1
            },
            {
                id: 'C',
                score: 1
            },
            {
                id: 'D',
                score: 1
            },
            {
                id: 'E',
                score: 1
            },
            {
                id: 'F',
                score: 0
            },
            {
                id: 'G',
                score: 0
            },
            {
                id: 'H',
                score: 0
            },
            {
                id: 'I',
                score: 0
            },
            {
                id: 'J',
                score: 0
            }
        ];
        expect(Swiss(players, 2).reduce((count, match) => {
            const p1 = players.find(p => p.id === match.player1);
            const p2 = players.find(p => p.id === match.player2);
            if (p1 !== undefined && p2 !== undefined) {
                return p1.score === p2.score ? count : count + 1;
            } else {
                return count;
            }
        }, 0)).to.equal(1);
    });
});