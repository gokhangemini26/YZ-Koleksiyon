# apps/worker/Dockerfile (Production)
FROM python:3.10-slim

WORKDIR /app

# Copy Requirements
COPY apps/worker/requirements.txt .

# Install Dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy Source
COPY apps/worker .

# Command
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
