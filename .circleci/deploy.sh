echo clean \
&& rm -rf tipsNim/ \
&& echo build \
&& git clone https://github.com/shchy/tipsNim.git \
&& cd tipsNim \
&& sh .circleci/deploy_before.sh \
&& docker build -t tips . \
&& docker run -p 8080:8080 -p 80:8081 -d tips