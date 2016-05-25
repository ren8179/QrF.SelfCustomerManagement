using Nancy.Hosting.Self;
using System;
using System.Diagnostics;
using Topshelf.Logging;

namespace QrF.Sqlite.Demo
{
    public class NancySelfHost
    {
        static readonly LogWriter _log = HostLogger.Get<NancySelfHost>();
        private NancyHost _nancyHost;

        public void Start()
        {
            _log.Info("QrFNancy Host Starting...");
            const string uriStr = "http://localhost:666/";
            using (var nancyHost = new NancyHost(new Uri(uriStr)))
            {
                nancyHost.Start();
                Console.WriteLine("Nancy now listening - navigating to " + uriStr + ". Press enter to stop");
                try
                {
                    Process.Start(uriStr);
                    _log.Info("监听ing - " + uriStr);
                }
                catch (Exception ex)
                {
                    _log.Error("Error:" + ex.Message);
                }
                Console.ReadKey();
            }
            Console.WriteLine("Stopped. Good bye!");
        }

        public void Stop()
        {
            _nancyHost.Stop();
            _log.Info("QrFNancy Host Stopped");
        }
    }
}
