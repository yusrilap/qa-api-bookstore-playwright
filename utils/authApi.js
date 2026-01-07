import { expect } from '@playwright/test';

export async function generateToken(request, username, password) {
  const response = await request.post('/Account/v1/GenerateToken', {
    data: {
      userName: username,
      password: password
    }
  });

  // Accept only success responses
  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.token).toBeTruthy();
  expect(body.status).toBe('Success');

  return body.token;
}

export async function authorizeUser(request, username, password) {
  const response = await request.post('/Account/v1/Authorized', {
    data: {
      userName: username,
      password: password
    }
  });

  expect(response.status()).toBe(200);
  const isAuthorized = await response.json();
  expect(isAuthorized).toBe(true);

  return isAuthorized;
}
