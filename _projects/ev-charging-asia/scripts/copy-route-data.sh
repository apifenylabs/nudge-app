#!/bin/bash
# Copy itinerary route JSON data to public/ for client-side loading
mkdir -p public/data/itinerary
cp data/itinerary/*.json public/data/itinerary/ 2>/dev/null || true
echo "Copied route data to public/"
