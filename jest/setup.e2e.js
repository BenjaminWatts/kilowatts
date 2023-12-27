const log = {
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
  debug: jest.fn(),
};

jest.mock('../services/log', () => {
  return {
    __esModule: true,
    default: log,
    log: log,
  };
});
