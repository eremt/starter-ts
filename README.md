# starter-ts
TypeScript starter project.

## Getting started
Clone the repository:
```
git clone https://github.com/eremt/starter-ts.git
```

### Generate endpoints
The project includes a script to generate CRUD endpoints with tests and OpenAPI documentation.

To generate an endpoint run:
```
npm run generate example
```

This will create these new files:
```
src
└── example
    ├── example.controller.ts
    ├── example.routes.ts
    ├── example.service.spec.ts
    └── example.service.ts
```

And insert the following lines near the end of `/src/routes.ts`:
```
import exampleRoutes from './example/example.routes'
router.use('/examples', exampleRoutes)
```

## Development
Start the development environment:
```
npm run dev
```

## Test
Run the tests:
```
npm run test
```

## License
[MIT](LICENSE)
