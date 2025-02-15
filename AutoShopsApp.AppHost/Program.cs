var builder = DistributedApplication.CreateBuilder(args);

builder.AddProject<Projects.AutoShopsApp_Server>("autoshopsapp-server");

builder.Build().Run();
