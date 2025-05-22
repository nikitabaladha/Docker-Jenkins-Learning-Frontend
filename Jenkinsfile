pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                echo '📥 Cloning code from GitHub For Frontend...'
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                echo '🐳 Building Docker image for frontend...'
                sh 'docker build -t book-collection-frontend ./book-collection'
            }
        }

        stage('Run Docker Container') {
            steps {
                echo '🚀 Running Docker container for frontend...'

                // Stop and remove old container if exists
                sh '''
                if [ $(docker ps -aq -f name=book-collection-frontend-container) ]; then
                  docker stop book-collection-frontend-container || true
                  docker rm book-collection-frontend-container || true
                fi

                docker run -d \
                  --name book-collection-frontend-container \
                  -p 3001:3001 \
                  book-collection-frontend
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Deployment completed successfully For Frontend!'
        }
        failure {
            echo '❌ Build or deployment failed For Frontend!'
        }
    }
}
