pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    environment {
        PROJECT_NAME = 'trinity-frontend'
        DEPLOY_PATH = '/var/www/trinity-frontend'
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timestamps()
        timeout(time: 15, unit: 'MINUTES')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    rm -rf ${DEPLOY_PATH}/*
                    cp -r dist/* ${DEPLOY_PATH}/
                '''
            }
        }
    }

    post {
        success {
            echo 'Frontend build successful!'
        }
        failure {
            echo 'Frontend build failed!'
        }
    }
}