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
- ALB with a target group for the frontend
- Security Groups for controlling network access
- Auto Scaling policies for the frontend service
- CloudWatch Log Groups for container logs

## Deployment Steps

1. Clone the repository and navigate to the project root directory.
2. Copy the `terraform.tfvars.example` file to `terraform.tfvars` and update the variable values as needed.
3. Copy the `.env.example` file to `.env` and update the environment variables as needed.
4. Run the `deploy.sh` script:

```
bash deploy.sh
```

This script will:

- Build the frontend Docker image
- Push the images to ECR
- Apply Terraform changes to create or update the infrastructure
- Update the ECS services to use the new container images

5. After the deployment is complete, the script will output the URL of the deployed application.

## Accessing the Application

Once the deployment is successful, you can access the frontend application using the URL displayed in the terminal or by running:

```
echo "http://$(terraform output -raw alb_dns_name)"
```

## Troubleshooting

- If the deployment fails, check the CloudWatch logs for the ECS tasks and the Terraform output for any error messages.
- Ensure that you have the necessary AWS permissions to create and manage the required resources.
- Verify that the Docker images are built correctly and pushed to ECR successfully.

## Cost Estimates

The main cost drivers for this architecture are:

- ECS Fargate tasks (based on vCPU and memory usage)
- Application Load Balancer
- ECR (storage for container images)
- CloudWatch Logs

The exact cost will depend on the usage patterns and the specific configuration of the resources. You can use the AWS Pricing Calculator to estimate the costs based on your requirements.

## Tearing Down Infrastructure

To tear down the infrastructure and delete all resources, run the following commands:

```
cd infrastructure
terraform destroy
```

This will prompt you to confirm the destruction of resources. Review the plan carefully before proceeding.

Note: Destroying the infrastructure will permanently delete all resources, including any data stored in the databases or other persistent storage.