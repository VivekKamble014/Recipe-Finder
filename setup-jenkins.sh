#!/bin/bash

echo "🍳 Recipe Finder - Jenkins Setup Script"
echo "======================================="

# Check if Jenkins is running
echo "📋 Checking Jenkins status..."
if curl -s http://localhost:8080 > /dev/null; then
    echo "✅ Jenkins is running on port 8080"
else
    echo "❌ Jenkins is not accessible on port 8080"
    echo "Please make sure Jenkins is running:"
    echo "  docker run -d -p 8080:8080 -p 50000:50000 jenkins/jenkins:lts"
    exit 1
fi

# Get Jenkins initial admin password
echo "🔐 Getting Jenkins initial admin password..."
JENKINS_PASSWORD=$(docker exec $(docker ps -q --filter "ancestor=jenkins/jenkins:lts") cat /var/jenkins_home/secrets/initialAdminPassword 2>/dev/null)

if [ -n "$JENKINS_PASSWORD" ]; then
    echo "✅ Jenkins initial admin password: $JENKINS_PASSWORD"
    echo "📝 Please use this password to complete Jenkins setup at http://localhost:8080"
else
    echo "⚠️  Could not retrieve Jenkins password. You may need to check the container logs."
fi

echo ""
echo "📋 Next steps:"
echo "1. Open http://localhost:8080 in your browser"
echo "2. Use the password above to complete Jenkins setup"
echo "3. Install suggested plugins"
echo "4. Create an admin user"
echo "5. Create a new Pipeline job:"
echo "   - Job name: recipe-finder-pipeline"
echo "   - Pipeline script from SCM"
echo "   - SCM: Git"
echo "   - Repository URL: $(pwd)"
echo "   - Script path: Jenkinsfile.local"
echo ""
echo "🚀 After setup, you can run the pipeline to deploy the Recipe Finder app!"
