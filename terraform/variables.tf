variable "aws_region" {
  default = "ap-south-1"
}

variable "ami_id" {
  default = "ami-03f4878755434977f"
}

variable "instance_type" {
  default = "t2.micro"
}

variable "key_name" {
  default = "my-ec2-key"
}

variable "public_key_path" {
  default = "~/.ssh/my-ec2-key.pub"
}
