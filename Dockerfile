FROM nimlang/nim
MAINTAINER shch <shch.pc@gmail.com>

RUN apt install npm -y
RUN git clone https://github.com/shchy/alpaka.git
RUN cd alpaka && nimble develop -y && cd ../
RUN git clone https://github.com/shchy/tipsNim.git
RUN cd tipsNim && npm i -y && nimble build -y

EXPOSE 80

CMD cd tipsNim \
    && git pull \
    && nimble exec