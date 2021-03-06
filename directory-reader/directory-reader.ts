import fs from 'fs'

export class DirectoryReader {

    getPathsFromDirectory(path: string) {
        const paths = []
            const fileList = fs.readdirSync(path)
            fileList.forEach((fileName: string) => {
                paths.push(`${path}/${fileName}`)
            })
            return paths
    }
}