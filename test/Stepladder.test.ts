import { expect } from 'chai';
import { Stepladder } from '../src/Stepladder';

describe('Stepladder', () => {
    it('5 players', () => {
        expect(Stepladder(5)).to.include.deep.members([
            {
                round: 1,
                match: 1,
                player1: 4,
                player2: 5,
                win: { round: 2, match: 1 }
            },
            {
                round: 2,
                match: 1,
                player1: 3,
                player2: null,
                win: { round: 3, match: 1 }
            },
            {
                round: 3,
                match: 1,
                player1: 2,
                player2: null,
                win: { round: 4, match: 1 }
            },
            {
                round: 4,
                match: 1,
                player1: 1,
                player2: null
            }
        ]);
    });
});