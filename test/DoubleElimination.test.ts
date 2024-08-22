import { expect } from 'chai';
import { DoubleElimination } from '../src/DoubleElimination';

describe('Double Elimination', () => {
    it('8 ordered players', () => {
        expect(DoubleElimination(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'], 1, true)).to.include.deep.members([
            {
                round: 1,
                match: 1,
                player1: 'A',
                player2: 'H',
                win: { round: 2, match: 1 },
                loss: { round: 5, match: 1 }
            },
            {
                round: 1,
                match: 2,
                player1: 'D',
                player2: 'E',
                win: { round: 2, match: 1 },
                loss: { round: 5, match: 1 }
            },
            {
                round: 1,
                match: 3,
                player1: 'B',
                player2: 'G',
                win: { round: 2, match: 2 },
                loss: { round: 5, match: 2 }
            },
            {
                round: 1,
                match: 4,
                player1: 'C',
                player2: 'F',
                win: { round: 2, match: 2 },
                loss: { round: 5, match: 2 }
            },
            {
                round: 2,
                match: 1,
                player1: null,
                player2: null,
                win: { round: 3, match: 1 },
                loss: { round: 6, match: 2 }
            },
            {
                round: 2,
                match: 2,
                player1: null,
                player2: null,
                win: { round: 3, match: 1 },
                loss: { round: 6, match: 1 }
            },
            {
                round: 3,
                match: 1,
                player1: null,
                player2: null,
                win: { round: 4, match: 1 },
                loss: { round: 8, match: 1 }
            },
            { round: 4, match: 1, player1: null, player2: null },
            {
                round: 5,
                match: 1,
                player1: null,
                player2: null,
                win: { round: 6, match: 1 }
            },
            {
                round: 5,
                match: 2,
                player1: null,
                player2: null,
                win: { round: 6, match: 2 }
            },
            {
                round: 6,
                match: 1,
                player1: null,
                player2: null,
                win: { round: 7, match: 1 }
            },
            {
                round: 6,
                match: 2,
                player1: null,
                player2: null,
                win: { round: 7, match: 1 }
            },
            {
                round: 7,
                match: 1,
                player1: null,
                player2: null,
                win: { round: 8, match: 1 }
            },
            {
                round: 8,
                match: 1,
                player1: null,
                player2: null,
                win: { round: 4, match: 1 }
            }
          ]
          );
    });

    it('14 players', () => {
        expect(DoubleElimination(14)).to.include.deep.members([
            {
                round: 1,
                match: 1,
                player1: 8,
                player2: 9,
                win: { round: 2, match: 1 },
                loss: { round: 7, match: 1 }
            },
            {
                round: 1,
                match: 2,
                player1: 4,
                player2: 13,
                win: { round: 2, match: 2 },
                loss: { round: 6, match: 1 }
            },
            {
                round: 1,
                match: 3,
                player1: 5,
                player2: 12,
                win: { round: 2, match: 2 },
                loss: { round: 6, match: 1 }
            },
            {
                round: 1,
                match: 4,
                player1: 7,
                player2: 10,
                win: { round: 2, match: 3 },
                loss: { round: 7, match: 3 }
            },
            {
                round: 1,
                match: 5,
                player1: 3,
                player2: 14,
                win: { round: 2, match: 4 },
                loss: { round: 6, match: 2 }
            },
            {
                round: 1,
                match: 6,
                player1: 6,
                player2: 11,
                win: { round: 2, match: 4 },
                loss: { round: 6, match: 2 }
            },
            {
                round: 2,
                match: 1,
                player1: 1,
                player2: null,
                win: { round: 3, match: 1 },
                loss: { round: 7, match: 4 }
            },
            {
                round: 2,
                match: 2,
                player1: null,
                player2: null,
                win: { round: 3, match: 1 },
                loss: { round: 7, match: 3 }
            },
            {
                round: 2,
                match: 3,
                player1: 2,
                player2: null,
                win: { round: 3, match: 2 },
                loss: { round: 7, match: 2 }
            },
            {
                round: 2,
                match: 4,
                player1: null,
                player2: null,
                win: { round: 3, match: 2 },
                loss: { round: 7, match: 1 }
            },
            {
                round: 3,
                match: 1,
                player1: null,
                player2: null,
                win: { round: 4, match: 1 },
                loss: { round: 9, match: 1 }
            },
            {
                round: 3,
                match: 2,
                player1: null,
                player2: null,
                win: { round: 4, match: 1 },
                loss: { round: 9, match: 2 }
            },
            {
                round: 4,
                match: 1,
                player1: null,
                player2: null,
                win: { round: 5, match: 1 },
                loss: { round: 11, match: 1 }
            },
            { round: 5, match: 1, player1: null, player2: null },
            {
                round: 6,
                match: 1,
                player1: null,
                player2: null,
                win: { round: 7, match: 2 }
            },
            {
                round: 6,
                match: 2,
                player1: null,
                player2: null,
                win: { round: 7, match: 4 }
            },
            {
                round: 7,
                match: 1,
                player1: null,
                player2: null,
                win: { round: 8, match: 1 }
            },
            {
                round: 7,
                match: 2,
                player1: null,
                player2: null,
                win: { round: 8, match: 1 }
            },
            {
                round: 7,
                match: 3,
                player1: null,
                player2: null,
                win: { round: 8, match: 2 }
            },
            {
                round: 7,
                match: 4,
                player1: null,
                player2: null,
                win: { round: 8, match: 2 }
            },
            {
                round: 8,
                match: 1,
                player1: null,
                player2: null,
                win: { round: 9, match: 1 }
            },
            {
                round: 8,
                match: 2,
                player1: null,
                player2: null,
                win: { round: 9, match: 2 }
            },
            {
                round: 9,
                match: 1,
                player1: null,
                player2: null,
                win: { round: 10, match: 1 }
            },
            {
                round: 9,
                match: 2,
                player1: null,
                player2: null,
                win: { round: 10, match: 1 }
            },
            {
                round: 10,
                match: 1,
                player1: null,
                player2: null,
                win: { round: 11, match: 1 }
            },
            {
                round: 11,
                match: 1,
                player1: null,
                player2: null,
                win: { round: 5, match: 1 }
            }
        ]);
    });

    it('16 players', () => {
        expect(DoubleElimination(16)).to.include.deep.members([
            {
                round: 1,
                match: 1,
                player1: 1,
                player2: 16,
                win: { round: 2, match: 1 },
                loss: { round: 6, match: 1 }
            },
            {
                round: 1,
                match: 2,
                player1: 8,
                player2: 9,
                win: { round: 2, match: 1 },
                loss: { round: 6, match: 1 }
            },
            {
                round: 1,
                match: 3,
                player1: 4,
                player2: 13,
                win: { round: 2, match: 2 },
                loss: { round: 6, match: 2 }
            },
            {
                round: 1,
                match: 4,
                player1: 5,
                player2: 12,
                win: { round: 2, match: 2 },
                loss: { round: 6, match: 2 }
            },
            {
                round: 1,
                match: 5,
                player1: 2,
                player2: 15,
                win: { round: 2, match: 3 },
                loss: { round: 6, match: 3 }
            },
            {
                round: 1,
                match: 6,
                player1: 7,
                player2: 10,
                win: { round: 2, match: 3 },
                loss: { round: 6, match: 3 }
            },
            {
                round: 1,
                match: 7,
                player1: 3,
                player2: 14,
                win: { round: 2, match: 4 },
                loss: { round: 6, match: 4 }
            },
            {
                round: 1,
                match: 8,
                player1: 6,
                player2: 11,
                win: { round: 2, match: 4 },
                loss: { round: 6, match: 4 }
            },
            {
                round: 2,
                match: 1,
                player1: null,
                player2: null,
                win: { round: 3, match: 1 },
                loss: { round: 7, match: 4 }
            },
            {
                round: 2,
                match: 2,
                player1: null,
                player2: null,
                win: { round: 3, match: 1 },
                loss: { round: 7, match: 3 }
            },
            {
                round: 2,
                match: 3,
                player1: null,
                player2: null,
                win: { round: 3, match: 2 },
                loss: { round: 7, match: 2 }
            },
            {
                round: 2,
                match: 4,
                player1: null,
                player2: null,
                win: { round: 3, match: 2 },
                loss: { round: 7, match: 1 }
            },
            {
                round: 3,
                match: 1,
                player1: null,
                player2: null,
                win: { round: 4, match: 1 },
                loss: { round: 9, match: 1 }
            },
            {
                round: 3,
                match: 2,
                player1: null,
                player2: null,
                win: { round: 4, match: 1 },
                loss: { round: 9, match: 2 }
            },
            {
                round: 4,
                match: 1,
                player1: null,
                player2: null,
                win: { round: 5, match: 1 },
                loss: { round: 11, match: 1 }
            },
            { round: 5, match: 1, player1: null, player2: null },
            {
                round: 6,
                match: 1,
                player1: null,
                player2: null,
                win: { round: 7, match: 1 }
            },
            {
                round: 6,
                match: 2,
                player1: null,
                player2: null,
                win: { round: 7, match: 2 }
            },
            {
                round: 6,
                match: 3,
                player1: null,
                player2: null,
                win: { round: 7, match: 3 }
            },
            {
                round: 6,
                match: 4,
                player1: null,
                player2: null,
                win: { round: 7, match: 4 }
            },
            {
                round: 7,
                match: 1,
                player1: null,
                player2: null,
                win: { round: 8, match: 1 }
            },
            {
                round: 7,
                match: 2,
                player1: null,
                player2: null,
                win: { round: 8, match: 1 }
            },
            {
                round: 7,
                match: 3,
                player1: null,
                player2: null,
                win: { round: 8, match: 2 }
            },
            {
                round: 7,
                match: 4,
                player1: null,
                player2: null,
                win: { round: 8, match: 2 }
            },
            {
                round: 8,
                match: 1,
                player1: null,
                player2: null,
                win: { round: 9, match: 1 }
            },
            {
                round: 8,
                match: 2,
                player1: null,
                player2: null,
                win: { round: 9, match: 2 }
            },
            {
                round: 9,
                match: 1,
                player1: null,
                player2: null,
                win: { round: 10, match: 1 }
            },
            {
                round: 9,
                match: 2,
                player1: null,
                player2: null,
                win: { round: 10, match: 1 }
            },
            {
                round: 10,
                match: 1,
                player1: null,
                player2: null,
                win: { round: 11, match: 1 }
            },
            {
                round: 11,
                match: 1,
                player1: null,
                player2: null,
                win: { round: 5, match: 1 }
            }
        ]);
    });

    it('19 players', () => {
        expect(DoubleElimination(19)).to.include.deep.members([
            {
                round: 1,
                match: 1,
                player1: 16,
                player2: 17,
                win: { round: 2, match: 1 },
                loss: { round: 7, match: 1 }
            },
            {
                round: 1,
                match: 2,
                player1: 15,
                player2: 18,
                win: { round: 2, match: 5 },
                loss: { round: 7, match: 2 }
            },
            {
                round: 1,
                match: 3,
                player1: 14,
                player2: 19,
                win: { round: 2, match: 7 },
                loss: { round: 7, match: 3 }
            },
            {
                round: 2,
                match: 1,
                player1: 1,
                player2: null,
                win: { round: 3, match: 1 },
                loss: { round: 8, match: 4 }
            },
            {
                round: 2,
                match: 2,
                player1: 8,
                player2: 9,
                win: { round: 3, match: 1 },
                loss: { round: 7, match: 3 }
            },
            {
                round: 2,
                match: 3,
                player1: 4,
                player2: 13,
                win: { round: 3, match: 2 },
                loss: { round: 8, match: 3 }
            },
            {
                round: 2,
                match: 4,
                player1: 5,
                player2: 12,
                win: { round: 3, match: 2 },
                loss: { round: 7, match: 2 }
            },
            {
                round: 2,
                match: 5,
                player1: 2,
                player2: null,
                win: { round: 3, match: 3 },
                loss: { round: 8, match: 2 }
            },
            {
                round: 2,
                match: 6,
                player1: 7,
                player2: 10,
                win: { round: 3, match: 3 },
                loss: { round: 8, match: 2 }
            },
            {
                round: 2,
                match: 7,
                player1: 3,
                player2: null,
                win: { round: 3, match: 4 },
                loss: { round: 8, match: 1 }
            },
            {
                round: 2,
                match: 8,
                player1: 6,
                player2: 11,
                win: { round: 3, match: 4 },
                loss: { round: 7, match: 1 }
            },
            {
                round: 3,
                match: 1,
                player1: null,
                player2: null,
                win: { round: 4, match: 1 },
                loss: { round: 9, match: 2 }
            },
            {
                round: 3,
                match: 2,
                player1: null,
                player2: null,
                win: { round: 4, match: 1 },
                loss: { round: 9, match: 1 }
            },
            {
                round: 3,
                match: 3,
                player1: null,
                player2: null,
                win: { round: 4, match: 2 },
                loss: { round: 9, match: 4 }
            },
            {
                round: 3,
                match: 4,
                player1: null,
                player2: null,
                win: { round: 4, match: 2 },
                loss: { round: 9, match: 3 }
            },
            {
                round: 4,
                match: 1,
                player1: null,
                player2: null,
                win: { round: 5, match: 1 },
                loss: { round: 11, match: 2 }
            },
            {
                round: 4,
                match: 2,
                player1: null,
                player2: null,
                win: { round: 5, match: 1 },
                loss: { round: 11, match: 1 }
            },
            {
                round: 5,
                match: 1,
                player1: null,
                player2: null,
                win: { round: 6, match: 1 },
                loss: { round: 13, match: 1 }
            },
            { round: 6, match: 1, player1: null, player2: null },
            {
                round: 7,
                match: 1,
                player1: null,
                player2: null,
                win: { round: 8, match: 1 }
            },
            {
                round: 7,
                match: 2,
                player1: null,
                player2: null,
                win: { round: 8, match: 3 }
            },
            {
                round: 7,
                match: 3,
                player1: null,
                player2: null,
                win: { round: 8, match: 4 }
            },
            {
                round: 8,
                match: 1,
                player1: null,
                player2: null,
                win: { round: 9, match: 1 }
            },
            {
                round: 8,
                match: 2,
                player1: null,
                player2: null,
                win: { round: 9, match: 2 }
            },
            {
                round: 8,
                match: 3,
                player1: null,
                player2: null,
                win: { round: 9, match: 3 }
            },
            {
                round: 8,
                match: 4,
                player1: null,
                player2: null,
                win: { round: 9, match: 4 }
            },
            {
                round: 9,
                match: 1,
                player1: null,
                player2: null,
                win: { round: 10, match: 1 }
            },
            {
                round: 9,
                match: 2,
                player1: null,
                player2: null,
                win: { round: 10, match: 1 }
            },
            {
                round: 9,
                match: 3,
                player1: null,
                player2: null,
                win: { round: 10, match: 2 }
            },
            {
                round: 9,
                match: 4,
                player1: null,
                player2: null,
                win: { round: 10, match: 2 }
            },
            {
                round: 10,
                match: 1,
                player1: null,
                player2: null,
                win: { round: 11, match: 1 }
            },
            {
                round: 10,
                match: 2,
                player1: null,
                player2: null,
                win: { round: 11, match: 2 }
            },
            {
                round: 11,
                match: 1,
                player1: null,
                player2: null,
                win: { round: 12, match: 1 }
            },
            {
                round: 11,
                match: 2,
                player1: null,
                player2: null,
                win: { round: 12, match: 1 }
            },
            {
                round: 12,
                match: 1,
                player1: null,
                player2: null,
                win: { round: 13, match: 1 }
            },
            {
                round: 13,
                match: 1,
                player1: null,
                player2: null,
                win: { round: 6, match: 1 }
            }
        ]);
    })
});