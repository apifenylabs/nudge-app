#!/bin/bash
# Pull Ollama models with retry logic and progress tracking
# Runs as a standalone daemon process

MODELS=("llama3.2" "gemma2:9b" "phi3")
LOG_DIR="/tmp/ollama-pulls"
mkdir -p "$LOG_DIR"

echo "[$(date)] Starting Ollama model pulls..." | tee -a "$LOG_DIR/master.log"

# Clean up stale partial files
rm -f /home/captain/.ollama/models/blobs/*-partial*

ensure_ollama_server() {
  if ! curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:11434/api/tags 2>/dev/null | grep -q 200; then
    echo "[$(date)] Starting Ollama server..." | tee -a "$LOG_DIR/master.log"
    killall ollama 2>/dev/null
    sleep 2
    nohup ollama serve > /tmp/ollama-server.log 2>&1 &
    sleep 5
  fi
}

pull_with_retry() {
  local model="$1"
  local max_retries=10
  local retry=0
  
  echo "[$(date)] Pulling $model..." | tee -a "$LOG_DIR/$model.log"
  
  while [ $retry -lt $max_retries ]; do
    # Remove partial blobs for this model before retry
    rm -f /home/captain/.ollama/models/blobs/*-partial*
    
    ollama pull "$model" >> "$LOG_DIR/$model.log" 2>&1
    local exit_code=$?
    
    if [ $exit_code -eq 0 ]; then
      echo "[$(date)] ✅ $model pulled successfully!" | tee -a "$LOG_DIR/$model.log"
      return 0
    fi
    
    retry=$((retry + 1))
    local wait_time=$((retry * 10))
    echo "[$(date)] ❌ $model failed (attempt $retry/$max_retries, exit $exit_code). Waiting ${wait_time}s..." | tee -a "$LOG_DIR/$model.log"
    
    # Ensure server is alive
    ensure_ollama_server
    sleep $wait_time
  done
  
  echo "[$(date)] 💀 $model failed after $max_retries attempts." | tee -a "$LOG_DIR/$model.log"
  return 1
}

ensure_ollama_server

for model in "${MODELS[@]}"; do
  pull_with_retry "$model"
done

echo "" | tee -a "$LOG_DIR/master.log"
echo "[$(date)] === FINAL STATUS ===" | tee -a "$LOG_DIR/master.log"
ollama list 2>&1 | tee -a "$LOG_DIR/master.log"
echo "[$(date)] === DONE ===" | tee -a "$LOG_DIR/master.log"
