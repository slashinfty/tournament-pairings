export interface Match {
    round: Number,
    match: Number,
    player1: String | Number | null,
    player2: String | Number | null,
    win?: {
        round: Number,
        match: Number
    },
    loss?: {
        round: Number,
        match: Number
    }
}