npm i -y
npm run release

dotnet publish -r debian.9-x64 -c Release -o ./publish --source https://dotnet.myget.org/F/aspnetcore-dev/api/v3/index.json --source https://api.nuget.org/v3/index.json server
