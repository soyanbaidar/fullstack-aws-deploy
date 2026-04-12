# Containerized Full Stack Deployment on AWS

## Tech Stack
- Infrastructure: Terraform
- Configuration: Ansible
- Application: Docker Compose
- Frontend: React + Nginx
- Backend: Django + Gunicorn
- Database: PostgreSQL

## Prerequisites
- Terraform installed
- Ansible installed
- AWS CLI configured (aws configure)
- SSH key at ~/.ssh/my-ec2-key

## Deployment Steps

### Step 1 — Provision infrastructure
```bash
cd terraform
terraform init
terraform apply
```

### Step 2 — Update inventory
Copy EC2 public IP from terraform output into `ansible/inventory.ini`

### Step 3 — Configure server and deploy
```bash
cd ../ansible
ansible-playbook -i inventory.ini playbook.yml
```

### Step 4 — Access application
Open `http://<ec2-public-ip>` in browser

## Destroy Infrastructure
```bash
cd terraform
terraform destroy
```

## Project Structure
```text
fullstack-aws-deploy/
├── terraform/        # AWS infrastructure code
├── ansible/          # Server configuration
└── app/              # Application source + Docker Compose
```
