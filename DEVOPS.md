# 🚀 Recipe Finder - DevOps Guide

This guide covers the complete DevOps pipeline for the Recipe Finder application.

## 📋 Prerequisites

- Docker & Docker Compose
- Node.js 18+
- Git
- SonarQube Scanner
- Access to GitHub, Docker Hub, SonarQube, and Nexus

## 🏗️ Architecture Overview

```
GitHub → SonarQube → Docker → Nexus → Production
   ↓         ↓         ↓        ↓         ↓
  Code    Quality   Build   Artifacts  Deploy
```

## 🔧 Setup Instructions

### 1. GitHub Repository

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/recipe-finder.git
cd recipe-finder

# Set up environment
npm install
```

### 2. Docker Setup

```bash
# Build the application
docker build -t recipe-finder:latest .

# Run with docker-compose
docker-compose up -d

# Or run standalone
docker run -d -p 3000:80 --name recipe-finder-app recipe-finder:latest
```

**Access Points:**
- Application: http://localhost:3000
- Docker logs: `docker logs recipe-finder-app`

### 3. SonarQube Setup

```bash
# Start SonarQube with PostgreSQL
docker run -d --name sonarqube-db \
  -e POSTGRES_USER=sonar \
  -e POSTGRES_PASSWORD=sonar \
  -e POSTGRES_DB=sonar \
  postgres:13

docker run -d --name sonarqube \
  --link sonarqube-db:db \
  -e SONAR_JDBC_URL=jdbc:postgresql://db:5432/sonar \
  -e SONAR_JDBC_USERNAME=sonar \
  -e SONAR_JDBC_PASSWORD=sonar \
  -p 9000:9000 \
  sonarqube:latest

# Run analysis
sonar-scanner \
  -Dsonar.projectKey=recipe-finder \
  -Dsonar.sources=src \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.login=YOUR_SONAR_TOKEN
```

**Access Points:**
- SonarQube: http://localhost:9000
- Default login: admin/admin
- Get admin password: `docker exec sonarqube cat /nexus-data/admin.password`

### 4. Nexus Repository Setup

```bash
# Start Nexus
mkdir -p nexus-data
chown -R 200 nexus-data

docker run -d \
  --name nexus \
  -p 8081:8081 \
  -v $(pwd)/nexus-data:/nexus-data \
  sonatype/nexus3:latest

# Configure npm
npm config set registry http://localhost:8081/repository/recipe-finder-npm/
npm login --registry=http://localhost:8081/repository/recipe-finder-npm/
```

**Access Points:**
- Nexus: http://localhost:8081
- Default login: admin
- Get password: `docker exec nexus cat /nexus-data/admin.password`

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow

The pipeline includes:
1. **Test**: Run tests and linting
2. **SonarQube**: Code quality analysis
3. **Build**: Create Docker image
4. **Deploy**: Deploy to production

### Required Secrets

Add these secrets to your GitHub repository:

```
DOCKER_USERNAME=your_dockerhub_username
DOCKER_PASSWORD=your_dockerhub_password
SONAR_TOKEN=your_sonarqube_token
```

## 📊 Monitoring & Maintenance

### Health Checks

```bash
# Run monitoring script
./scripts/monitor.sh

# Check application health
curl http://localhost:3000

# View container logs
docker logs recipe-finder-app
```

### Deployment

```bash
# Deploy using script
./scripts/deploy.sh

# Or manual deployment
docker-compose down
docker-compose up -d --build
```

## 🛠️ Troubleshooting

### Common Issues

1. **Port conflicts**: Change ports in docker-compose.yml
2. **Permission issues**: Check file permissions for nexus-data
3. **Memory issues**: Increase Docker memory allocation
4. **Network issues**: Check Docker network configuration

### Logs

```bash
# Application logs
docker logs recipe-finder-app

# SonarQube logs
docker logs sonarqube

# Nexus logs
docker logs nexus
```

## 📈 Performance Optimization

### Docker Optimization

- Use multi-stage builds
- Implement proper caching
- Use .dockerignore
- Optimize image layers

### Application Optimization

- Enable gzip compression
- Implement caching headers
- Use CDN for static assets
- Monitor performance metrics

## 🔒 Security Considerations

- Use secrets management
- Implement proper authentication
- Regular security scans
- Keep dependencies updated
- Use HTTPS in production

## 📚 Additional Resources

- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [SonarQube Documentation](https://docs.sonarqube.org/)
- [Nexus Repository Guide](https://help.sonatype.com/repomanager3)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

## 🆘 Support

For issues and questions:
1. Check the troubleshooting section
2. Review application logs
3. Check GitHub Issues
4. Contact the development team
