export interface Match {
    round: number,
    match: number,
    player1: string | number | null,
    player2: string | number | null,
    win?: {
        round: number,
        match: number
    },
    loss?: {
        round: number,
        match: number
    }
}