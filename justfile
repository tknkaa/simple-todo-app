hello:
 echo "Hello, World!"

format:
 bunx prettier . --write

install:
 bun install
 just install-client
 just install-server

install-client:
 cd client && bun install

install-server:
 cd server && bun install

start-client:
 cd client && bun run dev

start-server:
 cd server && bun run index.ts

dev:
 trap 'kill 0' EXIT; (just start-server) & (just start-client) & wait