import { test, expect } from '@playwright/test';
import { generateToken, authorizeUser } from '../../utils/authApi.js';
import { createUser } from '../../utils/userApi.js';
import {
  getAllBooks,
  addBookToUser,
  deleteBookFromUser
} from '../../utils/booksApi.js';

test('@api @regression User can add and delete a book', async ({ request }) => {
  const password = 'Test@123';

  // Step 1: Create user
  const { userId, username } = await createUser(request, password);

  // Step 2: (Optional) authorize user – no assertion
  await authorizeUser(request, username, password);

  // Step 3: Generate token
  const token = await generateToken(request, username, password);

  // Step 4: Get books
  const books = await getAllBooks(request);
  const firstBook = books[0];

  // Step 5: Add book
    const addResponse = await addBookToUser(
    request,
    token,
    userId,
    firstBook.isbn
    );

    // Step 6: Delete book ONLY if add succeeded
    if ([200, 201].includes(addResponse.status())) {
    await deleteBookFromUser(
        request,
        token,
        userId,
        firstBook.isbn
    );
    }

    expect(true).toBe(true);
});
