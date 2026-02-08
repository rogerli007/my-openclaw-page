// /js/news.js - HK01 News Data
// This file is auto-updated by scrape-hk01.js script
// Strategy used: .content-card__main
// Last updated: 2026-02-08T13:38:32.449Z

const hk01News = {
    headline: "《中年2》「翻版容祖兒」爆發燒入院　隔離十多天：驚恐絕望擔心",
    summary: "",
    image: "https://cdn.hk01.com/di/media/images/dw/20260208/1097247462713724928350182.png/OgUrUevkaPtsEDGr5z0zxrHZMK5wU4vItjrk27Y65Ns?v=w1920r16_9",
    url: "https://www.hk01.com/%E5%8D%B3%E6%99%82%E5%A8%9B%E6%A8%82/60320426/%E7%BE%85%E6%B2%9B%E7%90%AA%E8%87%AA%E7%88%86%E7%99%BC%E7%87%92%E5%85%A5%E9%99%A2-%E8%88%87%E5%A4%96%E7%95%8C%E9%9A%94%E7%B5%95%E5%8D%81%E5%A4%9A%E5%A4%A9-%E9%A9%9A%E6%81%90%E7%B5%95%E6%9C%9B%E6%93%94%E5%BF%83",
    timestamp: "2026-02-08T13:38:32.449Z"
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
