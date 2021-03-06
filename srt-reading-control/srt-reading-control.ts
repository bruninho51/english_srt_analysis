import { SrtSegment } from "./srt-segment"
import { SrtSegmentCondition } from "./srt-segment-condition"

export class SrtReadingControl {
    private segment: SrtSegment

    constructor () {
        this.segment = SrtSegment.SEGMENT_SEPARATOR
    }

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

        return this.segment
    }   
}
