using Nancy;
using Nancy.Authentication.Forms;
using Nancy.Extensions;
using Nancy.Security;
using QrF.Sqlite.Demo.Models;
using System;

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
