#!/bin/bash

# Set AWS region
export AWS_REGION=us-east-1

# Authenticate with ECR
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $(aws sts get-caller-identity --query Account --output text).dkr.ecr.$AWS_REGION.amazonaws.com

# Build frontend Docker image
docker build -t frontend -f Dockerfile .

# Tag images with commit SHA and 'latest'
COMMIT_SHA=$(git rev-parse --short HEAD)
docker tag frontend:latest $(aws sts get-caller-identity --query Account --output text).dkr.ecr.$AWS_REGION.amazonaws.com/my-app-frontend:$COMMIT_SHA
docker tag frontend:latest $(aws sts get-caller-identity --query Account --output text).dkr.ecr.$AWS_REGION.amazonaws.com/my-app-frontend:latest

# Push images to ECR
docker push $(aws sts get-caller-identity --query Account --output text).dkr.ecr.$AWS_REGION.amazonaws.com/my-app-frontend:$COMMIT_SHA
docker push $(aws sts get-caller-identity --query Account --output text).dkr.ecr.$AWS_REGION.amazonaws.com/my-app-frontend:latest

# Initialize Terraform
cd infrastructure
terraform init

# Apply Terraform changes (with approval prompt)
terraform apply -auto-approve

# Update ECS services to use new images
aws ecs update-service --cluster my-app-cluster --service my-app-frontend --force-new-deployment

# Show deployment status and output URLs
echo "Deployment completed. Access the application at:"
echo "http://$(terraform output alb_dns_name)"