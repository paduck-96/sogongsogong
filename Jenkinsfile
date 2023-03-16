pipeline {
  agent any
  // any, none, label, node, docker, dockerfile, kubernetes
  tools {
    nodejs 'NodeJS 18.12.0'
  }
  environment {
    gitName = 'paduck-96'
    gitEmail = 'peterrabitt1234@naver.com'
    githubCredential = 'git_cre'
    dockerHubRegistry = 'paduck/sogong'
    dockerHubRegistryCredential = 'docker_cri'
  }
  stages {
    stage('Checkout Github') {
      steps {
          checkout([$class: 'GitSCM', branches: [[name: '*/cicd']], extensions: [], userRemoteConfigs: [[credentialsId: githubCredential, url: 'https://github.com/paduck-96/sogongsogong.git']]])
          }
      post {
        failure {
          echo 'Repository clone failure'
        }
        success {
          echo 'Repository clone success'  
        }
      }
    }

    stage('NodeJS Build') {
      steps {
          bat 'npm install'
          echo "node build start"
          }
      post {
        failure {
          echo 'node build failure'
        }
        success {
          echo 'node build success'  
        }
      }
    }
    stage('Docker Image Build') {
      steps {
          bat "docker build . -t ${dockerHubRegistry}:${currentBuild.number}"
          bat "docker build . -t ${dockerHubRegistry}:latest"
          }
      post {
        failure {
          echo 'Docker image build failure'
          slackSend (color: "#FF0000", message: "FAILED: Docker Image Build '${envJOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
        }
        success {
          echo 'Docker image build success'
                    slackSend (color: "#0AC9FF", message: "SUCCESS: Docker Image Build '${envJOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
        }
      }
    }
     stage('Docker Image Push') {
      steps {
          // 도커 허브의 크리덴셜
          withDockerRegistry(credentialsId: dockerHubRegistryCredential, url: '') {
          // withDockerRegistry : docker pipeline 플러그인 설치시 사용가능.
          // dockerHubRegistryCredential : environment에서 선언한 docker_cri
            bat "docker push ${dockerHubRegistry}:${currentBuild.number}"
            bat "docker push ${dockerHubRegistry}:latest"
            // 텀
            sleep 10
          }  
      }
      post {
      // docker push가 성공하든 실패하든 로컬의 도커이미지는 삭제.
        failure {
          echo 'Docker Image Push failure'
          bat "docker rmi ${dockerHubRegistry}:${currentBuild.number}"
          bat "docker rmi ${dockerHubRegistry}:latest"
          slackSend (color: "#FF0000", message: "FAILED: Docker Image Push '${envJOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")

        }
        success {
          echo 'Docker Image Push success'
          bat "docker rmi ${dockerHubRegistry}:${currentBuild.number}"
          bat "docker rmi ${dockerHubRegistry}:latest"
          slackSend (color: "#0AC9FF", message: "SUCCESS: Docker Image Build '${envJOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")

        }
      }
    }
    stage('k8s manifest file update') {
      steps {
        git credentialsId: githubCredential,
            url: 'https://github.com/paduck-96/sogongsogong.git',
            branch: 'cicd'  

        // 이미지 태그 변경 후 메인 브랜치에 푸시
        bat "git config --global user.email ${gitEmail}"
        bat "git config --global user.name ${gitName}"
        bat "sed -i 's/sogong:.*/sogong:${currentBuild.number}/g' deploy/sogong-deploy.yml"
        // deploy폴더의 sd-deploy.yml 파일의 내용을 수정하는 부분.
        bat "git add ."
        bat "git commit -m 'fix:${dockerHubRegistry} ${currentBuild.number} diff img version'" 
        bat "git branch -M cicd"
        bat "git remote remove origin"
        bat "git remote add origin git@github.com:paduck-96/sogongsogong.git"
        bat "git push -u origin cicd"
      }
      post{
      failure{
        echo "k8s manifest update failure"
        slackSend (color: "#FF0000", message: "FAILED: Docker Image Push '${envJOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
    }
      success {
      echo "k8s manifest update success"
      slackSend (color: "#0AC9FF", message: "Success: Docker Image Push '${envJOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
    }
  }
}
