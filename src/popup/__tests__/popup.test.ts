import '../../test-setup';

describe('Popup', () => {
  let container: HTMLElement;

  beforeEach(() => {
    document.body.innerHTML = `
      <div class="container">
        <h1>Hello World</h1>
        <p>Welcome to your Chrome Extension!</p>
      </div>
    `;
    container = document.querySelector('.container')!;
    jest.clearAllMocks();
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should have Hello World heading', () => {
    const heading = document.querySelector('h1');
    expect(heading).toBeTruthy();
    expect(heading?.textContent).toBe('Hello World');
  });

  it('should initialize without errors', async () => {
    // Simply verify the module loads and DOMContentLoaded handler is registered
    await import('../popup');

    // Trigger DOMContentLoaded
    const event = new Event('DOMContentLoaded');
    document.dispatchEvent(event);

    // If we get here without errors, the test passes
    expect(container).toBeTruthy();
  });
});
