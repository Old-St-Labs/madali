

variable "github_token" {
  description = "GitHub personal access token"
  type        = string
  sensitive   = true
}


resource "aws_codebuild_source_credential" "github_token" {
  auth_type   = "PERSONAL_ACCESS_TOKEN"
  server_type = "GITHUB"
  token       = var.github_token
}

