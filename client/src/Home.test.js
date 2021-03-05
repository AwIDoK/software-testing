import { render, screen } from '@testing-library/react';
import Home from './Home';

test('home page renders new todo list part', () => {
  render(<Home />);
  const linkElement = screen.getByText(/new todo list/i);
  expect(linkElement).toBeInTheDocument();
});

test('home page renders elements from api', async () => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    status: 200,
    json: jest.fn().mockResolvedValue(
      [
          {
            list_id: 6,
            name: "aaa"
          },
          {
            list_id: 7,
            name: "bbb"
          },
          {
            list_id: 9,
            name: "ccc"
          }
        ]
    )
  })
  render(<Home />);

  const linkElement = await screen.findByText(/aaa/i);
  expect(linkElement).toBeInTheDocument();
  jest.restoreAllMocks();
});
