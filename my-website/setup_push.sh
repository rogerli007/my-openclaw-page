#!/usr/bin/env bash
# Script to configure git remote to the official GitHub URL and push changes using a stored credential helper
# Ensure this script is executable: chmod +x my-website/setup_push.sh

set -euo pipefail

# Define target repo URL
REPO_URL="https://github.com/rogerli007/my-openclaw-page.git"

# Change to the repository directory
CD_DIR="my-website/my-openclaw-page"
if [ ! -d "$CD_DIR" ]; then
  echo "Error: directory $CD_DIR does not exist."
  exit 1
fi

cd "$CD_DIR"

# Set the remote to the official HTTPS URL
if git remote get-url origin | grep -q "$REPO_URL"; then
  echo "Remote 'origin' already points to $REPO_URL"
else
  echo "Setting remote 'origin' to $REPO_URL"
  git remote set-url origin "$REPO_URL"
fi

# Perform the push using the credential.helper=store option
# This will prompt for username/password if not cached

echo "Pushing to $REPO_URL"
if git -c credential.helper="store" push; then
  echo "Push succeeded"
else
  echo "Push failed"
  exit 1
fi
