import { expect } from '@playwright/test';

export async function createUser(request, username, password) {
  const response = await request.post('/Account/v1/User', {
    data: {
      userName: username,
      password: password
    }
  });

  expect(response.status()).toBe(201);

  const body = await response.json();
  expect(body.userID).toBeTruthy();

  return body.userID;
}
