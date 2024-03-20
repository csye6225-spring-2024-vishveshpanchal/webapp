#!/bin/sh

# https://cloud.google.com/monitoring/agent/ops-agent/installation#install-latest-version
curl -sSO https://dl.google.com/cloudagents/add-google-cloud-ops-agent-repo.sh
sudo bash add-google-cloud-ops-agent-repo.sh --also-install