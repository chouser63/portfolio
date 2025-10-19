# Deployment Instructions

## Prerequisites

- AWS CLI installed and configured with appropriate credentials
- Docker installed
- Terraform installed

## Architecture Overview

This application is deployed using AWS ECS Fargate for container orchestration. The frontend is a Next.js application built with TypeScript. The frontend container is hosted in an ECR repository and deployed to an ECS service behind an Application Load Balancer (ALB).

The infrastructure is provisioned using Terraform and includes:

- VPC with public and private subnets across two Availability Zones
- ECS cluster and task definitions
- ECR repository for the frontend container
- ALB with target groups for the frontend
- Security groups with least-privilege access
- CloudWatch log groups for container logs

## Deployment Steps

1. Clone the repository and navigate to the project root directory.

2. Create an ECR repository for the frontend container (if not already created):

```bash
aws ecr create-repository --repository-name my-app-frontend --region us-east-1
```

3. Run the deployment script:

```bash
./deploy.sh
```

This script will:

- Build the frontend Docker image
- Tag and push the image to ECR
- Apply Terraform changes to provision the infrastructure
- Update the ECS service to use the new container image

4. After the deployment is complete, the script will output the URL to access the application.

## Accessing the Application

The application can be accessed via the DNS name of the Application Load Balancer, which is printed at the end of the deployment script. The URL will be in the format `http://<alb-dns-name>`.

## Troubleshooting

- If the deployment fails, check the CloudWatch logs for the ECS tasks and the Terraform output for any error messages.
- Ensure that you have the necessary AWS permissions to create and manage the required resources.
- If you encounter any issues, you can roll back the Terraform changes by running `terraform destroy` in the `infrastructure` directory.

## Cost Estimates

The main cost drivers for this deployment are:

- ECS Fargate tasks (based on vCPU and memory usage)
- Application Load Balancer
- ECR repository storage
- Data transfer costs

The exact costs will depend on your usage patterns and the AWS region you choose. You can use the AWS Pricing Calculator to estimate the costs based on your specific requirements.

## Tearing Down Infrastructure

To tear down the infrastructure and delete all resources, run the following command in the `infrastructure` directory:

```bash
terraform destroy
```

This will prompt you to confirm the destruction of resources. Review the plan carefully before proceeding.