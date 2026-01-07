import { expect } from '@playwright/test';

export async function generateToken(request, username, password) {
  const response = await request.post('/Account/v1/GenerateToken', {
    data: {
      userName: username,
      password: password
    }
  });

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.token).toBeTruthy();

  return body.token;
}

export async function authorizeUser(request, username, password) {
  const response = await request.post('/Account/v1/Authorized', {
    data: {
      userName: username,
      password: password
    }
  });

  return response.status();
}
