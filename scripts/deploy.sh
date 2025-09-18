#!/bin/bash

# Recipe Finder Deployment Script

set -e

echo "🚀 Starting Recipe Finder deployment..."

# Variables
IMAGE_NAME="recipe-finder"
CONTAINER_NAME="recipe-finder-app"
PORT="3000"

# Build Docker image
echo "📦 Building Docker image..."
docker build -t $IMAGE_NAME:latest .

# Stop existing container if running
echo "🛑 Stopping existing container..."
docker stop $CONTAINER_NAME 2>/dev/null || true
docker rm $CONTAINER_NAME 2>/dev/null || true

# Run new container
echo "🏃 Starting new container..."
docker run -d \
  --name $CONTAINER_NAME \
  -p $PORT:80 \
  --restart unless-stopped \
  $IMAGE_NAME:latest

# Wait for container to be ready
echo "⏳ Waiting for container to be ready..."
sleep 10

# Health check
echo "🔍 Performing health check..."
if curl -f http://localhost:$PORT > /dev/null 2>&1; then
    echo "✅ Deployment successful! App is running on http://localhost:$PORT"
else
    echo "❌ Deployment failed! Health check failed."
    docker logs $CONTAINER_NAME
    exit 1
fi

echo "🎉 Deployment completed successfully!"
