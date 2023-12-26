import * as u from './useCurrentRange'

describe('hooks/useCurrentRange/calculate', () => {

    describe('hoursInAdvance', () => {
        it('should return a date in the future', () => {
        const now = new Date('2020-01-01T00:00:00.000Z')
        const expected = new Date('2020-01-01T01:00:00.000Z')
        const actual = u.calculate.hoursInAdvance(now, 1)
        expect(actual).toEqual(expected)
        })
    })
    
    describe('hoursInPast', () => {
        it('should return a date in the past', () => {
        const now = new Date('2020-01-01T00:00:00.000Z')
        const expected = new Date('2019-12-31T23:00:00.000Z')
        const actual = u.calculate.hoursInPast(now, 1)
        expect(actual).toEqual(expected)
        })
    })
})

//mock useNearest30Minutes
const mockUseNearest30Minutes = jest.fn()

jest.mock('./useNearest30Minutes', () => ({
    useNearest30Minutes: (x: any) => mockUseNearest30Minutes(x)
}))

describe('hooks/useCurrentRange', () => {

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('should return a from and to date', () => {
        mockUseNearest30Minutes.mockReturnValue(new Date('2020-01-01T00:00:00.000Z'))
        const expected = {
            from: '2019-12-31T23:00:00.000Z',
            to: '2020-01-01T01:00:00.000Z',
        }
        const actual = u.useCurrentRange({
            hoursInAdvance: 1,
            hoursInPast: 1,
        })
        expect(actual).toEqual(expected)
    })
})