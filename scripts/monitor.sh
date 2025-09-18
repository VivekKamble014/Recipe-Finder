#!/bin/bash

# Recipe Finder Monitoring Script

echo "📊 Recipe Finder System Status"
echo "================================"

# Check Docker containers
echo "🐳 Docker Containers:"
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" | grep -E "(recipe-finder|sonarqube|nexus)"

echo ""

# Check application health
echo "🏥 Application Health:"
if curl -f http://localhost:3000 > /dev/null 2>&1; then
    echo "✅ Recipe Finder App: Healthy (http://localhost:3000)"
else
    echo "❌ Recipe Finder App: Unhealthy"
fi

if curl -f http://localhost:9000 > /dev/null 2>&1; then
    echo "✅ SonarQube: Healthy (http://localhost:9000)"
else
    echo "❌ SonarQube: Unhealthy"
fi

if curl -f http://localhost:8081 > /dev/null 2>&1; then
    echo "✅ Nexus: Healthy (http://localhost:8081)"
else
    echo "❌ Nexus: Unhealthy"
fi

echo ""

# System resources
echo "💻 System Resources:"
echo "CPU Usage: $(top -l 1 | grep "CPU usage" | awk '{print $3}')"
echo "Memory Usage: $(top -l 1 | grep "PhysMem" | awk '{print $2}')"
echo "Disk Usage: $(df -h / | awk 'NR==2 {print $5}')"

echo ""

# Docker stats
echo "📈 Docker Stats:"
docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}" | head -5
