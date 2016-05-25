using Topshelf;

namespace QrF.Sqlite.Demo
{
    class Program
    {
        static void Main(string[] args)
        {
            HostFactory.Run(x =>
            {
                x.UseLog4Net("log4net.config");

                x.Service<NancySelfHost>(s =>   
                {
                    s.ConstructUsing(name => new NancySelfHost());
                    s.WhenStarted(tc => tc.Start());
                    s.WhenStopped(tc => tc.Stop());
                });
                x.RunAsLocalSystem();
                x.SetDescription("Sample Topshelf Host By QrFNancy");
                x.SetDisplayName("QrFNancy");
                x.SetServiceName("QrFNancy的Host");
            });
        }
    }
}
