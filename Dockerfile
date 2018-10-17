FROM debian
MAINTAINER shch <shch.pc@gmail.com>

RUN apt update
RUN apt install curl -y
RUN curl -SL -o dotnet.deb https://dotnetcli.blob.core.windows.net/dotnet/Sdk/master/dotnet-sdk-latest-x64.deb
RUN apt install ./dotnet.deb

RUN apt install npm -y
RUN git clone https://github.com/shchy/tipsNim.git

EXPOSE 8000

CMD cd tipsNim \
    && npm i -y \
    && sh .scripts/build.sh \
    && git pull \
    && sh .scripts/run.sh 