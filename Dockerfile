FROM nimlang/nim
MAINTAINER shch <shch.pc@gmail.com>

RUN apt install npm -y
RUN git clone https://github.com/shchy/alpaka.git
RUN cd alpaka
RUN nimble develop -y
RUN cd ../
RUN git clone https://github.com/shchy/tipsNim.git
RUN cd tipsNim
RUN npm i -y
RUN nimble build -y

EXPOSE 8080

