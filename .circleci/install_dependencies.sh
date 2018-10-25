apt update 
apt install expect openssh-client -y

# install dotnet
apt install curl -y
curl -SL -o dotnet.tar.gz https://dotnetcli.blob.core.windows.net/dotnet/Sdk/master/dotnet-sdk-latest-linux-x64.tar.gz
mkdir -p /usr/share/dotnet
tar -zxf dotnet.tar.gz -C /usr/share/dotnet
ln -s /usr/share/dotnet/dotnet /usr/bin/dotnet

# install npm
apt install gnupg gnupg2 gnupg1 -y
curl -sL https://deb.nodesource.com/setup_8.x | bash -
apt install nodejs git jq libunwind8 icu-devtools -y

# install jq
apt install tar git jq file -y
