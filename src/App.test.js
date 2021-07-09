import React from 'react';
import { render, screen, fireEvent, waitFor, act, } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockAdapter from 'axios-mock-adapter';
import Http from './utils/Http';
import App from './App';



// global.fetch = jest.fn(() =>
//   Promise.resolve({
//     json: () => Promise.resolve({ rates: { CAD: 1.42 } }),
//   })
// );

// beforeEach(() => {
//     fetch.mockClear();
// });


const mockData = [
    {
        'userId':1,
        'id': 1,
        'title': 'delectus aut autem',
        'completed': false
    },
    {
        'userId': 1,
        'id': 2,
        'title': 'quis ut nam facilis et officia qui',
        'completed': false
    },
    {
        'userId': 1,
        'id': 3,
        'title': 'cde',
        'completed': false
    }
];

jest.spyOn(window, 'alert').mockImplementation(() => {});

beforeEach(() => {
    // here need to mock axios instance (axios.create)
    const mock = new MockAdapter(Http);
    mock.onGet('/todos').reply(200, mockData);
});

describe('components', () => {
    describe('App', () => {
        it('can render', () => {
            render(<App />);
            expect(screen.queryByText('My todo list')).toBeInTheDocument();
        });

        it('can display todolist when the page was loaded', async () => {
            render(<App />);

            await waitFor(() => {
                expect(screen.queryByText(mockData[0].title)).toBeInTheDocument();
                fireEvent.click(screen.queryByTestId(`closeBtn-${mockData[0].id}`));
                expect(screen.queryByText(mockData[0].title)).not.toBeInTheDocument();
                fireEvent.click(screen.queryByTestId(`checkbox-${mockData[1].id}`));
                expect(screen.queryByText(mockData[1].title).className).toBe('completed');
                fireEvent.click(screen.queryByTestId(`labelOfCheckbox-${mockData[1].id}`));
                expect(screen.queryByText(mockData[1].title).className).not.toBe('completed');
            });
            // expect(fetch).toHaveBeenCalledTimes(1);
        });

        it('cannot add a new todo item to todolist when the input title is empty', async () => {
            render(<App />);

            await waitFor(() => {
                fireEvent.click(screen.queryByTestId('addNewTodoButton'));
                expect(window.alert).toHaveBeenCalled();
            });

        });

        it('can display the response error when adding a new todo item whose input title is not empty to todolist', async () => {
            render(<App />);

            const mock = new MockAdapter(Http);
            const mockPostData = {
                newTodo: {
                    completed: false,
                    id: '1625799318098',
                    title: 'abc',
                    userId: 2,
                },
            };
            mock.onPost('/todos').reply(400, mockPostData);

            const newTodoName = 'abc';

            fireEvent.change(
                screen.queryByLabelText('Title:'),
                { target: { value: newTodoName } },
            );

            fireEvent.click(screen.queryByTestId('addNewTodoButton'));
            await waitFor(() => {
                expect(screen.queryByText('Request failed with status code 400')).toBeInTheDocument();
            })
        });

        it('can add a new todo item to todolist when the input title is not empty', async () => {
            render(<App />);

            const mock = new MockAdapter(Http);
            const mockPostData = {
                newTodo: {
                    completed: false,
                    id: '1625799318098',
                    title: 'abc',
                    userId: 2,
                },
            };
            mock.onPost('/todos').reply(200, mockPostData);

            const newTodoName = 'abc';
            fireEvent.change(
                screen.queryByLabelText('Title:'),
                { target: { value: newTodoName } },
            );

            fireEvent.click(screen.queryByTestId('addNewTodoButton'));
            await waitFor(() => {
                expect(screen.queryByText(newTodoName)).toBeInTheDocument();
            })
        });
    });
});
