FROM python:3.12-slim

WORKDIR /app

COPY . .

EXPOSE 7800

CMD ["python", "-m", "http.server", "7800"]
