import { Match } from 'Match';

interface Player {
    id: String | Number,
    score: Number,
    avoid?: (String | Number)[],
    rating?: Number | null
}

export function Swiss(players: Player[], rated: Boolean = false) : Match[] {

}
