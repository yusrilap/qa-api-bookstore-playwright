import { expect } from '@playwright/test';

export async function createUser(request, password) {
  const uniqueUsername = `user_${Date.now()}`;

  const response = await request.post('/Account/v1/User', {
    data: {
      userName: uniqueUsername,
      password
    }
  });

  expect([201, 406]).toContain(response.status());

  const body = await response.json();

  if (response.status() === 201) {
    expect(body.userID).toBeTruthy();
    return { userId: body.userID, username: uniqueUsername };
  }

  throw new Error('User creation failed with 406 – retry test');
}
