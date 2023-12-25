import {renderHook} from '@testing-library/react-hooks'
import { useNowTime } from './useNowTime'

//mock netinfo
jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  fetch: jest.fn(),
}))

// mock appstate
jest.mock('react-native/Libraries/AppState/AppState', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  fetch: jest.fn(),
}))

jest.setTimeout(10000)

describe('hooks/useNowTime', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    jest.clearAllMocks()
  })
    it('should return a date', () => {
        const  now = renderHook(() => useNowTime(1))
        expect(now.result.current).toBeInstanceOf(Date)
    })
    it('if I wait 1 second, it should return a date 1 second later', async () => {
        const now1 = renderHook(() => useNowTime(1))
        const nowTime1 = now1.result.current

        jest.advanceTimersByTime(2000)
        now1.rerender()
        const nowTime2 = now1.result.current
        const diff = nowTime2.getTime() - nowTime1.getTime()
        expect(diff).toBe(2000)
    })
})