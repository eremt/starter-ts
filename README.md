# starter-ts
TypeScript starter project.

## Getting started
Clone the repository:
```
git clone https://github.com/eremt/starter-ts.git
```

Copy `.env.example` to create `.env`:
```
cp .env.example .env
```

### Generate endpoints
The project includes a script to generate CRUD endpoints with tests and OpenAPI documentation.

To generate the files run:
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

For more information see [/scripts/README](https://github.com/eremt/starter-ts/tree/master/scripts#generatesh)

## Development
Start the development environment:
```
docker compose up
```

This will start the project on [localhost:5000](http://localhost:5000) with OpenAPI documentation available on [localhost:5000/docs](http://localhost:5000/docs).

## Test
Run the tests:
```
npm run test
```

## License
[MIT](LICENSE)
