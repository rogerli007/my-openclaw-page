#!/usr/bin/env bash
# update_example_headline.sh
# 1. Fetch example.com
html=$(curl -s https://example.com)
# 2. Extract text inside <h1></h1>
headline=$(echo "$html" | grep -i '<h1[^>]*>' | sed -n 's/.*<h1[^>]*>\([^<]*\).*$/\1/p')
# 3. Update index.html placeholder
file="my-website/my-openclaw-page/index.html"
# Replace the placeholder text "Placeholder headline. Once you fetch data"
sed -i "s|Placeholder headline\. Once you fetch data|$headline|g" "$file"
# Also set title in card
sed -i "s|Latest headline from HK01|$headline|g" "$file"
# Commit and push
cd my-website/my-openclaw-page
 git add index.html
 git commit -m "Update example.com headline: $headline" || true
 git push
