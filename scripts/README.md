# Scripts

## `generate.sh`
Generates routes, controller, service and tests for endpoints in `src/[name]` and mounts the routes in `src/routes.ts`.

### Usage
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

The script accepts multiple inputs:
```
npm run generate example1 example2 example3
```

### Caveats
**Dashes** [#5](https://github.com/eremt/starter-ts/issues/5)

The script doesn't support dashes yet.

**Grammar** [#4](https://github.com/eremt/starter-ts/issues/4)

For simplicity the script expects the name to be in singular form. Some nouns will have to be manually fixed: battery will become battery**s** while it should be batter**ies**. Until there's a fix the easiest solution is to combine `find` and `sed`. Omit the first letter to catch both capitalized and lowercase matches.

To fix batterys to the correct form batteries run:
```
find src/routes.ts src/battery -type f | xargs sed -i 's/atterys/atteries/g'
```
