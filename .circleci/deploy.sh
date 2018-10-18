echo "stop docker container" \
&& for container in $(docker ps -a -q); do (docker stop $container); done \
&& for container in $(docker ps -a -q); do (docker rm $container); done \
&& for container in $(docker image -q); do (docker image rm $container); done \
&& echo clean \
&& rm -rf tipsNim/ \
&& echo build \
&& git clone https://github.com/shchy/tipsNim.git \
&& cd tipsNim \
&& docker build -t tips . \
&& docker run -p 80:8000 -d tips