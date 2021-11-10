# Usage

## With the Dockerfile

Step 1 - Build the project inside a Docker Image

```bash
docker build -t jokr-front-img .
```

Step 2 - Run the previous image mapping ports 3000

```bash
docker run -rm -p 3000:3000 jokr-front-img
```

On changes repeat the 1st and 2nd Step