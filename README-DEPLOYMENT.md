# Deployment Instructions

## Prerequisites

- AWS CLI installed and configured with appropriate credentials
- Docker installed
- Terraform installed

## Architecture Overview

This application is deployed using AWS ECS Fargate, with the frontend containerized and running behind an Application Load Balancer (ALB). The infrastructure is defined using Terraform and includes the following components:

- VPC with public and private subnets across two Availability Zones
- ECS Cluster and Task Definitions
- ECR Repository for storing container images
- ALB and Target Groups
- Security Groups with least-privilege access
- Auto Scaling policies for ECS services
- CloudWatch Log Groups for container logs

## Deployment Steps

1. Clone the repository and navigate to the project root directory.
2. Create a `terraform.tfvars` file in the `infrastructure/` directory with your desired configuration values. You can use the `terraform.tfvars.example` file as a template.
3. Run `source .env.example` to set the required environment variables.
4. Run `./deploy.sh` to build and push the Docker images to ECR, apply Terraform changes, and update the ECS services.
5. The script will output the URL of the deployed application once the deployment is complete.

## Accessing the Deployed Application

After a successful deployment, you can access the frontend application using the URL displayed in the terminal output.

## Troubleshooting

- If the deployment fails, check the CloudWatch logs for the ECS tasks and the Terraform output for any error messages.
- Ensure that you have the necessary AWS permissions to create and manage the required resources.
- Double-check your Terraform configuration and variable values.

## Cost Estimates

The main cost drivers for this architecture are:

- ECS Fargate tasks (based on vCPU and memory usage)
- Application Load Balancer
- ECR repository storage
- Data transfer costs (if applicable)

You can use the AWS Pricing Calculator to estimate the monthly costs based on your specific usage patterns.

## Tearing Down Infrastructure

To tear down the deployed infrastructure, run the following command from the `infrastructure/` directory:

```
terraform destroy
```

This will remove all resources created by Terraform, including the ECS cluster, ECR repositories, and VPC.