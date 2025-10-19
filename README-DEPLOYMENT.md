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
- ALB with target groups for routing traffic to the frontend
- Security Groups for controlling network access
- CloudWatch Log Groups for container logs
- IAM Roles for ECS tasks

## Deployment Steps

1. Clone the repository and navigate to the project directory.
2. Copy the `.env.example` file to `.env` and update the values with your AWS credentials and project-specific information.
3. Run the `deploy.sh` script:

```bash
bash deploy.sh
```

This script will perform the following steps:

- Authenticate with AWS ECR
- Build the frontend Docker image
- Push the Docker images to ECR
- Initialize Terraform
- Prompt for approval before applying Terraform changes
- Apply Terraform changes to create or update the infrastructure
- Update the ECS service to use the new Docker image

4. After the deployment is complete, the script will output the URL where the application can be accessed.

## Accessing the Deployed Application

The deployment script will output the DNS name of the Application Load Balancer (ALB) after a successful deployment. You can access the frontend application by visiting the provided URL in your web browser.

## Troubleshooting

- If the deployment fails, check the CloudWatch logs for the ECS tasks and the Terraform output for any error messages.
- Ensure that you have the necessary AWS permissions to create and manage the required resources.
- Verify that the Docker images are built and pushed correctly to the ECR repository.

## Cost Estimates

The main cost factors for this deployment are:

- ECS Fargate: Charged based on vCPU and memory usage
- Application Load Balancer: Charged based on load balancer hours and data processed
- ECR: Charged based on storage and data transfer
- CloudWatch Logs: Charged based on log data ingestion and storage

The exact costs will depend on your usage patterns and the AWS region you choose. You can use the AWS Pricing Calculator to estimate the costs based on your specific requirements.

## Tearing Down Infrastructure

To tear down the infrastructure and delete all resources, run the following command from the `infrastructure` directory:

```bash
terraform destroy
```

This will prompt you for confirmation before destroying the resources. Review the plan carefully and enter `yes` to proceed with the destruction.

Note: Destroying the infrastructure will permanently delete all resources, including any data stored in the containers or databases.