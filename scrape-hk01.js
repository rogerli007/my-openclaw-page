#!/usr/bin/env node
// scrape-hk01.js - Puppeteer script to scrape HK01 latest news
// Debug version with better logging and flexible selectors

const puppeteer = require('puppeteer');
const fs = require('fs');
const { execSync } = require('child_process');

async function scrapeHK01() {
    console.log('=== HK01 News Scraper Debug Mode ===');
    console.log('Launching browser...');
    
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    try {
        const page = await browser.newPage();
        
        // Set viewport and user agent
        await page.setViewport({ width: 1280, height: 800 });
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
        
        // Navigate to HK01 latest
        console.log('Navigating to https://www.hk01.com/latest...');
        await page.goto('https://www.hk01.com/latest', {
            waitUntil: 'domcontentloaded',  // Faster than networkidle2
            timeout: 60000  // Increase to 60 seconds
        });
        
        // Wait for network to be idle after initial load
        await page.waitForTimeout(5000);
        
        // Wait a bit for JavaScript to render
        console.log('Waiting for page to fully render...');
        await page.waitForTimeout(3000);
        
        // Debug: Log what selectors exist on the page
        console.log('Checking for common selectors...');
        const debugInfo = await page.evaluate(() => {
            const selectors = [
                '.content-card__main',
                '.content-card',
                '[data-testid="article-card"]',
                'article',
                '.card',
                '.news-item',
                '.article-item',
                'a[href*="article"]'
            ];
            
            const results = {};
            selectors.forEach(sel => {
                const count = document.querySelectorAll(sel).length;
                results[sel] = count;
            });
            
            // Also get first few article titles for debugging
            const allLinks = Array.from(document.querySelectorAll('a'));
            const articleLinks = allLinks
                .filter(a => a.href.includes('/article/') || a.href.includes('/%E6%B8%AF%E8%81%9E/'))
                .slice(0, 3)
                .map(a => ({ text: a.textContent.trim().substring(0, 50), href: a.href }));
            
            return { selectors: results, articleLinks };
        });
        
        console.log('Selector counts:', debugInfo.selectors);
        console.log('Found article links:', debugInfo.articleLinks);
        
        // Save HTML for debugging
        const html = await page.content();
        fs.writeFileSync('debug-hk01.html', html);
        console.log('Saved debug HTML to debug-hk01.html');
        
        // Try multiple strategies to find article
        let article = null;
        
        // Strategy 1: Look for .content-card__main
        console.log('Trying selector: .content-card__main');
        article = await page.evaluate(() => {
            const card = document.querySelector('.content-card__main');
            if (!card) return null;
            
            const titleEl = card.querySelector('h1, h2, h3, h4, .title, [class*="title"]');
            const descEl = card.querySelector('p, .desc, [class*="desc"]');
            const imgEl = card.querySelector('img');
            const linkEl = card.closest('a') || card.querySelector('a');
            
            return {
                headline: titleEl?.textContent?.trim() || '',
                summary: descEl?.textContent?.trim() || '',
                image: imgEl?.src || '',
                url: linkEl?.href || 'https://www.hk01.com/latest',
                strategy: '.content-card__main'
            };
        });
        
        // Strategy 2: Look for article links with /article/ in href
        if (!article?.headline) {
            console.log('Trying strategy: article links');
            article = await page.evaluate(() => {
                const links = Array.from(document.querySelectorAll('a[href*="/article/"]'));
                if (links.length === 0) return null;
                
                const firstLink = links[0];
                const card = firstLink.closest('article, .card, .content-card, div[class*="card"]') || firstLink;
                
                const titleEl = card.querySelector('h1, h2, h3, h4, .title, [class*="title"]') || firstLink;
                const descEl = card.querySelector('p, .desc, [class*="desc"], .summary');
                const imgEl = card.querySelector('img');
                
                return {
                    headline: titleEl?.textContent?.trim() || firstLink.textContent.trim(),
                    summary: descEl?.textContent?.trim() || '',
                    image: imgEl?.src || '',
                    url: firstLink.href,
                    strategy: 'article links'
                };
            });
        }
        
        // Strategy 3: Look for any news card pattern
        if (!article?.headline) {
            console.log('Trying strategy: generic card pattern');
            article = await page.evaluate(() => {
                const cards = document.querySelectorAll('[class*="card"], article, .news-item');
                if (cards.length === 0) return null;
                
                const card = cards[0];
                const titleEl = card.querySelector('h1, h2, h3, .title, a');
                const descEl = card.querySelector('p, .desc');
                const imgEl = card.querySelector('img');
                const linkEl = card.querySelector('a');
                
                return {
                    headline: titleEl?.textContent?.trim() || '',
                    summary: descEl?.textContent?.trim() || '',
                    image: imgEl?.src || '',
                    url: linkEl?.href || 'https://www.hk01.com/latest',
                    strategy: 'generic card'
                };
            });
        }
        
        if (!article || !article.headline) {
            console.log('No article found with any strategy, using defaults');
            return {
                headline: '無法獲取最新新聞',
                summary: '點擊查睇詳情',
                image: 'https://via.placeholder.com/600x300?text=HK01',
                url: 'https://www.hk01.com/latest',
                strategy: 'fallback'
            };
        }
        
        console.log('✅ Found article using strategy:', article.strategy);
        console.log('Headline:', article.headline.substring(0, 50));
        return article;
        
    } catch (error) {
        console.error('❌ Error scraping:', error.message);
        console.error(error.stack);
        
        // Try to save debug HTML even on error
        try {
            const html = await page.content();
            fs.writeFileSync('debug-hk01-error.html', html);
            console.log('Saved error debug HTML to debug-hk01-error.html');
        } catch (e) {
            console.log('Could not save debug HTML:', e.message);
        }
        
        return {
            headline: '無法獲取最新新聞',
            summary: '點擊查睇詳情: ' + error.message,
            image: 'https://via.placeholder.com/600x300?text=HK01',
            url: 'https://www.hk01.com/latest',
            strategy: 'error'
        };
    } finally {
        await browser.close();
        console.log('Browser closed');
        console.log('=== End Scraper ===');
    }
}

async function main() {
    const article = await scrapeHK01();
    const timestamp = new Date().toISOString();
    
    // Escape quotes for JS
    const headline = (article.headline || '').replace(/"/g, '\\"');
    const summary = (article.summary || '').replace(/"/g, '\\"');
    
    const jsContent = `// /js/news.js - HK01 News Data
// This file is auto-updated by scrape-hk01.js script
// Strategy used: ${article.strategy || 'unknown'}
// Last updated: ${timestamp}

const hk01News = {
    headline: "${headline}",
    summary: "${summary}",
    image: "${article.image || ''}",
    url: "${article.url || 'https://www.hk01.com/latest'}",
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
        // Add news.js (always exists)
        execSync('git add js/news.js', { stdio: 'inherit' });
        
        // Try to add debug files if they exist
        try {
            if (fs.existsSync('debug-hk01.html')) {
                execSync('git add debug-hk01.html', { stdio: 'inherit' });
            }
            if (fs.existsSync('debug-hk01-error.html')) {
                execSync('git add debug-hk01-error.html', { stdio: 'inherit' });
            }
        } catch (e) {
            // Debug files are optional
        }
        
        execSync(`git commit -m "Update HK01 news [${article.strategy}]: ${headline.substring(0, 30)}" || true`, { stdio: 'inherit' });
        execSync('git push', { stdio: 'inherit' });
        console.log('✅ Pushed to GitHub');
    } catch (e) {
        console.error('Git error:', e.message);
    }
}

main();
