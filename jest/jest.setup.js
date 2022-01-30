import "@testing-library/jest-dom";
import '@testing-library/jest-dom/extend-expect';

jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {
    API_URL: 'http://127.0.0.1:8000/api',
    API_ACCESS_TOKEN_LIFETIME: 3600,
  },
}));
