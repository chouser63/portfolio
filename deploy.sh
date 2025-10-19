#!/bin/bash

# Set AWS region
export AWS_REGION=us-east-1

# Authenticate with ECR
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $(aws sts get-caller-identity --query Account --output text).dkr.ecr.$AWS_REGION.amazonaws.com

# Build frontend Docker image
docker build -t frontend -f Dockerfile .

# Get Git commit SHA
COMMIT_SHA=$(git rev-parse --short HEAD)

# Tag images with commit SHA and 'latest'
docker tag frontend:latest $(aws sts get-caller-identity --query Account --output text).dkr.ecr.$AWS_REGION.amazonaws.com/${PROJECT_NAME}-frontend:$COMMIT_SHA
docker tag frontend:latest $(aws sts get-caller-identity --query Account --output text).dkr.ecr.$AWS_REGION.amazonaws.com/${PROJECT_NAME}-frontend:latest

# Push images to ECR
docker push $(aws sts get-caller-identity --query Account --output text).dkr.ecr.$AWS_REGION.amazonaws.com/${PROJECT_NAME}-frontend:$COMMIT_SHA
docker push $(aws sts get-caller-identity --query Account --output text).dkr.ecr.$AWS_REGION.amazonaws.com/${PROJECT_NAME}-frontend:latest

# Apply Terraform changes
terraform -chdir=infrastructure init
terraform -chdir=infrastructure apply -auto-approve

# Update ECS services to use new images
aws ecs update-service --cluster ${PROJECT_NAME}-cluster --service ${PROJECT_NAME}-frontend --force-new-deployment

# Show deployment status and output URLs
echo "Deployment completed successfully!"
echo "Frontend URL: http://$(terraform -chdir=infrastructure output -raw alb_dns_name)"