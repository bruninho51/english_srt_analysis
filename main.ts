import path from 'path'
import { WordCounter } from './english-analysis/word-counter'
import { DirectoryReader } from './directory-reader/directory-reader'
import { EnglishSrtAnalisys } from './english-analysis/english-srt-analisys'

const directoryReader = new DirectoryReader()

try {
    const srtFiles = directoryReader.getPathsFromDirectory(path.join(__dirname, 'subtitles'))
    if (srtFiles.length === 0) console.info("\x1b[33m", 'Info: subtitles folder is empty. Please, put srt files in that folder!')
    const englishSrtAnalisys = new EnglishSrtAnalisys(new WordCounter())
    Promise.all(srtFiles.map(path => englishSrtAnalisys.run(path))).then(() => {
    const accumulator = englishSrtAnalisys.wordCounter.orderBy(WordCounter.OrderBy.DESC).accumulator
    const topThirty = accumulator.words.slice(0, 30)
    const result = []
    topThirty.forEach((wordData: WordCounter.WordCount) => {
        result.push({ word: wordData.word, occurrences: wordData.count, percent: (wordData.count / accumulator.total * 100).toFixed(2) + '%' })
    })
    console.table(result)
})
} catch (err) {
    console.error("\x1b[31m", err.message)
}
