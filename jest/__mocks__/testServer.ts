import {rest} from 'msw';
import {setupServer} from "msw/node";

const server = setupServer();

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

export {server, rest};
