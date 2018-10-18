echo clean \
&& rm -rf tipsNim/ \
&& echo build \
&& git clone https://github.com/shchy/tipsNim.git \
&& cd tipsNim \
&& sh .circleci/deploy_before.sh \
&& docker build -t tips . \
&& docker run -p 80:8080 -p 443:443 -d tips