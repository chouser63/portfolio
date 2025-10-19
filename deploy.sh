#!/bin/bash

# Set AWS region
export AWS_REGION=us-east-1

# Load environment variables
set -o allexport
source .env
set +o allexport

# Authenticate with ECR
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ECR_ENDPOINT

# Build frontend Docker image
docker build -t $ECR_ENDPOINT/$PROJECT_NAME-frontend:latest -t $ECR_ENDPOINT/$PROJECT_NAME-frontend:$GIT_SHA -f src/Dockerfile src

# Push images to ECR
docker push $ECR_ENDPOINT/$PROJECT_NAME-frontend:latest
docker push $ECR_ENDPOINT/$PROJECT_NAME-frontend:$GIT_SHA

# Initialize Terraform
cd infrastructure
terraform init

# Prompt for approval before applying changes
read -p "Apply Terraform changes? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  # Apply Terraform changes
  terraform apply -auto-approve

  # Update ECS service with new image
  aws ecs update-service --cluster $PROJECT_NAME-cluster --service $PROJECT_NAME-frontend --force-new-deployment --region $AWS_REGION
fi

# Show deployment status and output URL
echo "Deployment completed. Access the application at:"
echo "http://$(terraform output -raw alb_dns_name)"