#!/usr/bin/env bash
# fetch hk01 headline and update my-website/my-openclaw-page/index.html
# Requires curl and xmldom parsing via headless use of ? Use simple extraction by regex.
# The page is encrypted; we'll fetch via https://api.allorigins.win to bypass CORS, but for server we can use curl.
set -euo pipefail
# Fetch page
html=$(curl -s https://api.allorigins.win/raw?url=https://hk01.com/)
# Extract first headline <h1> or first <a> with class headline
headline=$(echo "$html" | pup 'article h1,text() + text()' | head -n1)
# If not found, fallback
if [[ -z "$headline" ]]; then
  headline=$(echo "$html" | pup 'h1,text()' | head -n1)
fi
# File path
FILE="my-website/my-openclaw-page/index.html"
# Replace placeholder text "Placeholder headline. Once you fetch data" with headline
sed -i "s|Placeholder headline\. Once you fetch data|$headline|g" "$FILE"
# Also set title for news card
sed -i "s|Latest headline from HK01|$headline|g" "$FILE"
# Optional: replace image placeholder
sed -i "s|https:\/\/via.placeholder.com\/600x300|https:\/\/via.placeholder.com\/600x300?text=${headline:0:30}|g" "$FILE"
# Commit
cd my-website/my-openclaw-page
 git add index.html
 git commit -m "Update HK01 headline: $headline"
 git push
