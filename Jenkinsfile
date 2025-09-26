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
                    # Function to source nvm
                    source_nvm() {
                        export NVM_DIR="$HOME/.nvm"
                        [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
                        [ -s "$NVM_DIR/bash_completion" ] && . "$NVM_DIR/bash_completion"
                    }
                    
                    # Check if Node.js is available
                    if ! command -v node &> /dev/null; then
                        echo "Node.js not found. Installing using nvm..."
                        
                        # Install nvm (Node Version Manager) for current user
                        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
                        
                        # Source nvm
                        source_nvm
                        
                        # Install and use Node.js 20
                        nvm install 20
                        nvm use 20
                        nvm alias default 20
                        
                        # Source nvm again to ensure it's loaded
                        source_nvm
                    else
                        echo "Node.js already available"
                        source_nvm
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
                sh '''
                    # Source nvm for this stage
                    export NVM_DIR="$HOME/.nvm"
                    [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
                    [ -s "$NVM_DIR/bash_completion" ] && . "$NVM_DIR/bash_completion"
                    
                    # Use npx to run eslint from local node_modules
                    npx eslint .
                '''
            }
        }
        
        stage('Build Application') {
            steps {
                echo 'Building React application...'
                sh '''
                    # Source nvm for this stage
                    export NVM_DIR="$HOME/.nvm"
                    [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
                    [ -s "$NVM_DIR/bash_completion" ] && . "$NVM_DIR/bash_completion"
                    
                    # Use npx to run vite build
                    npx vite build
                '''
            }
        }
        
        stage('Deploy Application') {
            steps {
                echo 'Deploying application...'
                sh '''
                    # Source nvm for this stage
                    export NVM_DIR="$HOME/.nvm"
                    [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
                    [ -s "$NVM_DIR/bash_completion" ] && . "$NVM_DIR/bash_completion"
                    
                    # Install serve locally if not available
                    if ! command -v serve &> /dev/null; then
                        echo "Installing serve locally..."
                        npm install -g serve
                    fi
                    
                    # Stop any existing serve process
                    echo "Stopping existing serve processes..."
                    pkill -f "serve" || true
                    sleep 2
                    
                    # Start serve in background
                    echo "Starting serve on port 3000..."
                    nohup serve -s dist -l 3000 > /tmp/recipe-finder.log 2>&1 &
                    
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
            echo "Logs available at: /tmp/recipe-finder.log"
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}