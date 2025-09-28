import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PageHeader } from '../page-header';

describe('PageHeader', () => {
  it('renders the title and description', () => {
    render(<PageHeader title="Test Title" description="Supporting copy" />);

    expect(screen.getByRole('heading', { level: 1, name: 'Test Title' })).toBeInTheDocument();
    expect(screen.getByText('Supporting copy')).toBeInTheDocument();
  });

  it('omits the paragraph when description is not provided', () => {
    render(<PageHeader title="Only Title" />);

    expect(screen.queryByText('Supporting copy')).not.toBeInTheDocument();
  });
});
