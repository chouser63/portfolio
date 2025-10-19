provider "aws" {
  region = var.aws_region
}

# VPC
resource "aws_vpc" "main" {
  cidr_block = var.vpc_cidr_block
  enable_dns_hostnames = true
  enable_dns_support = true

  tags = {
    Name = "${var.project_name}-vpc"
    Environment = var.environment
    ManagedBy = "Terraform"
  }
}

# Public Subnets
resource "aws_subnet" "public_subnets" {
  count = length(var.public_subnet_cidrs)
  vpc_id = aws_vpc.main.id
  cidr_block = var.public_subnet_cidrs[count.index]
  availability_zone = data.aws_availability_zones.available.names[count.index]
  map_public_ip_on_launch = true

  tags = {
    Name = "${var.project_name}-public-subnet-${count.index + 1}"
    Environment = var.environment
    ManagedBy = "Terraform"
  }
}

# Private Subnets
resource "aws_subnet" "private_subnets" {
  count = length(var.private_subnet_cidrs)
  vpc_id = aws_vpc.main.id
  cidr_block = var.private_subnet_cidrs[count.index]
  availability_zone = data.aws_availability_zones.available.names[count.index]

  tags = {
    Name = "${var.project_name}-private-subnet-${count.index + 1}"
    Environment = var.environment
    ManagedBy = "Terraform"
  }
}

# Internet Gateway
resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "${var.project_name}-igw"
    Environment = var.environment
    ManagedBy = "Terraform"
  }
}

# Elastic IPs for NAT Gateways
resource "aws_eip" "nat_eips" {
  count = length(var.public_subnet_cidrs)
  vpc = true

  tags = {
    Name = "${var.project_name}-nat-eip-${count.index + 1}"
    Environment = var.environment
    ManagedBy = "Terraform"
  }
}

# NAT Gateways
resource "aws_nat_gateway" "nat_gateways" {
  count = length(var.public_subnet_cidrs)
  allocation_id = aws_eip.nat_eips[count.index].id
  subnet_id = aws_subnet.public_subnets[count.index].id

  tags = {
    Name = "${var.project_name}-nat-gw-${count.index + 1}"
    Environment = var.environment
    ManagedBy = "Terraform"
  }
}

# Route Tables
resource "aws_route_table" "public_route_table" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }

  tags = {
    Name = "${var.project_name}-public-rt"
    Environment = var.environment
    ManagedBy = "Terraform"
  }
}

resource "aws_route_table" "private_route_tables" {
  count = length(var.private_subnet_cidrs)
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.nat_gateways[count.index].id
  }

  tags = {
    Name = "${var.project_name}-private-rt-${count.index + 1}"
    Environment = var.environment
    ManagedBy = "Terraform"
  }
}

# Route Table Associations
resource "aws_route_table_association" "public_subnet_associations" {
  count = length(var.public_subnet_cidrs)
  subnet_id = aws_subnet.public_subnets[count.index].id
  route_table_id = aws_route_table.public_route_table.id
}

resource "aws_route_table_association" "private_subnet_associations" {
  count = length(var.private_subnet_cidrs)
  subnet_id = aws_subnet.private_subnets[count.index].id
  route_table_id = aws_route_table.private_route_tables[count.index].id
}

# Security Groups
resource "aws_security_group" "frontend_sg" {
  name = "${var.project_name}-frontend-sg"
  vpc_id = aws_vpc.main.id

  ingress {
    from_port = 3000
    to_port = 3000
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
    Name = "${var.project_name}-frontend-sg"
    Environment = var.environment
    ManagedBy = "Terraform"
  }
}

data "aws_availability_zones" "available" {}