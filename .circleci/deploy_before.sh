echo "stop docker container"
for container in $(docker ps -a -q); do (docker stop $container); done 
for container in $(docker ps -a -q); do (docker rm $container); done 
for container in $(docker image -q); do (docker image rm $container); done 
