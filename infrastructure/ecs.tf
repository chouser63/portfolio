# ECS Cluster
resource "aws_ecs_cluster" "main" {
  name = "${var.project_name}-cluster"

  setting {
    name = "containerInsights"
    value = "enabled"
  }

  tags = {
    Name = "${var.project_name}-cluster"
    Environment = var.environment
    ManagedBy = "Terraform"
  }
}

# Task Definitions
resource "aws_ecs_task_definition" "frontend_task" {
  family = "${var.project_name}-frontend-task"
  cpu = var.frontend_cpu
  memory = var.frontend_memory
  network_mode = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  execution_role_arn = aws_iam_role.ecs_task_execution_role.arn
  task_role_arn = aws_iam_role.ecs_task_role.arn

  container_definitions = jsonencode([
    {
      name = "frontend"
      image = "${aws_ecr_repository.frontend.repository_url}:latest"
      cpu = var.frontend_cpu
      memory = var.frontend_memory
      portMappings = [
        {
          containerPort = 3000
          hostPort = 3000
        }
      ]
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          awslogs-group = aws_cloudwatch_log_group.frontend_logs.name
          awslogs-region = var.aws_region
          awslogs-stream-prefix = "frontend"
        }
      }
    }
  ])

  tags = {
    Name = "${var.project_name}-frontend-task"
    Environment = var.environment
    ManagedBy = "Terraform"
  }
}

# ECS Services
resource "aws_ecs_service" "frontend_service" {
  name = "${var.project_name}-frontend-service"
  cluster = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.frontend_task.arn
  desired_count = var.frontend_desired_count
  launch_type = "FARGATE"
  platform_version = "LATEST"

  network_configuration {
    subnets = aws_subnet.private_subnets[*].id
    security_groups = [aws_security_group.frontend_sg.id]
    assign_public_ip = false
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.frontend_tg.arn
    container_name = "frontend"
    container_port = 3000
  }

  deployment_controller {
    type = "ECS"
  }

  lifecycle {
    ignore_changes = [task_definition]
  }

  tags = {
    Name = "${var.project_name}-frontend-service"
    Environment = var.environment
    ManagedBy = "Terraform"
  }
}

# CloudWatch Log Groups
resource "aws_cloudwatch_log_group" "frontend_logs" {
  name = "/aws/ecs/${var.project_name}/frontend"

  tags = {
    Name = "${var.project_name}-frontend-logs"
    Environment = var.environment
    ManagedBy = "Terraform"
  }
}

# IAM Roles
resource "aws_iam_role" "ecs_task_execution_role" {
  name = "${var.project_name}-ecs-task-execution-role"
  assume_role_policy = data.aws_iam_policy_document.ecs_task_execution_role_policy.json

  tags = {
    Name = "${var.project_name}-ecs-task-execution-role"
    Environment = var.environment
    ManagedBy = "Terraform"
  }
}

resource "aws_iam_role" "ecs_task_role" {
  name = "${var.project_name}-ecs-task-role"
  assume_role_policy = data.aws_iam_policy_document.ecs_task_role_policy.json

  tags = {
    Name = "${var.project_name}-ecs-task-role"
    Environment = var.environment
    ManagedBy = "Terraform"
  }
}

data "aws_iam_policy_document" "ecs_task_execution_role_policy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

data "aws_iam_policy_document" "ecs_task_role_policy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

resource "aws_iam_role_policy_attachment" "ecs_task_execution_role_policy_attachment" {
  role = aws_iam_role.ecs_task_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

resource "aws_iam_role_policy_attachment" "ecs_task_role_policy_attachment" {
  role = aws_iam_role.ecs_task_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskRolePolicy"
}