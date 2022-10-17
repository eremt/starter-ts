#!/bin/bash
#
# Generate routes, controllers, and services with a given name
#
# TODO:
# - create help function
# - import and mount src/$NAME/$NAME.routes.ts in src/routes.ts

if [ -z $1 ]; then
  echo "No arguments"
  exit 1
fi

NAME=$1
NAME_CAPITALIZED=${NAME^} # used to replace Example

DIR=src/$NAME

echo mkdir "$DIR"
mkdir "$DIR"
echo

# Disable shellcheck rule since file names aren't going to contain spaces
# shellcheck disable=2045
for FILE in $(ls .skeleton/example); do
  NEW_FILENAME=$(echo "$FILE" | sed "s|example|${NAME}|g")
  echo cp "$FILE" to "$DIR/$NEW_FILENAME"
  cp .skeleton/example/"$FILE" "$DIR/$NEW_FILENAME"
done
echo

# shellcheck disable=2045
for FILE in $(ls "$DIR"); do
  echo Replace instances of Skeleton/skeleton in "$DIR/$FILE"
  sed -i "s|skeleton|$NAME|g" "$DIR/$FILE"
  sed -i "s|Skeleton|$NAME_CAPITALIZED|g" "$DIR/$FILE"
done
echo

echo "Importing and mounting routes in src/routes.ts"
ROUTES="$(echo $NAME_CAPITALIZED)Routes"
LINE_IMPORT="import $ROUTES from './$NAME/$NAME.routes'"
LINE_MOUNT="router.use('/$(echo $NAME)s', $ROUTES)\n"

sed -i "$(wc -l < src/routes.ts)i $LINE_IMPORT" src/routes.ts
sed -i "$(wc -l < src/routes.ts)i $LINE_MOUNT" src/routes.ts
