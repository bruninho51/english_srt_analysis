import { SrtSegment } from "./srt-segment"
import { SrtSegmentCondition } from "./srt-segment-condition"

export class SrtReadingControl {
    private _segment: SrtSegment = SrtSegment.SEGMENT_SEPARATOR
    private _identifier: number = null

    public getSegment(srtLine: string): SrtSegment {
        const conditions: SrtSegmentCondition[] = [{
            segment: SrtSegment.IDENTIFIER,
            satisfied: srtLine && this._segment === SrtSegment.SEGMENT_SEPARATOR
        }, {
            segment: SrtSegment.DISPLAY_TIME_RANGE,
            satisfied: this._segment === SrtSegment.IDENTIFIER
        }, {
            segment: SrtSegment.SUBTITLE,
            satisfied: this._segment === SrtSegment.DISPLAY_TIME_RANGE || (srtLine && this._segment === SrtSegment.SUBTITLE)
        }, {
            segment: SrtSegment.SEGMENT_SEPARATOR,
            satisfied: !srtLine
        }]

        this._segment = conditions.find(condition => condition.satisfied).segment

        if (this._segment === SrtSegment.IDENTIFIER)
            this._identifier = Number(srtLine.trim())

        if (this._segment === SrtSegment.SEGMENT_SEPARATOR)
            this._identifier = null

        return this._segment
    }

    public get currentSegment (): SrtSegment {
        return this._segment
    }

    public get identifier (): number {
        return this.identifier
    }
}
