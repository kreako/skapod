// Row height in "symbolic" form
export class RowHeight {
  // number of clip in this row
  clip: number
  // number of group header (expanded group) in this row
  groupHeader: number

  constructor(clip: number, groupHeader: number) {
    this.clip = clip
    this.groupHeader = groupHeader
  }

  max = (other: RowHeight): RowHeight => {
    if (other.groupHeader > this.groupHeader) {
      return other
    } else if (other.clip > this.clip) {
      return other
    } else {
      return this
    }
  }

  add = (other: RowHeight): RowHeight => {
    this.clip += other.clip
    this.groupHeader += other.groupHeader
    return this
  }

  static null = (): RowHeight => new RowHeight(0, 0)

  static clipHeight = (): RowHeight => new RowHeight(1, 0)
}
