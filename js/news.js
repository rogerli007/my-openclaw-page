// /js/news.js - HK01 News Data
// This file is auto-updated by scrape-hk01.js script
// Strategy used: .content-card__main
// Last updated: 2026-02-08T14:19:43.422Z

const hk01News = {
    headline: "非常檢控觀｜阮嘉敏北上拍劇嘆TVB好舒服　7日拍72集：日踩20小時",
    summary: "",
    image: "https://cdn.hk01.com/di/media/images/dw/20260208/1097231145390575616514098.jpeg/7V27-bE1qPKozIIWyPVUeuG-VmhPiLZny5MlgMuTJYA?v=w1920r16_9",
    url: "https://www.hk01.com/%E5%8D%B3%E6%99%82%E5%A8%9B%E6%A8%82/60320415/%E9%9D%9E%E5%B8%B8%E6%AA%A2%E6%8E%A7%E8%A7%80-%E9%98%AE%E5%98%89%E6%95%8F%E5%8C%97%E4%B8%8A%E6%8B%8D%E5%8A%87%E5%98%86tvb%E5%A5%BD%E8%88%92%E6%9C%8D-7%E6%97%A5%E6%8B%8D72%E9%9B%86-%E6%97%A5%E8%B8%A920%E5%B0%8F%E6%99%82",
    timestamp: "2026-02-08T14:19:43.422Z"
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
