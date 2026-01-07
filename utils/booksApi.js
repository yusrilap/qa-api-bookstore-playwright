import { expect } from '@playwright/test';

export async function getAllBooks(request) {
    const response = await request.get('/BookStore/v1/Books');

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.books.length).toBeGreaterThan(0);

    return body.books;
}

export async function addBookToUser(request, token, userId, isbn) {
    const response = await request.post('/BookStore/v1/Books', {
        header: {
            Authorization: `Bearer ${token}`
        },
        data: {
            userId,
            collectionOfIsbns: [{ isbn }]
        }
    });

    expect(response.status()).toBe(201);
    return response;
}

export async function deleteBookFromUser(request, token, userId, isbn) {
    const response = await request.delete('/BookStore/v1/Book', {
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: {
            userId,
            isbn
        }
    });

    expect(response.status()).toBe(204);
    return response;
}