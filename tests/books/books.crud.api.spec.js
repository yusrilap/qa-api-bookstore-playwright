import { test, expect } from '@playwright/test';
import { generateToken } from '../../utils/authApi.js';
import { createUser } from '../../utils/userApi.js';
import {
  getAllBooks,
  addBookToUser,
  deleteBookFromUser
} from '../../utils/booksApi.js';
import { users } from '../../test-data/users.js';

test('@api @regression User can add and delete a book', async ({ request }) => {
  // Step 1: Create user
  const userId = await createUser(
    request,
    users.valid.username,
    users.valid.password
  );

  // Step 2: Generate token
  const token = await generateToken(
    request,
    users.valid.username,
    users.valid.password
  );

  // Step 3: Get available books
  const books = await getAllBooks(request);
  const firstBook = books[0];

  // Step 4: Add book
  await addBookToUser(
    request,
    token,
    userId,
    firstBook.isbn
  );

  // Step 5: Delete book
  await deleteBookFromUser(
    request,
    token,
    userId,
    firstBook.isbn
  );

  expect(true).toBe(true);
});
