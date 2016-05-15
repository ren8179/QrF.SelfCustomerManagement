using Nancy.Hosting.Self;
using System;
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
            _nancyHost = new NancyHost(new Uri(uriStr));
            _nancyHost.Start();
            try
            {
                System.Diagnostics.Process.Start(uriStr);
            }
            catch (Exception ex)
            {
                _log.Info("Error:"+ ex.Message);
            }
            _log.Info("QrFNancy Host Started");
            _log.Info("监听ing - " + uriStr);
        }

        public void Stop()
        {
            _nancyHost.Stop();
            _log.Info("QrFNancy Host Stopped");
        }
    }
}
