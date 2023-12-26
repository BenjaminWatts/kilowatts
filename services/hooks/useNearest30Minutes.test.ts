import * as u from './useNearest30Minutes'

describe('useNearest30Minutes/roundToClosestHalfHour', () => {

    it('should round down to the nearest half hour', () => {
        const date = new Date('2020-01-01T00:14:00.000Z')
        const expected = new Date('2020-01-01T00:00:00.000Z')
        const actual = u.roundToClosestHalfHour(date)
        expect(actual).toEqual(expected)
    })

    it('should round up to the nearest half hour', () => {
        const date = new Date('2020-01-01T00:16:00.000Z')
        const expected = new Date('2020-01-01T00:30:00.000Z')
        const actual = u.roundToClosestHalfHour(date)
        expect(actual).toEqual(expected)
    })

    it('should round up to the nearest hour', () => {
        const date = new Date('2020-01-01T00:46:00.000Z')
        const expected = new Date('2020-01-01T01:00:00.000Z')
        const actual = u.roundToClosestHalfHour(date)
        expect(actual).toEqual(expected)
    })
})