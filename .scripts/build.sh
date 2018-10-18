npm i -y
npm run build
dotnet restore -s https://dotnet.myget.org/F/aspnetcore-dev/api/v3/index.json -s https://api.nuget.org/v3/index.json server
dotnet build server