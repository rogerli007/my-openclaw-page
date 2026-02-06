#!/usr/bin/env bash
set -euo pipefail
# ------------------------------------------------------------
# update_and_push.sh - update HK01 headline in the SPA and push
# ------------------------------------------------------------
# 1. Paths
REPO_DIR="$(pwd)"              # current dir (expect my-website)
PAGE_DIR="$REPO_DIR/my-openclaw-page"
INDEX_FILE="$PAGE_DIR/index.html"

# 2. Grab headline
echo "Fetching headline…"
HK01_HTML=$(curl -s https://api.allorigins.win/raw?url=https://hk01.com/)
HEADLINE=$(echo "$HK01_HTML" | pup 'article h1 text()' | head -n1)
[[ -z "$HEADLINE" ]] && HEADLINE=$(echo "$HK01_HTML" | pup 'h1 text()' | head -n1)
[[ -z "$HEADLINE" ]] && HEADLINE="今日無新聞可顯示"

# 3. Update placeholder
sed -i "s|Placeholder headline\. Once you fetch data|$HEADLINE|g" "$INDEX_FILE"
sed -i "s|Latest headline from HK01|$HEADLINE|g" "$INDEX_FILE"

# 4. Commit & push
cd "$PAGE_DIR"

git add index.html

git commit -m "Update HK01 headline: $HEADLINE" || true

git push

echo "Done – headline updated."
