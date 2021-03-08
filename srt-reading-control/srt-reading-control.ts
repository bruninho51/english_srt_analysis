import { SrtSegment } from "./srt-segment"
import { SrtSegmentCondition } from "./srt-segment-condition"

export class SrtReadingControl {
    private segment: SrtSegment = SrtSegment.SEGMENT_SEPARATOR
    private identifier: number = null

    public getSegment(srtLine: string): SrtSegment {
        const conditions: SrtSegmentCondition[] = [{
            segment: SrtSegment.IDENTIFIER,
            satisfied: srtLine && this.segment === SrtSegment.SEGMENT_SEPARATOR
        }, {
            segment: SrtSegment.DISPLAY_TIME_RANGE,
            satisfied: this.segment === SrtSegment.IDENTIFIER
        }, {
            segment: SrtSegment.SUBTITLE,
            satisfied: this.segment === SrtSegment.DISPLAY_TIME_RANGE || (srtLine && this.segment === SrtSegment.SUBTITLE)
        }, {
            segment: SrtSegment.SEGMENT_SEPARATOR,
            satisfied: !srtLine
        }]

        this.segment = conditions.find(condition => condition.satisfied).segment

        if (this.segment === SrtSegment.IDENTIFIER)
            this.identifier = Number(srtLine.trim())

        if (this.segment === SrtSegment.SEGMENT_SEPARATOR)
            this.identifier = null

        return this.segment
    }   
}
