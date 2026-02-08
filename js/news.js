// /js/news.js - HK01 News Data
// This file is auto-updated by scrape-hk01.js script
// Strategy used: .content-card__main
// Last updated: 2026-02-08T15:00:12.462Z

const hk01News = {
    headline: "TVB視帝近照竟撞樣劉松仁？   一面相特徵竟遭網民批：條友幾花心",
    summary: "",
    image: "https://cdn.hk01.com/di/media/images/dw/20260208/1097293569460277248874260.jpeg/iI26kAunxy8q_iMJ3ji3BScEO9nb4UEo6_7Ocuv-znI?v=w1920r16_9",
    url: "https://www.hk01.com/%E5%8D%B3%E6%99%82%E5%A8%9B%E6%A8%82/60320371/%E7%8E%8B%E6%B5%A9%E4%BF%A1%E8%BF%91%E7%85%A7%E7%AB%9F%E6%92%9E%E6%A8%A3%E5%8A%89%E6%9D%BE%E4%BB%81-%E4%B8%80%E9%9D%A2%E7%9B%B8%E7%89%B9%E5%BE%B5%E9%81%AD%E7%B6%B2%E6%B0%91%E7%8B%A0%E6%89%B9-%E6%A2%9D%E5%8F%8B%E5%B9%BE%E8%8A%B1%E5%BF%83",
    timestamp: "2026-02-08T15:00:12.462Z"
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
