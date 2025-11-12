import '../../test-setup';

describe('Background Service Worker', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  it('should register onInstalled listener', async () => {
    await import('../background');

    expect(chrome.runtime.onInstalled.addListener).toHaveBeenCalled();
  });

  it('should set default settings on install', async () => {
    await import('../background');

    const addListenerMock = chrome.runtime.onInstalled.addListener as jest.Mock;
    expect(addListenerMock).toHaveBeenCalled();

    const listener = addListenerMock.mock.calls[0][0];
    listener({ reason: 'install' });

    expect(chrome.storage.sync.set).toHaveBeenCalledWith({
      enableFeature: true,
    });
  });

  it('should handle update events without errors', async () => {
    await import('../background');

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
