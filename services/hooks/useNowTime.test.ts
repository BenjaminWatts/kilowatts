import {renderHook, act} from '@testing-library/react-hooks'
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

describe('hooks/useNowTime', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    jest.clearAllMocks()
  })
    it('should return a date', () => {
        const now = renderHook(() => useNowTime(1))
        expect(now.result.current).toBeInstanceOf(Date)
    })
    it('should return a date that is updated every second', () => {
        const now = renderHook(() => useNowTime(1))
        const firstDate = now.result.current
        act(() => {
          jest.advanceTimersByTime(1000)
        })
        expect(now.result.current).not.toBe(firstDate)
    })
})