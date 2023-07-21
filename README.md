# PulseGuard
Monitor Your Server with Tracing   

### Installation
  

1. Install dependencies: `pnpm install`

2. Run migrations: `pnpm exec prisma migrate dev`

3. Start the server: `pnpm dev`

4. Run Jaeger: `docker compose up -d`

5. Test out the example endpoint: [http://localhost:4001/users/random](http://localhost:4001/users/random)

6. Access Jaeger: [http://localhost:16686](http://localhost:16686)