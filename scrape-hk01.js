#!/usr/bin/env node
// scrape-hk01.js - Puppeteer script to scrape HK01 latest news
// Extracts first article from .section-group__normal

const puppeteer = require('puppeteer');
const fs = require('fs');
const { execSync } = require('child_process');

async function scrapeHK01() {
    console.log('Launching browser...');
    
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    try {
        const page = await browser.newPage();
        
        // Set viewport
        await page.setViewport({ width: 1280, height: 800 });
        
        // Navigate to HK01 latest
        console.log('Navigating to HK01...');
        await page.goto('https://www.hk01.com/latest', {
            waitUntil: 'networkidle2',
            timeout: 30000
        });
        
        // Wait for content to load
        console.log('Waiting for content...');
        await page.waitForSelector('.section-group__normal, article, [data-testid]', { timeout: 10000 });
        
        // Extract first article from .section-group__normal
        const article = await page.evaluate(() => {
            // Try to find .section-group__normal first
            const section = document.querySelector('.section-group__normal');
            const container = section || document;
            
            // Find first article/card
            const articleEl = container.querySelector('article, .content-card, [data-testid*="article"], .card');
            
            if (!articleEl) {
                return null;
            }
            
            // Extract headline
            const titleEl = articleEl.querySelector('h1, h2, h3, .title, [class*="title"], a[data-testid]');
            const headline = titleEl ? titleEl.textContent.trim() : '';
            
            // Extract summary/description
            const descEl = articleEl.querySelector('p, .description, [class*="desc"], .summary');
            const summary = descEl ? descEl.textContent.trim() : '';
            
            // Extract image
            const imgEl = articleEl.querySelector('img');
            const image = imgEl ? imgEl.src : '';
            
            // Extract link
            const linkEl = articleEl.querySelector('a');
            const url = linkEl ? linkEl.href : 'https://www.hk01.com/latest';
            
            return { headline, summary, image, url };
        });
        
        if (!article || !article.headline) {
            console.log('No article found, using defaults');
            return {
                headline: '無法獲取最新新聞',
                summary: '點擊查睇詳情',
                image: 'https://via.placeholder.com/600x300?text=HK01',
                url: 'https://www.hk01.com/latest'
            };
        }
        
        console.log('Found article:', article.headline);
        return article;
        
    } catch (error) {
        console.error('Error scraping:', error.message);
        return {
            headline: '無法獲取最新新聞',
            summary: '點擊查睇詳情',
            image: 'https://via.placeholder.com/600x300?text=HK01',
            url: 'https://www.hk01.com/latest'
        };
    } finally {
        await browser.close();
        console.log('Browser closed');
    }
}

async function main() {
    const article = await scrapeHK01();
    const timestamp = new Date().toISOString();
    
    // Escape quotes for JS
    const headline = article.headline.replace(/"/g, '\\"');
    const summary = article.summary.replace(/"/g, '\\"');
    
    const jsContent = `// /js/news.js - HK01 News Data
// This file is auto-updated by scrape-hk01.js script
// Last updated: ${timestamp}

const hk01News = {
    headline: "${headline}",
    summary: "${summary}",
    image: "${article.image}",
    url: "${article.url}",
    timestamp: "${timestamp}"
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
`;
    
    fs.writeFileSync('js/news.js', jsContent);
    console.log('✅ Updated js/news.js');
    
    // Git operations
    try {
        execSync('git add js/news.js', { stdio: 'inherit' });
        execSync(`git commit -m "Update HK01 news: ${headline}" || true`, { stdio: 'inherit' });
        execSync('git push', { stdio: 'inherit' });
        console.log('✅ Pushed to GitHub');
    } catch (e) {
        console.error('Git error:', e.message);
    }
}

main();
