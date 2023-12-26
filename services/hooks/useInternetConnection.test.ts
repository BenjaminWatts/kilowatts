import {useInternetConnection} from './useInternetConnection'

const mockFn = jest.fn()
//mock NetInfo
jest.mock('@react-native-community/netinfo', () => ({
  useNetInfo: () => mockFn()
}))

describe('useInternetConnection', () => {
    it('should return true when NetInfo.isConnected is true', () => {
        mockFn.mockReturnValue({isConnected: true})
        expect(useInternetConnection()).toBe(true)
    })
    it('should return false when NetInfo.isConnected is false', () => {
        mockFn.mockReturnValue({isConnected: false})
        expect(useInternetConnection()).toBe(false)
    })
    it('should return null when NetInfo.isConnected is null', () => {
        mockFn.mockReturnValue({isConnected: null})
        expect(useInternetConnection()).toBe(null)
    })
    }
)