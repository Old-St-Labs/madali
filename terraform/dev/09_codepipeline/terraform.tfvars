environment= "dev"
project = "madali"
region = "eu-west-2"
repository-url = "https://github.com/Old-St-Labs/madali.git"
repository-name = "madali"
codebuild_role_arn = "arn:aws:iam::061051257271:role/dev-codebuild-role"

backend_codebuild_environment_variables ={
  BRANCH_NAME="development"
  AWS_ACCOUNT_ID = "061051257271"
  AWS_REGION = "eu-west-2"
  ENVIRONMENT="dev"
}

webapp_codebuild_environment_variables ={
  SERVICE_NAME ="webapp"
  AWS_ACCOUNT_ID = "061051257271"
  AWS_REGION = "eu-west-2"
  ENVIRONMENT="dev"
  AWS_SECRET_ID="madali-dev-secret"

}