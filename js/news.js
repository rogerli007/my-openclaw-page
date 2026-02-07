// /js/news.js - HK01 News Data
// This file is auto-updated by update-news.sh script
// Last updated: 2026-02-07T13:12:31Z

const hk01News = {
    headline: "即時",
    summary: "緊貼時事，捕捉最新資訊",
    image: "https://via.placeholder.com/600x300?text=HK01",
    url: "https://www.hk01.com/latest",
    timestamp: "2026-02-07T13:12:31Z"
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
