# ─── PROVIDER ───────────────────────────────────────────
# Tells Terraform we're using AWS and which region
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  profile = "default" # or your actual profile name
  region  = "ap-south-1"
}

# ─── KEY PAIR ───────────────────────────────────────────
# Uploads your public key to AWS so EC2 can use it
resource "aws_key_pair" "my_key" {
  key_name   = var.key_name
  public_key = file(var.public_key_path)
}

# ─── VPC ────────────────────────────────────────────────
# Your own private network inside AWS
resource "aws_vpc" "main_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "fullstack-vpc"
  }
}

# ─── PUBLIC SUBNET ──────────────────────────────────────
# A slice of your VPC that is publicly accessible
resource "aws_subnet" "public_subnet" {
  vpc_id                  = aws_vpc.main_vpc.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "ap-south-1a"
  map_public_ip_on_launch = true

  tags = {
    Name = "fullstack-public-subnet"
  }
}

# ─── INTERNET GATEWAY ───────────────────────────────────
# The door between your VPC and the internet
resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.main_vpc.id

  tags = {
    Name = "fullstack-igw"
  }
}

# ─── ROUTE TABLE ────────────────────────────────────────
# Rules for where traffic goes — all internet traffic goes via IGW
resource "aws_route_table" "public_rt" {
  vpc_id = aws_vpc.main_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }

  tags = {
    Name = "fullstack-public-rt"
  }
}

# ─── ROUTE TABLE ASSOCIATION ────────────────────────────
# Links the route table to your public subnet
resource "aws_route_table_association" "public_rta" {
  subnet_id      = aws_subnet.public_subnet.id
  route_table_id = aws_route_table.public_rt.id
}

# ─── SECURITY GROUP ─────────────────────────────────────
# Firewall rules — what traffic is allowed in and out
resource "aws_security_group" "main_sg" {
  name        = "fullstack-sg"
  description = "Allow SSH, HTTP, and app ports"
  vpc_id      = aws_vpc.main_vpc.id

  # SSH — so you and Ansible can connect
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # HTTP — so users can access the frontend
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Django API port
  ingress {
    from_port   = 8000
    to_port     = 8000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Ping — for testing reachability
  ingress {
    from_port   = -1
    to_port     = -1
    protocol    = "icmp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Allow all outbound traffic
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "fullstack-sg"
  }
}

# ─── EC2 INSTANCE ───────────────────────────────────────
# Your actual Ubuntu server in the cloud
resource "aws_instance" "app_server" {
  ami                    = var.ami_id
  instance_type          = var.instance_type
  subnet_id              = aws_subnet.public_subnet.id
  vpc_security_group_ids = [aws_security_group.main_sg.id]
  key_name               = aws_key_pair.my_key.key_name

  tags = {
    Name = "fullstack-app-server"
  }
}

# ─── ELASTIC IP (optional but recommended) ──────────────
# Gives your EC2 a fixed public IP that never changes
resource "aws_eip" "app_eip" {
  instance = aws_instance.app_server.id
  domain   = "vpc"

  tags = {
    Name = "fullstack-eip"
  }
}
