terraform apply -var-file="../terraform.tfvars"
terraform plan -var-file="../terraform.tfvars"

terraform destroy -var-file="../terraform.tfvars"