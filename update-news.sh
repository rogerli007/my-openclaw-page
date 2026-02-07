#!/usr/bin/env bash
# update-news.sh - Fetch HK01 latest news using Puppeteer
# Usage: ./update-news.sh

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Check if puppeteer is installed
if [ ! -d "node_modules/puppeteer" ]; then
    echo "Installing Puppeteer..."
    npm install
fi

# Run the scraper
echo "Scraping HK01 with Puppeteer..."
node scrape-hk01.js
