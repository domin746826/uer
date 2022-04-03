(cd /home/pi/drivers/mjpg-streamer/mjpg-streamer-experimental/ && mjpg_streamer -i './input_uvc.so -d /dev/video0 -r 800x600 -f 20' -o './output_http.so -w ./www -p 8080')
node index.js
