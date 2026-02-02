#!/bin/bash

# Image optimization script for Trump-Hollow Builders website
# Resizes images to web-friendly dimensions and quality

IMAGES_DIR="/Users/joshuanolan/Trump Hollow Builders/website/public/images"
MAX_WIDTH=1920
QUALITY=80

echo "Starting image optimization..."
echo "Max width: ${MAX_WIDTH}px"

# Function to optimize a single image
optimize_image() {
    local file="$1"
    local filename=$(basename "$file")

    # Get current dimensions
    local width=$(sips -g pixelWidth "$file" | tail -1 | awk '{print $2}')

    if [ "$width" -gt "$MAX_WIDTH" ]; then
        echo "Resizing: $filename (${width}px -> ${MAX_WIDTH}px)"
        sips --resampleWidth $MAX_WIDTH "$file" --out "$file" > /dev/null 2>&1
    else
        echo "Skipping resize: $filename (${width}px)"
    fi

    # Compress with sips (set quality)
    sips -s formatOptions $QUALITY "$file" --out "$file" > /dev/null 2>&1
}

# Process all images
find "$IMAGES_DIR" -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.JPG" \) | while read file; do
    optimize_image "$file"
done

echo ""
echo "Optimization complete!"
echo "New size:"
du -sh "$IMAGES_DIR"
