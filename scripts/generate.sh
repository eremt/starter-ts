#!/bin/bash
#
# Generate routes, controllers, services and tests with a given name
#

help () {
  echo "Usage: npm run generate [NAME]..."
}

if [ $# -eq 0 ]; then
  # missing arguments
  help
  exit 1
fi

generate () {
  NAME=$1
  echo "Generating $NAME"

  TARGET_DIR="./src/$NAME"
  mkdir "$TARGET_DIR"

  # shellcheck disable=2045
  for FILE in $(ls .skeleton/example); do
    # shellcheck disable=2001
    FILENAME=$(echo "$FILE" | sed "s|skeleton|${NAME}|g")

    # Replace [S/s]keleton with [N/n]ame and output to $FILENAME
    sed "s|skeleton|${NAME}|g" ".skeleton/example/$FILE" | sed "s|Skeleton|${NAME^}|g" > "$TARGET_DIR/$FILENAME"
  done

  # import and mount routes in src/routes.ts
  LINE_IMPORT="import ${NAME^}Routes from './$NAME/$NAME.routes'"
  LINE_MOUNT="router.use('/${NAME}s',  ${NAME^}Routes)\n"
  sed -i "$(wc -l < src/routes.ts)i $LINE_IMPORT" src/routes.ts
  sed -i "$(wc -l < src/routes.ts)i $LINE_MOUNT" src/routes.ts

  echo -e "Done\n"
}

for NAME in "$@"; do
  generate "$NAME"
done

echo "Finished generating $*"

exit 0
