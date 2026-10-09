# ===================================================================
# Repository Setup & Remote Push Script for Souhail HAFIDI (@DrSouHou)
# PowerShell Edition (Windows Native)
# ===================================================================

Write-Host "🚀 Initializing Git repository..." -ForegroundColor Cyan
if (-not (Test-Path -Path ".git")) {
    git init
}

git config user.name "Souhail HAFIDI"
git config user.email "hafidisouhail02@gmail.com"

Write-Host "📦 Staging all files..." -ForegroundColor Cyan
git add .

Write-Host "💾 Committing changes..." -ForegroundColor Cyan
git commit -m "feat: initial commit - responsive portfolio with dark/cyan theme, CMS, and Dockerfile"

Write-Host "🌿 Setting branch to main..." -ForegroundColor Cyan
git branch -M main

Write-Host "🔗 Configuring remote origin..." -ForegroundColor Cyan
$remotes = git remote
if ($remotes -contains "origin") {
    git remote set-url origin https://github.com/DrSouHou/portfolio.git
} else {
    git remote add origin https://github.com/DrSouHou/portfolio.git
}

Write-Host "🚀 Ready to push to https://github.com/DrSouHou/portfolio.git" -ForegroundColor Green
Write-Host "To push your changes, run:" -ForegroundColor Yellow
Write-Host "  git push -u origin main" -ForegroundColor White
