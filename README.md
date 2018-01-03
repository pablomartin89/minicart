### Styleguide

https://vtex.github.io/styleguide

### Setup

```sh
yarn install
```

### Developing using Styleguidist

```sh
yarn styleguide
```

### Developing using another project

Run this in this repo:
```sh
yarn develop
```

In your project run:
```
npm link @vtex/styleguide
```
Import (case a `<Button>` component in lib):
```
import Button from '@vtex/styleguide/lib/Button'
```

### Publishing to npm

```sh
npm publish
```

### Publishing Styleguide page

```sh
yarn deploy
```
