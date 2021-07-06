import React from 'react';
import mockData from './mockData';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';


beforeEach(() => {
  fetchMock.once(
    [
      JSON.stringify(mockData)
    ],
  )
})

describe('<App/> test',()=>{
  it("should render <App /> component", async () => {
    render(<App />);
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
    expect(screen.getByText(/My Todo List/i)).toBeInTheDocument();
  });

  it('should add a new todo correctly',async ()=>{
    fetchMock.once(JSON.stringify({
      userId:2,
      id: new Date().getTime().toString(),
      title:'cooking',
      completed:false
    }));

    render(<App/>);
    await waitForElementToBeRemoved(() => screen.getByText('Loading...'));
    userEvent.type(screen.getByRole('textbox'),'cooking');
    userEvent.click(screen.getByText('Add new todo'));
    await waitForElementToBeRemoved(() => screen.getByText('Saving...'));
    expect(screen.getByText('cooking')).toBeInTheDocument();
  });

  it("remove todo from list", async () => {
    render(<App />);
    await waitForElementToBeRemoved(() => screen.getByText('Loading...'));
    userEvent.click(screen.getByTestId('closeBtn-3'));
    expect(screen.queryByText(/Take out the trash/i)).not.toBeInTheDocument();
  });

  it("todo item should be crossed out after completing", async () => {
    render(<App />);
    await waitForElementToBeRemoved(() => screen.getByText('Loading...'));
    userEvent.click(screen.getByTestId('checkbox-2'));
    expect(screen.getByText('Do laundry')).toHaveClass('completed');
  });


})