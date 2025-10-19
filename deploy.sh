#!/bin/bash

# Set AWS region
export AWS_REGION=us-east-1

# Login to ECR
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $(aws sts get-caller-identity --query Account --output text).dkr.ecr.$AWS_REGION.amazonaws.com

# Build frontend Docker image
docker build -t frontend -f src/Dockerfile src

# Get Git commit SHA
COMMIT_SHA=$(git rev-parse --short HEAD)

# Tag frontend image with commit SHA and 'latest'
FRONTEND_IMAGE=$(aws sts get-caller-identity --query Account --output text).dkr.ecr.$AWS_REGION.amazonaws.com/$(terraform output -state=infrastructure/terraform.tfstate -raw ecr_repository_frontend_url):$COMMIT_SHA
docker tag frontend $FRONTEND_IMAGE
docker tag frontend $FRONTEND_IMAGE:latest

# Push images to ECR
docker push $FRONTEND_IMAGE
docker push $FRONTEND_IMAGE:latest

# Apply Terraform changes
cd infrastructure
terraform init
terraform apply -auto-approve

# Update ECS services with new images
aws ecs update-service --cluster $(terraform output -raw ecs_cluster_name) --service $(terraform output -raw ecs_service_frontend_name) --force-new-deployment

# Wait for deployment to complete
echo "Waiting for deployment to complete..."
aws ecs wait services-stable --cluster $(terraform output -raw ecs_cluster_name) --services $(terraform output -raw ecs_service_frontend_name)

# Output application URL
echo "Application URL: http://$(terraform output -raw alb_dns_name)"