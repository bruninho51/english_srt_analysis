export class WordCounter {

    private _accumulator: WordCounter.Payload

    constructor() {
        this._accumulator = { words: [], total: 0 }
    }
    
    countFromString(text: string): WordCounter {
        text.split(' ').forEach(word => {

            const cleanWord = word.trim().toLowerCase().replace(/^\w/, (c) => c.toUpperCase())
    
            const foundWordData = this._accumulator.words.find((wordData: WordCounter.WordCount) => wordData.word === cleanWord)
            if (foundWordData) {
                foundWordData.count++
                this._accumulator.total++
                return
            }
    
            const wordData: WordCounter.WordCount = { word: cleanWord, count: 1 }
            this._accumulator.words.push(wordData)
            this._accumulator.total++
        })
        return this
    }

    public get accumulator(): WordCounter.Payload {
        return this._accumulator
    }

    public orderBy(type: WordCounter.OrderBy): WordCounter {

        const ordinators = {
            [WordCounter.OrderBy.ASC]: (a, b) => {
                return a.count - b.count
            },
            [WordCounter.OrderBy.DESC]: (a, b) => {
                return b.count - a.count
            }
        }
    
        this._accumulator.words.sort(ordinators[type])
        return this
    }
}

export namespace WordCounter {
    export type Payload = {
        words: WordCount[]
        total: number
    }

    export type WordCount = {
        word: string
        count: number
    }

    export enum OrderBy {
        ASC = 'asc',
        DESC = 'desc'
    }
    
}