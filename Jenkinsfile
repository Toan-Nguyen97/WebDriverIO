pipeline {
    agent any

    environment {
        ENV_VAR = 'some_value'
        JAVA_HOME = 'C:\\Program Files\\Java\\jdk-11'
    }

    stages {
        stage('Build') {
            steps {
                sh 'echo $ENV_VAR'
                sh 'mvn clean install'
            }
        }

        stage('Test') {
            steps {
                sh 'mvn test'
            }
        }
    }
}