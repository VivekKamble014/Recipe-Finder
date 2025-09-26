pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code from Git...'
                checkout scm
                sh 'pwd && ls -la'
            }
        }
        
        stage('Install Node.js and Dependencies') {
            steps {
                echo 'Installing Node.js and npm dependencies...'
                sh '''
                    # Install Node.js if not available
                    if ! command -v node &> /dev/null; then
                        echo "Installing Node.js..."
                        curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
                        sudo apt-get update
                        sudo apt-get install -y nodejs
                    fi
                    
                    # Verify installations
                    echo "Node.js version: $(node --version)"
                    echo "npm version: $(npm --version)"
                    
                    # Install dependencies
                    npm ci
                '''
            }
        }
        
        stage('Lint Code') {
            steps {
                echo 'Running ESLint...'
                sh 'npm run lint'
            }
        }
        
        stage('Build Application') {
            steps {
                echo 'Building React application...'
                sh 'npm run build'
            }
        }
        
        stage('Deploy Application') {
            steps {
                echo 'Deploying application...'
                sh '''
                    # Install serve globally if not available
                    if ! command -v serve &> /dev/null; then
                        echo "Installing serve..."
                        sudo npm install -g serve
                    fi
                    
                    # Stop any existing serve process
                    echo "Stopping existing serve processes..."
                    sudo pkill -f "serve" || true
                    sleep 2
                    
                    # Start serve in background
                    echo "Starting serve on port 3000..."
                    sudo nohup serve -s dist -l 3000 > /var/log/recipe-finder.log 2>&1 &
                    
                    # Wait for serve to start
                    sleep 10
                    
                    # Verify deployment
                    echo "Verifying deployment..."
                    curl -f http://localhost:3000 || exit 1
                    
                    echo "Deployment successful!"
                '''
            }
        }
    }
    
    post {
        always {
            echo 'Cleaning up...'
        }
        success {
            echo 'Pipeline completed successfully!'
            echo "Application is available at: http://localhost:3000"
            echo "Logs available at: /var/log/recipe-finder.log"
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}