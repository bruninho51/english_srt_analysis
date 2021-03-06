export class Text {
    constructor(private _text: string) {}

    public removeSpecialCharacters(): Text {
        const regex = /[`~!@#$%^&*()_|+\-=?;:",.<>\{\}\[\]\\\/]/gi
        this._text = this._text.replace(regex, '')
        return this
    }

    public removeTags(): Text {
        const regex = /(<([^>]+)>)/ig
        this._text = this._text.replace(regex, '')
        return this
    }

    public trim(): Text {
        this._text = this._text.trim()
        return this
    }

    public get text(): string {
        return this._text
    }
}
