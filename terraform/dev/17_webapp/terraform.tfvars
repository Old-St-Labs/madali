service_name ="webapp"
environment= "dev"
project = "madali"
region = "eu-west-2"
lambda_role_arn = "arn:aws:iam::061051257271:role/madali-dev-lambda-role"
ecs_task_role="arn:aws:iam::061051257271:role/dev-ecs-task-role"
private_subnet_ids=["subnet-0ae3a16c6c90f881a","subnet-038a3baff1d13fcd7"]
alb_security_group=["sg-07b110a53fe25c817"]
target_group_arn="arn:aws:elasticloadbalancing:eu-west-2:061051257271:targetgroup/dev-target-group/14e81a22ec044005"

codebuild_environment_variables ={
  SERVICE_NAME ="webapp"
  AWS_ACCOUNT_ID = "061051257271"
  AWS_REGION = "eu-west-2"
  ENVIRONMENT="dev"
  AWS_SECRET_ID="madali-dev-secret"

}

