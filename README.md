# Usage

## For Development

```bash
# Install dependencies
npm install
```

```bash
# Build Next.js code
npm run build
```

```bash
# If using a mockup endpoint. run the following command in a different terminal
npm run serve
```

```bash
# Run the development server
npm run dev
```

```bash
# Run the tests
npm run test
```

## With only the Docker Compose

```bash
# Run everything skiping tests
docker-compose -f docker-compose.dev.yml up
```

```bash
# Run everything with tests
docker-compose -f docker-compose.testing.yml up
```

## With the Dockerfile

Step 1 - Build the project inside a Docker Image

```bash
docker build -t jokr-front-img .
```

Step 2 - Run the previous image mapping ports 3000

```bash
docker run --rm -p 3000:3000 jokr-front-img
```

On changes repeat the 1st and 2nd Step
