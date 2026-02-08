// /js/news.js - HK01 News Data
// This file is auto-updated by scrape-hk01.js script
// Last updated: 2026-02-08T15:14:54.147Z
// Total items: 1

const hk01News = [
  {
    "headline": "香港仔搶AirPods｜3疑犯全落網　事主認識1人　眼神問題捱打掠財",
    "summary": "",
    "image": "https://cdn.hk01.com/di/media/images/dw/20260208/1097302814956195840032781.jpeg/vbw8KFzZvCCEoV46dvG3D61VWDtpTCogppZO-6aWTvs?v=w1920r16_9",
    "url": "https://www.hk01.com/%E7%AA%81%E7%99%BC/60320444/%E9%A6%99%E6%B8%AF%E4%BB%94%E6%90%B6airpods-3%E7%96%91%E7%8A%AF%E5%85%A8%E8%90%BD%E7%B6%B2-%E4%BA%8B%E4%B8%BB%E8%AA%8D%E8%AD%981%E4%BA%BA-%E7%9C%BC%E7%A5%9E%E5%95%8F%E9%A1%8C%E6%8D%B1%E6%89%93%E6%8E%A0%E8%B2%A1",
    "timestamp": "2026-02-08T15:14:54.147Z",
    "strategy": ".content-card__main"
  }
];

// Function to render latest news into the page
function renderNews() {
    // Get the latest (first) article
    const latest = hk01News[0];
    if (!latest) return;
    
    const newsTitle = document.getElementById('hk01-headline');
    const newsSummary = document.getElementById('hk01-summary');
    const newsImage = document.getElementById('hk01-image');
    const newsLink = document.getElementById('hk01-link');
    const newsTimestamp = document.getElementById('hk01-timestamp');
    
    if (newsTitle) newsTitle.textContent = latest.headline;
    if (newsSummary) newsSummary.textContent = latest.summary;
    if (newsImage) newsImage.src = latest.image;
    if (newsLink) newsLink.href = latest.url;
    if (newsTimestamp) {
        const date = new Date(latest.timestamp);
        newsTimestamp.textContent = 'Updated: ' + date.toLocaleString('zh-HK') + ' | ' + hk01News.length + ' articles in history';
    }
}

// Function to render all news as a list (optional)
function renderNewsHistory() {
    const container = document.getElementById('hk01-history');
    if (!container) return;
    
    container.innerHTML = hk01News.map((item, index) => `
        <div class="news-item" style="margin-bottom: 1rem; padding: 1rem; background: var(--card); border-radius: 8px;">
            <h4 style="margin: 0 0 0.5rem 0;"><a href="${item.url}" target="_blank">${item.headline}</a></h4>
            <p style="margin: 0; font-size: 0.9rem; color: var(--muted);">${item.summary}</p>
            <small style="color: var(--muted);">${new Date(item.timestamp).toLocaleString('zh-HK')}</small>
        </div>
    `).join('');
}

// Render when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    renderNews();
    renderNewsHistory();
});
