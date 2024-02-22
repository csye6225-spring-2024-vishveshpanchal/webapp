packer {
  required_plugins {
    googlecompute = {
      source  = "github.com/hashicorp/googlecompute"
      version = "~> 1"
    }
  }
}

locals {
  date_time_stamp = lower(formatdate("YYYY-MMM-DD-hh-mm-ss", timestamp()))
}

// Builder
source "googlecompute" "centos" {
  project_id          = var.centos_project_id          # https://developer.hashicorp.com/packer/integrations/hashicorp/googlecompute/latest/components/builder/googlecompute
  source_image_family = var.centos_source_image_family # https://cloud.google.com/compute/docs/images/os-details
  # or gcloud compute images list
  zone = var.centos_zone # gcloud compute zones list

  region                          = var.centos_region
  disable_default_service_account = var.centos_disable_default_service_account
  machine_type                    = var.centos_machine_type
  image_name                      = format("%s-%s", var.centos_image_name, local.date_time_stamp)
  ssh_username                    = var.centos_ssh_username
}


build {
  name = "builds"
  sources = [
    "source.googlecompute.centos",
  ]

  provisioner "shell" {
    scripts = [
      "./scripts/centos_update.sh",
      "./scripts/adding_nologinuser.sh",
    ]
  }

  provisioner "file" {
    source = "../app"
    // destination = "/home/csye6225/app"
    destination = "/tmp"
  }

  provisioner "shell" {
    scripts = [
      "./scripts/moving_data.sh",
      "./scripts/update_permissions.sh",
      "./scripts/install_services.sh",
      "./scripts/creating_webapp_env.sh",
      "./scripts/install_npm.sh",
      "./scripts/run_tests.sh",
    ]
  }

}

