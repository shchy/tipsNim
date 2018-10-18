echo "stop docker container" \
&& docker ps -a -q | xargs docker stop \
&& docker rm -v \
&& echo clean \
&& rm -rf tipsNim/ \
&& echo build \
&& git clone https://github.com/shchy/tipsNim.git \
&& cd tipsNim \
&& docker build -t tips . \
&& docker run -p 80:8000 -d tips
