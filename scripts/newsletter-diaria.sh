#!/bin/bash
# Dispara a execução diária automática da skill tribunal-digital-news
# (só a matéria de blog: pauta -> texto -> publicação, sem aprovação manual).
# Agendado via launchd, ver com.smartsolutions.tribunaldigital.newsletterdiaria.plist
# (~/Library/LaunchAgents, fora do repo).

set -uo pipefail

WORKSPACE="/Users/claytoncorrea/Projects/Clayton/Claude-Clayton"
LOG_DIR="$WORKSPACE/clientes/tribunal-digital/conteudo/blog"
LOG_FILE="$LOG_DIR/execucao-automacao-diaria.log"
CLAUDE_BIN="/opt/homebrew/bin/claude"

mkdir -p "$LOG_DIR"
cd "$WORKSPACE" || exit 1

{
  echo "===== $(date '+%Y-%m-%d %H:%M:%S') início ====="
  "$CLAUDE_BIN" -p "/tribunal-digital-news modo automático diário" \
    --dangerously-skip-permissions
  echo "===== $(date '+%Y-%m-%d %H:%M:%S') fim (exit $?) ====="
} >> "$LOG_FILE" 2>&1
