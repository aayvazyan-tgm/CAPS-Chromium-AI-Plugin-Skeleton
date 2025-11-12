// Mock Chrome API for testing
global.chrome = {
  runtime: {
    onInstalled: {
      addListener: jest.fn(),
    },
    onMessage: {
      addListener: jest.fn(),
    },
    getURL: jest.fn((path) => `chrome-extension://test-id/${path}`),
  },
  storage: {
    sync: {
      get: jest.fn((keys, callback) => {
        callback({ enableFeature: true });
      }),
      set: jest.fn(),
    },
  },
  tabs: {
    create: jest.fn(),
  },
} as any;
