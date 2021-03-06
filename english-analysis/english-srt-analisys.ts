import fs from 'fs'
import readline from 'readline'
import { WordCounter } from "./word-counter";
import { SrtReadingControl } from '../srt-reading-control/srt-reading-control';
import { SrtSegment } from '../srt-reading-control/srt-segment';
import { Text } from '../text/text';

export class EnglishSrtAnalisys {
    constructor(private readonly _wordCounter: WordCounter) {}

    public async run(path: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const readable = fs.createReadStream(path)
            const rl = readline.createInterface({
                input: readable
            })
            const srtReadingControl = new SrtReadingControl()
            rl.on('line', line => {
                const textLine = new Text(line)
                const segment = srtReadingControl.getSegment(textLine.text)
                if (segment === SrtSegment.SUBTITLE) {
                    const cleanText = textLine.removeSpecialCharacters().removeTags().trim().text
                    this._wordCounter.countFromString(cleanText)
                }
            })
            rl.on('close', () => {
                resolve(true)
            })
        })
    }

    public get wordCounter(): WordCounter {
        return this._wordCounter
    }
}