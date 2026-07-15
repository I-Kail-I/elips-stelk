describe('axiosInstance', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  it('uses default API prefix when env not set', async () => {
    delete process.env.NEXT_PUBLIC_API_PREFIX;
    const { axiosInstance } = await import('./axios');
    expect(axiosInstance.defaults.baseURL).toBe('/api');
    expect(axiosInstance.defaults.withCredentials).toBe(true);
  });

  it('uses custom API prefix from env', async () => {
    process.env.NEXT_PUBLIC_API_PREFIX = 'https://api.example.com';
    const { axiosInstance } = await import('./axios');
    expect(axiosInstance.defaults.baseURL).toBe('https://api.example.com');
  });

  it('has JSON content type', async () => {
    const { axiosInstance } = await import('./axios');
    expect(axiosInstance.defaults.headers.Accept).toBe('application/json');
  });
});
