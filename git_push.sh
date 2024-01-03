#!/bin/bash

echo "Starting Git commands..."

# Check if a commit message was provided
if [ $# -eq 0 ]; then
    echo "Please provide a commit message."
    exit 1
fi

commit_message="$1"

echo "Running: git status"
git status

echo "Running: git add ."
git add --all # To add all changes including untracked files

echo "Running: git commit -m 'push files: $commit_message'"
git commit -m "push files: $commit_message"

echo "Running: git push origin main"
git push origin main

echo "Git commands execution completed."
