import { test, expect } from '@playwright/test';

test.describe.parallel('API Testing', () => {
    const baseURL = 'https://reqres.in/api';

    test('Simple API test - Assert response status', async ({ request }) => {
        const response = await request.get(`${baseURL}/users/2`);
        expect(response.status()).toBe(200);

        const responseBody = JSON.parse(await response.text());
    });

    test('Simple API test - Assert invalid endpoint', async ({ request }) => {
        const response = await request.get(`${baseURL}/users/blablabla`);
        expect(response.status()).toBe(404);
    });

    test('GET request - get user detail', async ({ request }) => {
        const response = await request.get(`${baseURL}/users/1`);
        const responseBody = JSON.parse(await response.text());

        expect(response.status()).toBe(200);
        expect(responseBody.data.id).toBe(1);
        expect(responseBody.data.first_name).toBe('George');
        expect(responseBody.data.last_name).toBe('Bluth');
        expect(responseBody.data.email).toBeTruthy();
    });

    test('POST request - create new user', async ({ request }) => {
        const response = await request.post(`${baseURL}/users`, {
            data: {
                name: 'pes duke',
                job: 'qwerty',
                id: 1000,
            },
        });

        const responseBody = JSON.parse(await response.text());
        expect(responseBody.id).toBe(1000);
        expect(responseBody.createdAt).toBeTruthy;
        expect(responseBody.name).toEqual('pes duke');
        // console.log(responseBody);
    });

    test('POST request - Login', async ({ request }) => {
        const response = await request.post(`${baseURL}/login`, {
            data: {
                email: 'eve.holt@reqres.in',
                password: 'cityslicka',
            },
        });

        const responseBody = JSON.parse(await response.text());
        expect(response.status()).toBe(200);
        expect(responseBody.token).toBeTruthy();
    });

    test('POST request - Login Failed', async ({ request }) => {
        const response = await request.post(`${baseURL}/login`, {
            data: {
                email: 'peter@klaven',
            },
        });

        const responseBody = JSON.parse(await response.text());
        expect(response.status()).toBe(400);
        expect(responseBody.error).toBe('Missing password');
    });

    test('PUT request - update user', async ({ request }) => {
        const response = await request.put(`${baseURL}/users/2`, {
            data: {
                name: 'pes duke',
                job: 'agressor',
            },
        });

        const responseBody = JSON.parse(await response.text());
        expect(response.status()).toBe(200);
        expect(responseBody.name).toBe('pes duke'); 
        expect(responseBody.job).toBe('agressor');        
        expect(responseBody.updatedAt).toBeTruthy();

    })

    test('DELETE request - deleting user', async ({ request }) => {
        const response = await request.delete(`${baseURL}/users/2`)
        expect(response.status()).toBe(204);

    })
});
