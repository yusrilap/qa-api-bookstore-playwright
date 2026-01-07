import { test, expect } from '@playwright/test';
import { generateToken, authorizeUser } from '../../utils/authApi.js';
import { users } from '../../test-data/users.js';

test('@api @smoke Generate token with valid credentials', async ({ request }) => {
  const token = await generateToken(
    request,
    users.valid.username,
    users.valid.password
  );

  expect(token).toBeTruthy();
});

test('@api @regression Authorize user with valid credentials', async ({ request }) => {
  const authorized = await authorizeUser(
    request,
    users.valid.username,
    users.valid.password
  );

  expect(authorized).toBe(true);
});

test('@api @regression Reject invalid login credentials', async ({ request }) => {
  const response = await request.post('/Account/v1/GenerateToken', {
    data: {
      userName: users.invalid.username,
      password: users.invalid.password
    }
  });

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.status).toBe('Failed');
  expect(body.token).toBe(null);
});
