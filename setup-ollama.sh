#!/bin/bash
# Setup Ollama local LLM for hybrid routing
# Run: bash setup-ollama.sh
# Requires: No sudo needed, runs in WSL

set -e

INSTALL_DIR="$HOME/.local/bin"
MODEL_DIR="$HOME/.ollama/models"

echo "=== Ollama Local LLM Setup ==="

# Step 1: Download Ollama binary (the .tar.zst from GitHub)
echo "→ Downloading Ollama (this may take a while from HK)..."
rm -f /tmp/ollama.tar.zst
wget -c --timeout=300 --tries=3 \
  "https://github.com/ollama/ollama/releases/latest/download/ollama-linux-amd64.tar.zst" \
  -O /tmp/ollama.tar.zst

# Step 2: Install prerequisites
echo "→ Installing zstd for extraction..."
apt-get install -y zstd 2>/dev/null || {
  # Try without sudo
  which zstd || echo "zstd not available, trying pure-python extraction"
  pip3 install zstandard --quiet 2>/dev/null || python3 -m pip install zstandard --quiet 2>/dev/null
}

# Step 3: Extract
echo "→ Extracting..."
mkdir -p "$INSTALL_DIR"
if which zstd &>/dev/null; then
  tar --zstd -xf /tmp/ollama.tar.zst -C "$INSTALL_DIR"
else
  python3 -c "
import zstandard, tarfile, sys, os
dctx = zstandard.ZstdDecompressor()
with open('/tmp/ollama.tar.zst', 'rb') as f:
    with dctx.stream_reader(f) as reader:
        with tarfile.open(fileobj=reader, mode='r|') as tar:
            tar.extractall(path='$INSTALL_DIR')
" 2>/dev/null
fi

# Step 4: Pull models (small ones for WSL)
echo "→ Pulling local models..."
"$INSTALL_DIR/ollama" serve &
sleep 3
"$INSTALL_DIR/ollama" pull qwen2.5-coder:3b
"$INSTALL_DIR/ollama" pull qwen2.5:7b
"$INSTALL_DIR/ollama" pull phi4:latest

echo "=== Done ==="
echo "Ollama installed at $INSTALL_DIR/ollama"
echo "Models: qwen2.5-coder:3b (~1.8GB), qwen2.5:7b (~4GB), phi4:latest (~9GB)"
echo "RULES.yaml already configured for hybrid routing"
