import { expect } from 'chai';
import { RoundRobin } from '../src/RoundRobin';

describe('Round-Robin', () => {
    it('4 ordered players', () => {
        expect(RoundRobin(['A', 'B', 'C', 'D'], true)).to.include.deep.members([
            { round: 1, match: 1, player1: 'A', player2: 'D' },
            { round: 1, match: 2, player1: 'B', player2: 'C' },
            { round: 2, match: 1, player1: 'D', player2: 'C' },
            { round: 2, match: 2, player1: 'A', player2: 'B' },
            { round: 3, match: 1, player1: 'B', player2: 'D' },
            { round: 3, match: 2, player1: 'C', player2: 'A' }
        ]);
    });

    it('5 players', () => {
        expect(RoundRobin(5)).to.include.deep.members([
            { round: 1, match: 1, player1: 1, player2: null },
            { round: 1, match: 2, player1: 2, player2: 5 },
            { round: 1, match: 3, player1: 3, player2: 4 },
            { round: 2, match: 1, player1: null, player2: 4 },
            { round: 2, match: 2, player1: 5, player2: 3 },
            { round: 2, match: 3, player1: 1, player2: 2 },
            { round: 3, match: 1, player1: 2, player2: null },
            { round: 3, match: 2, player1: 3, player2: 1 },
            { round: 3, match: 3, player1: 4, player2: 5 },
            { round: 4, match: 1, player1: null, player2: 5 },
            { round: 4, match: 2, player1: 1, player2: 4 },
            { round: 4, match: 3, player1: 2, player2: 3 },
            { round: 5, match: 1, player1: 3, player2: null },
            { round: 5, match: 2, player1: 4, player2: 2 },
            { round: 5, match: 3, player1: 5, player2: 1 }
        ]);
    });

    it('6 players', () => {
        expect(RoundRobin(6)).to.include.deep.members([
            { round: 1, match: 1, player1: 1, player2: 6 },
            { round: 1, match: 2, player1: 2, player2: 5 },
            { round: 1, match: 3, player1: 3, player2: 4 },
            { round: 2, match: 1, player1: 6, player2: 4 },
            { round: 2, match: 2, player1: 5, player2: 3 },
            { round: 2, match: 3, player1: 1, player2: 2 },
            { round: 3, match: 1, player1: 2, player2: 6 },
            { round: 3, match: 2, player1: 3, player2: 1 },
            { round: 3, match: 3, player1: 4, player2: 5 },
            { round: 4, match: 1, player1: 6, player2: 5 },
            { round: 4, match: 2, player1: 1, player2: 4 },
            { round: 4, match: 3, player1: 2, player2: 3 },
            { round: 5, match: 1, player1: 3, player2: 6 },
            { round: 5, match: 2, player1: 4, player2: 2 },
            { round: 5, match: 3, player1: 5, player2: 1 }
        ]);
    });
});