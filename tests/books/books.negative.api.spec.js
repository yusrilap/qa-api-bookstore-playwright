import { test, expect } from '@playwright/test';
import { users } from '../../test-data/users.js';

test('@api @regression Cannot add book with invalid token', async ({ request }) => {
  const response = await request.post('/BookStore/v1/Books', {
    headers: {
      Authorization: 'Bearer invalidtoken'
    },
    data: {
      userId: users.valid.userId,
      collectionOfIsbns: [{ isbn: '9781449325862' }]
    }
  });

  expect(response.status()).toBe(401);
});
