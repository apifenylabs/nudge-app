#!/bin/bash
# Run gen_16_countries.py for each remaining country, outputting to log
cd /home/captain/.openclaw/workspace/apifeny-ai
LOG=gen_batch.log
> $LOG

# Skip finland and denmark (already done)
for country in ireland israel italy mexico netherlands new-zealand norway poland portugal russia south-africa spain sweden switzerland; do
    echo "=== $(date): Generating $country ===" | tee -a $LOG
    python3 -u gen_16_countries.py "$country" 2>&1 | tee -a $LOG
    echo "--- $(date): Done $country (exit $?) ---" | tee -a $LOG
done

echo "=== BATCH COMPLETE at $(date) ===" | tee -a $LOG
