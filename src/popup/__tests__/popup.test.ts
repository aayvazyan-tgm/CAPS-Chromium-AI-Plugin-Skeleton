import '../../test-setup';

describe('Popup', () => {
  let container: HTMLElement;

  beforeEach(() => {
    document.body.innerHTML = `
      <div class="container">
        <button id="openConfig">Open Configuration</button>
      </div>
    `;
    container = document.querySelector('.container')!;
    jest.clearAllMocks();
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should have open config button', () => {
    const button = document.getElementById('openConfig');
    expect(button).toBeTruthy();
    expect(button?.textContent).toBe('Open Configuration');
  });

  it('should open config page when button clicked', async () => {
    await import('../popup');

    // Trigger DOMContentLoaded
    const event = new Event('DOMContentLoaded');
    document.dispatchEvent(event);

    const button = document.getElementById('openConfig');
    button?.click();

    expect(chrome.tabs.create).toHaveBeenCalledWith({
      url: 'chrome-extension://test-id/config/config.html',
    });
  });
});
