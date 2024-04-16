export const ArrayBoard = new Array(9).fill(null)


export const InitialTurn={
    O:'O',
    X:'X',
  } as const //Para asegurar que el objeto sea pasado como es, y no como cadena de texto


export const WinnerCombination = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
] as const
   

export const WinnerPossible = {
    O:'O',
    X:'X',
    Draw:'Draw'
} as const



export type typeTurn = keyof typeof InitialTurn // Clave Typo del valor InitialTurn   
export type typesBoard = typeTurn | null //Union de tipados
export type typesWinner =  keyof typeof WinnerPossible | null
export type ArrayGame = Array<typesBoard>
