# Application Load Balancer
resource "aws_lb" "main" {
  name = "${var.project_name}-alb"
  load_balancer_type = "application"
  security_groups = [aws_security_group.alb.id]
  subnets = aws_subnet.public_subnets[*].id

  tags = {
    Name = "${var.project_name}-alb"
    Environment = var.environment
    ManagedBy = "Terraform"
  }
}

# Frontend Target Group
resource "aws_lb_target_group" "frontend" {
  name = "${var.project_name}-frontend-tg"
  port = 3000
  protocol = "HTTP"
  vpc_id = aws_vpc.main.id
  target_type = "ip"

  health_check {
    path = "/"
    healthy_threshold = 2
    unhealthy_threshold = 10
    timeout = 5
    interval = 30
  }

  tags = {
    Name = "${var.project_name}-frontend-tg"
    Environment = var.environment
    ManagedBy = "Terraform"
  }
}

# ALB Listener
resource "aws_lb_listener" "main" {
  load_balancer_arn = aws_lb.main.arn
  port = 80
  protocol = "HTTP"

  default_action {
    type = "forward"
    target_group_arn = aws_lb_target_group.frontend.arn
  }
}

# Security Group for ALB
resource "aws_security_group" "alb" {
  name = "${var.project_name}-alb-sg"
  vpc_id = aws_vpc.main.id

  ingress {
    from_port = 80
    to_port = 80
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.project_name}-alb-sg"
    Environment = var.environment
    ManagedBy = "Terraform"
  }
}