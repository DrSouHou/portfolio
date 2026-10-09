#!/usr/bin/env bash
# ===================================================================
# Repository Setup & Remote Push Script for Souhail HAFIDI (@DrSouHou)
# ===================================================================

set -e

echo "🚀 Initializing Git repository..."
if [ ! -d ".git" ]; then
    git init
fi

git config user.name "Souhail HAFIDI"
git config user.email "hafidisouhail02@gmail.com"

echo "📦 Staging files..."
git add .

echo "💾 Committing changes..."
git commit -m "feat: initial commit - responsive portfolio with dark/cyan theme, CMS, and Dockerfile" || echo "Nothing to commit or already committed."

echo "🌿 Setting main branch..."
git branch -M main

echo "🔗 Configuring remote repository..."
if git remote | grep -q "origin"; then
    git remote set-url origin https://github.com/DrSouHou/portfolio.git
else
    git remote add origin https://github.com/DrSouHou/portfolio.git
fi

echo "🚀 Attempting push to GitHub..."
if command -v gh &> /dev/null && gh auth status &> /dev/null; then
    gh repo create DrSouHou/portfolio --public --source=. --remote=origin --push || git push -u origin main
else
    git push -u origin main || echo "⚠️ Standard git push requires authentication. Run 'git push -u origin main' with your GitHub Personal Access Token or SSH key."
fi

echo "✅ Complete!"
