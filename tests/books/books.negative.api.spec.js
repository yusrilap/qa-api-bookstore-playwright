import { test, expect } from '@playwright/test';

test('@api @regression Cannot add book with invalid token', async ({ request }) => {
  const response = await request.post('/BookStore/v1/Books', {
    headers: {
      Authorization: 'Bearer invalidtoken'
    },
    data: {
      userId: 'invalid-user',
      collectionOfIsbns: [{ isbn: '9781449325862' }]
    },
    timeout: 5000 // ⬅️ IMPORTANT
  });

  expect([401, 403]).toContain(response.status());
});
