# 🚀 Jenkins Pipeline Solutions for Recipe Finder

## Current Issue
Your Jenkins container doesn't have Docker installed, and the workspace is empty because `checkout scm` only works with "Pipeline script from SCM".

## 🎯 Solution Options

### Option 1: Setup Jenkins with Docker Support (Recommended)

Run the setup script to configure Jenkins with Docker support:

```bash
./setup-jenkins-docker.sh
```

This will:
- Stop current Jenkins container
- Start new Jenkins container with Docker support
- Mount Docker socket for container access
- Provide setup instructions

### Option 2: Use Git SCM Pipeline

1. Go to Jenkins: http://localhost:8080
2. Open your job: `recipe-finder-deployment`
3. Click "Configure"
4. In Pipeline section:
   - **Definition**: `Pipeline script from SCM`
   - **SCM**: `Git`
   - **Repository URL**: `/Users/vivek/N/Projects/Project0/recipe-finder`
   - **Branch Specifier**: `*/main`
   - **Script Path**: `Jenkinsfile.git`
5. Save and run the build

### Option 3: Manual Workspace Setup

If you want to keep using "Pipeline script":

1. Go to Jenkins: http://localhost:8080
2. Open your job: `recipe-finder-deployment`
3. Click "Configure"
4. In Pipeline section:
   - **Definition**: `Pipeline script`
   - **Script**: Copy contents from `Jenkinsfile.workspace`
5. **Manually copy files to Jenkins workspace**:
   ```bash
   # Copy project files to Jenkins workspace
   docker cp . $(docker ps -q --filter "ancestor=jenkins/jenkins:lts"):/var/jenkins_home/workspace/recipe-finder-deployment/
   ```
6. Save and run the build

### Option 4: Local Build Approach

Use the local build pipeline that doesn't require Docker in Jenkins:

1. Go to Jenkins: http://localhost:8080
2. Open your job: `recipe-finder-deployment`
3. Click "Configure"
4. In Pipeline section:
   - **Definition**: `Pipeline script`
   - **Script**: Copy contents from `Jenkinsfile.local-build`
5. Save and run the build

## 🎯 Recommended Approach

**Use Option 1** (Jenkins with Docker support) because:
- ✅ Proper Docker integration
- ✅ Consistent build environment
- ✅ No manual file copying
- ✅ Full CI/CD pipeline

## 🚀 After Setup

Once you choose and implement a solution, your pipeline will:
1. ✅ Checkout code (if using Git SCM)
2. ✅ Install dependencies
3. ✅ Run linting
4. ✅ Build React application
5. ✅ Build Docker image
6. ✅ Test the image
7. ✅ Deploy to http://localhost:3000

## 🔧 Troubleshooting

If you encounter issues:
1. Check Jenkins container logs: `docker logs jenkins-docker`
2. Verify Docker is accessible: `docker exec jenkins-docker docker --version`
3. Check workspace contents: `docker exec jenkins-docker ls -la /var/jenkins_home/workspace/`
