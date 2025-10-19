#!/bin/bash

# Set default values
AWS_REGION="us-east-1"
PROJECT_NAME="my-app"
ENVIRONMENT="dev"

# Load environment variables
source .env

# Authenticate with AWS ECR
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com

# Build frontend Docker image
docker build -t $PROJECT_NAME-frontend .

# Tag images with commit SHA and 'latest'
COMMIT_SHA=$(git rev-parse --short HEAD)
docker tag $PROJECT_NAME-frontend:latest $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$PROJECT_NAME-frontend:$COMMIT_SHA
docker tag $PROJECT_NAME-frontend:latest $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$PROJECT_NAME-frontend:latest

# Push images to ECR
docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$PROJECT_NAME-frontend:$COMMIT_SHA
docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$PROJECT_NAME-frontend:latest

# Apply Terraform changes
cd infrastructure
terraform init
terraform apply -auto-approve

# Update ECS services to use new images
aws ecs update-service --cluster $PROJECT_NAME-cluster --service $PROJECT_NAME-frontend-service --force-new-deployment

# Show deployment status and output URLs
echo "Deployment completed. Access the application at:"
echo "http://$(terraform output alb_dns_name)"