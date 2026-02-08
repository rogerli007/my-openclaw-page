// /js/news.js - HK01 News Data
// This file is auto-updated by scrape-hk01.js script
// Strategy used: .content-card__main
// Last updated: 2026-02-08T14:03:15.341Z

const hk01News = {
    headline: "泰國大選投票結束　出口民調：無政黨過半　泰自豪黨獲最多議席",
    summary: "",
    image: "https://cdn.hk01.com/di/media/images/dw/20260208/1097062270451585024347862.jpeg/Gy6UsMbCMf1WL506mzV_4eJ-BOEzJSAZ26n0idup9Ik?v=w1920r16_9",
    url: "https://www.hk01.com/%E5%8D%B3%E6%99%82%E5%9C%8B%E9%9A%9B/60320439/%E6%B3%B0%E5%9C%8B%E5%A4%A7%E9%81%B8%E6%8A%95%E7%A5%A8%E7%B5%90%E6%9D%9F-%E5%87%BA%E5%8F%A3%E6%B0%91%E8%AA%BF-%E7%84%A1%E6%94%BF%E9%BB%A8%E9%81%8E%E5%8D%8A-%E6%B3%B0%E8%87%AA%E8%B1%AA%E9%BB%A8%E7%8D%B2%E6%9C%80%E5%A4%9A%E8%AD%B0%E5%B8%AD",
    timestamp: "2026-02-08T14:03:15.341Z"
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
