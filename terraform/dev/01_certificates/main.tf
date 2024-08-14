terraform {
  # Assumes s3 bucket and dynamo DB table already set up
  # See /code/03-basics/aws-backend
  backend "s3" {
    bucket         = "old-st-devops-directive-tf-state"
    key            = "dev/certificate.main.tfstate"
    region         = "eu-west-1"
    dynamodb_table = "terraform-state-locking"
    encrypt        = true
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 5.20.0"
    }
  }
}

variable "region" {
  description = "The AWS region"
  type        = string
  default     = "eu-west-1"
}

provider "aws" {
  region  = var.region
  profile = "terraform"
}


variable "environment" {
  description = "The environment name"
  type        = string
}

variable "domain-name" {
  description = "The domain name"
  type        = string
}

##CERTIFICATES
module "webapp_certificate" {
  source            = "../../modules/aws_certificates"
  region            = var.region
  domain_name       = "${var.environment}.${var.domain-name}"
  alt_domain_names  = ["*.${var.environment}.${var.domain-name}"]
  validation_method = "DNS"
}

module "webapp_certificate_us_east_1" {
  source            = "../../modules/aws_certificates"
  region            = "us-east-1"
  domain_name       = "${var.environment}.kopona.io"
  alt_domain_names  = ["*.${var.environment}.kopona.io"]
  validation_method = "DNS"
}
