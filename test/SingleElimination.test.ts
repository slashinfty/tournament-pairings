import { expect } from 'chai';
import { SingleElimination } from '../src/SingleElimination';

describe('Single Elimination', () => {
    it('8 players with consolation', () => {
        expect(SingleElimination(8, 1, true)).to.include.deep.members([
            {
                round: 1,
                match: 1,
                player1: 1,
                player2: 8,
                win: { round: 2, match: 1 }
            },
            {
                round: 1,
                match: 2,
                player1: 4,
                player2: 5,
                win: { round: 2, match: 1 }
            },
            {
                round: 1,
                match: 3,
                player1: 2,
                player2: 7,
                win: { round: 2, match: 2 }
            },
            {
                round: 1,
                match: 4,
                player1: 3,
                player2: 6,
                win: { round: 2, match: 2 }
            },
            {
                round: 2,
                match: 1,
                player1: null,
                player2: null,
                win: { round: 3, match: 1 },
                loss: { round: 3, match: 2 }
            },
            {
                round: 2,
                match: 2,
                player1: null,
                player2: null,
                win: { round: 3, match: 1 },
                loss: { round: 3, match: 2 }
            },
            { round: 3, match: 1, player1: null, player2: null },
            { round: 3, match: 2, player1: null, player2: null }
        ]);
    });

    it('8 ordered players', () => {
        expect(SingleElimination(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'], 1, false, true)).to.include.deep.members([
            {
                round: 1,
                match: 1,
                player1: 'A',
                player2: 'H',
                win: { round: 2, match: 1 }
            },
            {
                round: 1,
                match: 2,
                player1: 'D',
                player2: 'E',
                win: { round: 2, match: 1 }
            },
            {
                round: 1,
                match: 3,
                player1: 'B',
                player2: 'G',
                win: { round: 2, match: 2 }
            },
            {
                round: 1,
                match: 4,
                player1: 'C',
                player2: 'F',
                win: { round: 2, match: 2 }
            },
            {
                round: 2,
                match: 1,
                player1: null,
                player2: null,
                win: { round: 3, match: 1 }
            },
            {
                round: 2,
                match: 2,
                player1: null,
                player2: null,
                win: { round: 3, match: 1 }
            },
            { round: 3, match: 1, player1: null, player2: null }
        ]);
    });

    it('11 players', () => {
        expect(SingleElimination(11)).to.include.deep.members([
            {
                round: 1,
                match: 1,
                player1: 9,
                player2: 8,
                win: { round: 2, match: 1 }
            },
            {
                round: 1,
                match: 2,
                player1: 10,
                player2: 7,
                win: { round: 2, match: 3 }
            },
            {
                round: 1,
                match: 3,
                player1: 11,
                player2: 6,
                win: { round: 2, match: 4 }
            },
            {
                round: 2,
                match: 1,
                player1: 1,
                player2: null,
                win: { round: 3, match: 1 }
            },
            {
                round: 2,
                match: 2,
                player1: 4,
                player2: 5,
                win: { round: 3, match: 1 }
            },
            {
                round: 2,
                match: 3,
                player1: 2,
                player2: null,
                win: { round: 3, match: 2 }
            },
            {
                round: 2,
                match: 4,
                player1: 3,
                player2: null,
                win: { round: 3, match: 2 }
            },
            {
                round: 3,
                match: 1,
                player1: null,
                player2: null,
                win: { round: 4, match: 1 }
            },
            {
                round: 3,
                match: 2,
                player1: null,
                player2: null,
                win: { round: 4, match: 1 }
            },
            { round: 4, match: 1, player1: null, player2: null }
        ]);
    });

    it('15 players', () => {
        expect(SingleElimination(15)).to.include.deep.members([
            {
                round: 1,
                match: 1,
                player1: 9,
                player2: 8,
                win: { round: 2, match: 1 }
            },
            {
                round: 1,
                match: 2,
                player1: 10,
                player2: 7,
                win: { round: 2, match: 3 }
            },
            {
                round: 1,
                match: 3,
                player1: 11,
                player2: 6,
                win: { round: 2, match: 4 }
            },
            {
                round: 1,
                match: 4,
                player1: 12,
                player2: 5,
                win: { round: 2, match: 2 }
            },
            {
                round: 1,
                match: 5,
                player1: 13,
                player2: 4,
                win: { round: 2, match: 2 }
            },
            {
                round: 1,
                match: 6,
                player1: 14,
                player2: 3,
                win: { round: 2, match: 4 }
            },
            {
                round: 1,
                match: 7,
                player1: 15,
                player2: 2,
                win: { round: 2, match: 3 }
            },
            {
                round: 2,
                match: 1,
                player1: 1,
                player2: null,
                win: { round: 3, match: 1 }
            },
            {
                round: 2,
                match: 2,
                player1: null,
                player2: null,
                win: { round: 3, match: 1 }
            },
            {
                round: 2,
                match: 3,
                player1: null,
                player2: null,
                win: { round: 3, match: 2 }
            },
            {
                round: 2,
                match: 4,
                player1: null,
                player2: null,
                win: { round: 3, match: 2 }
            },
            {
                round: 3,
                match: 1,
                player1: null,
                player2: null,
                win: { round: 4, match: 1 }
            },
            {
                round: 3,
                match: 2,
                player1: null,
                player2: null,
                win: { round: 4, match: 1 }
            },
            { round: 4, match: 1, player1: null, player2: null }
        ]);
    });
});