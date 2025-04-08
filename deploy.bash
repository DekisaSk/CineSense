#!/bin/bash
git pull origin main
cd FrontEnd
npm install
npm run build
sudo chmod -R 755 /var/www/CineSense
sudo systemctl reload nginx