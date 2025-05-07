# Contributing to Vercel Teamless Deploy

Thank you for your interest in contributing to this project! This document provides guidelines and instructions for contributing.

## Development Setup

1. Fork and clone the repository
2. Create a new branch for your changes
3. Make your changes
4. Test your changes using the test workflow
5. Submit a pull request

## Testing

The action can be tested locally using the provided test workflow:

```bash
# Run the test workflow locally
act -j test-action
```

Make sure to set up the following secrets for testing:
- `TEST_VERCEL_TOKEN`: A valid Vercel token for testing

## Pull Request Process

1. Update the README.md with details of changes if applicable
2. Update the examples if you're adding new features
3. Add or update tests as needed
4. Ensure the test workflow passes
5. Update documentation

## Code Style

- Follow existing code style and formatting
- Use descriptive variable names
- Add comments for complex logic
- Keep the code simple and maintainable

## License

By contributing, you agree that your contributions will be licensed under the MIT License.