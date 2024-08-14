service_name ="logging-service"
environment= "dev"
project = "madali"
region = "eu-west-2"
lambda_role_arn = "arn:aws:iam::061051257271:role/madali-dev-lambda-role"
lambda_role_name= "madali-dev-lambda-role"
lambda_vpc_id = "	vpc-08a4d8f22168d4c16"
lambda_private_subnet_ids=["subnet-0ae3a16c6c90f881a","subnet-038a3baff1d13fcd7"]
lambda_memory_size = 128
lambda_timeout = 900
lambda_runtime = "nodejs20.x"
lambda_lambda_outbound_security_group_ids = ["sg-08d6a46c759c9d15f"]
lambda_environment_variables = {
  DYNAMO_DB_MAIN_TABLE = "madali-dev-table"
  AWS_SECRET_ID = "madali-dev-secret"
  DEFAULT_REGION = "eu-west-2"
}

codebuild_environment_variables ={
  SERVICE_NAME ="logging-service"
  AWS_ACCOUNT_ID = "061051257271"
  AWS_REGION = "eu-west-2"
  ENVIRONMENT="dev"
  PROJECT="madali"
}