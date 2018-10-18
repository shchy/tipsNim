FROM debian

RUN apt update
RUN apt install curl -y
RUN curl -SL -o dotnet.tar.gz https://dotnetcli.blob.core.windows.net/dotnet/Sdk/master/dotnet-sdk-latest-linux-x64.tar.gz
RUN mkdir -p /usr/share/dotnet
RUN tar -zxf dotnet.tar.gz -C /usr/share/dotnet
RUN ln -s /usr/share/dotnet/dotnet /usr/bin/dotnet

RUN apt install gnupg gnupg2 gnupg1 -y
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt install nodejs -y
RUN apt install git -y
RUN apt install libunwind8 icu-devtools -y
RUN git clone https://github.com/shchy/tipsNim.git

EXPOSE 443 8000

ENTRYPOINT [ "/bin/bash" ]