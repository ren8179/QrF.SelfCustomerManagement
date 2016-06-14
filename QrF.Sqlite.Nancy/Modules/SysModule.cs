using Nancy;
using Nancy.Authentication.Forms;
using Nancy.Extensions;
using Nancy.Security;
using Nancy.ModelBinding;
using QrF.Sqlite.Demo.Models;
using QrF.Sqlite.Service;
using System;
using QrF.Sqlite.Contract;
using QrF.Core.Service;

namespace QrF.Sqlite.Nancy.Modules
{
    public class SysModule : NancyModule
    {
        public static ISqliteService SqliteService
        {
            get
            {
                return ServiceHelper.CreateService<ISqliteService>();
            }
        }
        public SysModule() : base("/sys")
        {
            this.RequiresAuthentication();

            Get("/menu", args => {
                return View["menu"];
            });

            Get("/UserMenus", args => {
                return View["menu"];
            });

            Get("/menuList", args => {
                var request= this.Bind<MenuRequest>();
                return SqliteService.GetMenuList(request);
            });
        }
    }
}
