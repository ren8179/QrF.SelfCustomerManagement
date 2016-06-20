using Nancy;
using Nancy.Security;

namespace QrF.Sqlite.Nancy.Modules
{
    public class HomeModule : NancyModule
    {
        public HomeModule()
        {
            this.RequiresAuthentication();

            Get("/", args => {
                return View["index"];
            });
            
        }
    }
}
