// /js/news.js - HK01 News Data
// This file is auto-updated by scrape-hk01.js script
// Strategy used: .content-card__main
// Last updated: 2026-02-08T14:37:22.396Z

const hk01News = {
    headline: "日眾院選舉自民黨大勝　高市：將就參拜靖國神社爭取周邊國家理解",
    summary: "",
    image: "https://cdn.hk01.com/di/media/images/dw/20260202/1094958496702533632523468.jpeg/BWJiEaN2kndzOdnShE5YKfkUiwFLYw-enjqhB546oQc?v=w1920r16_9",
    url: "https://www.hk01.com/%E5%8D%B3%E6%99%82%E5%9C%8B%E9%9A%9B/60320442/%E6%97%A5%E7%9C%BE%E9%99%A2%E9%81%B8%E8%88%89%E8%87%AA%E6%B0%91%E9%BB%A8%E5%A4%A7%E5%8B%9D-%E9%AB%98%E5%B8%82-%E5%B0%87%E5%B0%B1%E5%8F%83%E6%8B%9C%E9%9D%96%E5%9C%8B%E7%A5%9E%E7%A4%BE%E7%88%AD%E5%8F%96%E5%91%A8%E9%82%8A%E5%9C%8B%E5%AE%B6%E7%90%86%E8%A7%A3",
    timestamp: "2026-02-08T14:37:22.396Z"
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
