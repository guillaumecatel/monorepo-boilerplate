# typescript-config

Shared Typescript configurations for the monorepo.

## Installation

This is an internal workspace dev package. Install it in your workspace packages:

```json
{
  "devDependencies": {
    "typescript-config": "workspace:*"
  }
}
```

## Usage

### In Typescript projects

```json
// tsconfig.json
{
  "extends": "typescript-config/base.json"
}
```

### In React projects

```json
// tsconfig.json
{
  "extends": "typescript-config/react.json"
}
```

## Project Structure

```text
typescript-config/
├── base.json           # Base typescript configuration
├── react.json          # Extended base configuration with React JSX support
├── package.json
├── CHANGELOG.md
├── LICENCE.md
└── README.md
```

## Versioning

This package follows semantic versioning. Check `CHANGELOG.md` for release notes.

## License

MIT
