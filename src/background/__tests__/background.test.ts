import '../../test-setup';

describe('Background Service Worker', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  it('should register onInstalled listener', () => {
    require('../background');

    expect(chrome.runtime.onInstalled.addListener).toHaveBeenCalled();
  });

  it('should set default settings on install', () => {
    require('../background');

    const addListenerMock = chrome.runtime.onInstalled.addListener as jest.Mock;
    expect(addListenerMock).toHaveBeenCalled();

    const listener = addListenerMock.mock.calls[0][0];
    listener({ reason: 'install' });

    expect(chrome.storage.sync.set).toHaveBeenCalledWith({
      enableFeature: true,
    });
  });

  it('should handle update events without errors', () => {
    require('../background');

    const addListenerMock = chrome.runtime.onInstalled.addListener as jest.Mock;
    expect(addListenerMock).toHaveBeenCalled();

    const listener = addListenerMock.mock.calls[0][0];

    // Should not throw when update event is triggered
    expect(() => {
      listener({ reason: 'update' });
    }).not.toThrow();

    // Should not set storage on update
    expect(chrome.storage.sync.set).not.toHaveBeenCalled();
  });
});
