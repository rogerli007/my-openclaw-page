// /js/news.js - HK01 News Data
// This file is auto-updated by update-news.sh script
// Last updated: 2026-02-07

const hk01News = {
    headline: "Example Domain",
    summary: "Example Domain, replace with real title and summary.",
    image: "https://via.placeholder.com/600x300?text=HK01",
    url: "https://www.hk01.com/latest",
    timestamp: "2026-02-07T12:00:00Z"
};

// Function to render news into the page
function renderNews() {
    const newsTitle = document.getElementById('hk01-headline');
    const newsSummary = document.getElementById('hk01-summary');
    const newsImage = document.getElementById('hk01-image');
    const newsLink = document.getElementById('hk01-link');
    
    if (newsTitle) newsTitle.textContent = hk01News.headline;
    if (newsSummary) newsSummary.textContent = hk01News.summary;
    if (newsImage) newsImage.src = hk01News.image;
    if (newsLink) newsLink.href = hk01News.url;
}

// Render when DOM is ready
document.addEventListener('DOMContentLoaded', renderNews);
