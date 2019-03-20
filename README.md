# 🦄 Angular/WASM Game of Life

## Prerequisites

- [Rust Toolchain](https://rustup.rs/)
- [wasm-pack](https://rustwasm.github.io/wasm-pack/installer/)
- Node and NPM

## Build and Run

```sh
$ wasm-pack build
$ cd pkg && npm link
$ cd ../www/
$ npm install
$ npm link ng-game-of-life
$ npm start
```

## Resources

- [Rust WASM Book](https://rustwasm.github.io/docs/book/)

## License

MIT
