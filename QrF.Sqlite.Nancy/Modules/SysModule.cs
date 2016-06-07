using Nancy;
using Nancy.Authentication.Forms;
using Nancy.Extensions;
using Nancy.Security;
using QrF.Sqlite.Demo.Models;
using System;

namespace QrF.Sqlite.Demo.Modules
{
    public class SysModule : NancyModule
    {
        public SysModule() : base("/sys")
        {
            this.RequiresAuthentication();

            Get("/menu", args => {
                return View["menu"];
            });
           
        }
    }
}
