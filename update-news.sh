#!/usr/bin/env bash
# update-news.sh - Fetch HK01 latest news and update js/news.js
# Usage: ./update-news.sh

set -euo pipefail

# Paths
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
NEWS_FILE="${SCRIPT_DIR}/js/news.js"

# Fetch HK01 latest page
echo "Fetching HK01 latest news..."
HTML=$(curl -s "https://api.allorigins.win/raw?url=https://www.hk01.com/latest")

# Extract headline - look for article titles (adjust selectors based on actual HTML structure)
# Try to find the first article headline
HEADLINE=$(echo "$HTML" | grep -oP '<h[1-6][^>]*>.*?<\/h[1-6]>' | sed 's/<[^>]*>//g' | head -1 || echo "")

# Fallback: try to find title in article links
if [[ -z "$HEADLINE" ]]; then
    HEADLINE=$(echo "$HTML" | grep -oP 'class="[^"]*title[^"]*"[^>]*>[^<]+' | sed 's/.*>//' | head -1 || echo "")
fi

# If still empty, use a default
if [[ -z "$HEADLINE" ]]; then
    HEADLINE="無法獲取最新新聞"
fi

# Extract image URL (first image from article)
IMAGE=$(echo "$HTML" | grep -oP 'src="[^"]+\.(jpg|jpeg|png|webp)"' | head -1 | sed 's/src="//;s/"$//' || echo "")

# Fallback image
if [[ -z "$IMAGE" ]]; then
    IMAGE="https://via.placeholder.com/600x300?text=HK01"
fi

# Extract summary (first paragraph)
SUMMARY=$(echo "$HTML" | grep -oP '<p[^>]*>[^<]+</p>' | sed 's/<[^>]*>//g' | head -1 || echo "")

if [[ -z "$SUMMARY" ]]; then
    SUMMARY="點擊查睇詳情"
fi

# Current timestamp
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

echo "Headline: $HEADLINE"
echo "Image: $IMAGE"
echo "Summary: $SUMMARY"

# Generate new news.js file
cat > "$NEWS_FILE" << EOF
// /js/news.js - HK01 News Data
// This file is auto-updated by update-news.sh script
// Last updated: ${TIMESTAMP}

const hk01News = {
    headline: "${HEADLINE}",
    summary: "${SUMMARY}",
    image: "${IMAGE}",
    url: "https://www.hk01.com/latest",
    timestamp: "${TIMESTAMP}"
};

// Function to render news into the page
function renderNews() {
    const newsTitle = document.getElementById('hk01-headline');
    const newsSummary = document.getElementById('hk01-summary');
    const newsImage = document.getElementById('hk01-image');
    const newsLink = document.getElementById('hk01-link');
    const newsTimestamp = document.getElementById('hk01-timestamp');
    
    if (newsTitle) newsTitle.textContent = hk01News.headline;
    if (newsSummary) newsSummary.textContent = hk01News.summary;
    if (newsImage) newsImage.src = hk01News.image;
    if (newsLink) newsLink.href = hk01News.url;
    if (newsTimestamp) {
        const date = new Date(hk01News.timestamp);
        newsTimestamp.textContent = 'Updated: ' + date.toLocaleString('zh-HK');
    }
}

// Render when DOM is ready
document.addEventListener('DOMContentLoaded', renderNews);
EOF

echo "✅ Updated ${NEWS_FILE}"

# Git operations
cd "$SCRIPT_DIR"
git add js/news.js
git commit -m "Update HK01 news: ${HEADLINE}" || true
git push
echo "✅ Pushed to GitHub"
