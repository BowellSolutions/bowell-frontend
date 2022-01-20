import {rest, server} from "../__mocks__/testServer";
import {UserData} from "../../src/api/types";
import {AppState} from "../../src/redux/store";
import {storeMock} from "../__mocks__/storeMock";
import {
  getUser,
  checkAuth,
  loginUser,
  logoutUser,
  requestTokenRefresh,
  resetRegister
} from "../../src/redux/actions/auth";


const TIMEOUT_MS = 500;

async function wait(ms: number) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

const initialState = {
  auth: {
    isAuthenticated: false,
    loading: false,
    user: null,
    register_success: false,
  }
};

const mockedUser = {
  id: 2,
  username: 'test1',
  email: 'test1@gmail.com',
  first_name: 'te',
  last_name: 'st',
  last_login: null,
  is_active: true,
  is_staff: false,
  is_superuser: false,
  type: "PATIENT",
  date_joined: null,
};

describe('Test auth action creators', () => {
  it('should login user - dispatch 4 success actions', async () => {
    const store = storeMock(initialState as AppState);

    server.use(
      rest.post('http://127.0.0.1:8000/api/auth/token/', ((req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({token: 'abcd', refresh: 'efgh'})
        );
      })),
      rest.get('http://127.0.0.1:8000/api/users/me/', (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json(mockedUser)
        );
      })
    );

    await store.dispatch<any>(loginUser({email: "test", password: "test"}));
    // wait 1s so that inner api call has time to execute
    await wait(TIMEOUT_MS);
    const actions = store.getActions();


    // after moving to async thunks, testing becomes problematic because of extra objects
    expect(actions).toEqual([
        {type: 'auth/setAuthLoading', payload: undefined},
        {type: 'auth/loginSuccess', payload: undefined},
        {type: 'auth/removeAuthLoading', payload: undefined},
        {type: 'auth/loadUserSuccess', payload: mockedUser}
      ]
    );
  });

  xit('should fail user login - dispatch fail actions', async () => {
    const store = storeMock(initialState as AppState);

    server.use(rest.post(
      'http://127.0.0.1:8000/api/auth/token/',
      ((req, res, ctx) => {
        return res(
          ctx.status(400),
          ctx.json({detail: ''})
        );
      }))
    );

    await store.dispatch<any>(loginUser({email: "test", password: "test"}));
    await wait(TIMEOUT_MS);
    const actions = store.getActions();

    expect(actions).toEqual([
        {type: 'auth/setAuthLoading', payload: undefined},
        {type: 'auth/loginFail', payload: undefined},
        {type: 'auth/removeAuthLoading', payload: undefined}
      ]
    );
  });

  it('should load user', async () => {
    const store = storeMock(initialState as AppState);

    server.use(
      rest.get('http://127.0.0.1:8000/api/users/me/', (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json(mockedUser)
        );
      })
    );

    await store.dispatch<any>(getUser(undefined));
    await wait(TIMEOUT_MS);
    const actions = store.getActions();
    expect(actions).toEqual([{type: 'auth/loadUserSuccess', payload: mockedUser}]);
  });

  it('should fail user load', async () => {
    const store = storeMock(initialState as AppState);

    server.use(rest.get(
      'http://127.0.0.1:8000/api/users/me/',
      (req, res, ctx) => {
        return res(
          ctx.status(400),
          ctx.json({'detail': ''})
        );
      })
    );

    await store.dispatch<any>(getUser(undefined));
    await wait(TIMEOUT_MS);
    const actions = store.getActions();
    expect(actions).toEqual([{type: 'auth/loadUserFail', payload: undefined}]);
  });

  it('should reset register success', async () => {
    const store = storeMock(initialState as AppState);
    await store.dispatch<any>(resetRegister());
    const actions = store.getActions();
    expect(actions).toEqual([{type: 'auth/resetRegisterSuccess', payload: undefined}]);
  });

  it('should refresh token', async () => {
    const mockedState = {
      auth: {
        user: {} as UserData,
        isAuthenticated: true,
        loading: false,
        register_success: false
      }
    };
    const store = storeMock(mockedState as AppState);

    server.use(rest.post(
      'http://127.0.0.1:8000/api/auth/token/refresh/',
      (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({token: ''})
        );
      })
    );

    server.use(rest.post(
      'http://127.0.0.1:8000/api/auth/token/verify/',
      (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({})
        );
      })
    );

    await store.dispatch<any>(requestTokenRefresh());
    await wait(TIMEOUT_MS);
    const actions = store.getActions();
    expect(actions).toEqual([
        {type: 'auth/refreshSuccess', payload: undefined},
        {type: 'auth/authSuccess', payload: undefined},
      ]
    );
  });

  it('should fail refresh token', async () => {
    const store = storeMock(initialState as AppState);

    server.use(rest.post(
      'http://127.0.0.1:8000/api/auth/token/refresh/',
      (req, res, ctx) => {
        return res(
          ctx.status(400),
          ctx.json({message: ''})
        );
      })
    );

    await store.dispatch<any>(requestTokenRefresh());
    await wait(TIMEOUT_MS);
    const actions = store.getActions();
    expect(actions).toEqual([{type: 'auth/refreshFail', payload: undefined}]);
  });

  it('should check auth status success', async () => {
    const store = storeMock(initialState as AppState);

    server.use(rest.post(
      'http://127.0.0.1:8000/api/auth/token/verify/',
      (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({})
        );
      })
    );

    server.use(rest.get(
      'http://127.0.0.1:8000/api/users/me/',
      (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json(mockedUser)
        );
      })
    );

    await store.dispatch<any>(checkAuth(undefined));
    await wait(TIMEOUT_MS);
    const actions = store.getActions();
    expect(actions).toEqual([
      {type: 'auth/authSuccess', payload: undefined},
      {type: 'auth/loadUserSuccess', payload: mockedUser}]);
  });

  it('should check auth status without refetching user', async () => {
    const mockedState = {
      auth: {
        user: {} as UserData,
        isAuthenticated: true,
        loading: false,
        register_success: false
      }
    };
    const store = storeMock(mockedState as AppState);

    server.use(rest.post(
      'http://127.0.0.1:8000/api/auth/token/verify/',
      (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({token: ''})
        );
      })
    );

    await store.dispatch<any>(checkAuth(undefined));
    await wait(TIMEOUT_MS);
    const actions = store.getActions();
    expect(actions).toEqual([{type: 'auth/authSuccess', payload: undefined}]);
  });

  it('should check auth status and fail', async () => {
    const store = storeMock(initialState as AppState);

    server.use(rest.post(
      'http://127.0.0.1:8000/api/auth/token/verify/',
      (req, res, ctx) => {
        return res(
          ctx.status(400),
          ctx.json({detail: ''})
        );
      })
    );

    await store.dispatch<any>(checkAuth(undefined));
    await wait(TIMEOUT_MS);
    const actions = store.getActions();
    expect(actions).toEqual([{type: 'auth/authFail', payload: undefined}]);
  });

  it('should logout user', async () => {
    const store = storeMock(initialState as AppState);

    server.use(rest.get(
      'http://127.0.0.1:8000/api/auth/logout/',
      (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({message: ''})
        );
      })
    );

    await store.dispatch<any>(logoutUser());
    await wait(TIMEOUT_MS);
    const actions = store.getActions();
    expect(actions).toEqual([
        {type: 'auth/logoutSuccess', payload: undefined},
        {type: 'dashboard/clearDashboardData', payload: undefined}
      ]
    );
  });

  it('should fail user logout', async () => {
    const store = storeMock(initialState as AppState);

    server.use(rest.get(
      'http://127.0.0.1:8000/api/auth/logout/',
      (req, res, ctx) => {
        return res(
          ctx.status(400),
          ctx.json({message: ''})
        );
      })
    );

    await store.dispatch<any>(logoutUser());
    await wait(TIMEOUT_MS);
    const actions = store.getActions();
    expect(actions).toEqual([{type: 'auth/logoutFail', payload: undefined}]);
  });
});
