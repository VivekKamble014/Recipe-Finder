#!/bin/bash

echo "🐳 Recipe Finder - Jenkins Docker Setup"
echo "======================================"

echo "📋 Current Jenkins container status:"
docker ps | grep jenkins

echo ""
echo "🔧 Setting up Jenkins with Docker support..."
echo ""

# Stop current Jenkins container
echo "1. Stopping current Jenkins container..."
docker stop $(docker ps -q --filter "ancestor=jenkins/jenkins:lts") 2>/dev/null || echo "No Jenkins container running"

# Remove current Jenkins container
echo "2. Removing current Jenkins container..."
docker rm $(docker ps -aq --filter "ancestor=jenkins/jenkins:lts") 2>/dev/null || echo "No Jenkins container to remove"

# Create Jenkins data directory
echo "3. Creating Jenkins data directory..."
mkdir -p jenkins-data

# Start Jenkins with Docker support
echo "4. Starting Jenkins with Docker support..."
docker run -d \
  --name jenkins-docker \
  -p 8080:8080 \
  -p 50000:50000 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v $(pwd)/jenkins-data:/var/jenkins_home \
  -v /usr/bin/docker:/usr/bin/docker \
  jenkins/jenkins:lts

echo ""
echo "⏳ Waiting for Jenkins to start..."
sleep 30

echo ""
echo "🔐 Getting Jenkins initial admin password..."
JENKINS_PASSWORD=$(docker exec jenkins-docker cat /var/jenkins_home/secrets/initialAdminPassword 2>/dev/null)

if [ -n "$JENKINS_PASSWORD" ]; then
    echo "✅ Jenkins initial admin password: $JENKINS_PASSWORD"
else
    echo "⚠️  Could not retrieve Jenkins password. Check container logs:"
    echo "   docker logs jenkins-docker"
fi

echo ""
echo "🎯 Next steps:"
echo "1. Open http://localhost:8080 in your browser"
echo "2. Use the password above to complete Jenkins setup"
echo "3. Install suggested plugins"
echo "4. Create an admin user"
echo "5. Create a new Pipeline job with the following configuration:"
echo ""
echo "   Job Configuration:"
echo "   - Job name: recipe-finder-deployment"
echo "   - Pipeline script from SCM"
echo "   - SCM: Git"
echo "   - Repository URL: $(pwd)"
echo "   - Branch Specifier: */main"
echo "   - Script Path: Jenkinsfile.git"
echo ""
echo "🚀 After setup, the pipeline will be able to use Docker!"
