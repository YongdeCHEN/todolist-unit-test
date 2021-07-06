import React from 'react';
import ListItem from './ListItem';
import mockData from '../../mockData';
import { render, screen } from '@testing-library/react';




describe('<ListItem /> tests', () => {
    it('should render todo item properly', () => {
      render(<ListItem todo={mockData[0]} />);
      expect(screen.getByText('Eat breakfast')).toBeInTheDocument();
      expect(screen.getByTestId('checkbox-1')).toBeInTheDocument();
      expect(screen.getByTestId('closeBtn-1')).toBeInTheDocument();
    });
  });
 