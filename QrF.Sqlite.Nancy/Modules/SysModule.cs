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
using QrF.Framework.Contract;
using System.Linq;

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

            Get("/menu", args =>
            {
                return View["menu"];
            });

            Get("/userMenus", args =>
            {
                return View["menu"];
            });

            Get("/parentList", args =>
            {
                var parentId = Request.Query["ParentId"];
                var result = SqliteService.GetMenuList(new MenuRequest { ParentId = int.Parse(parentId) });
                return this.Response.AsJson(from a in result select new {
                                                id = a.ID,
                                                name = a.Name
                                            });
            });

            Post("/menuList", args =>
            {
                var request = this.Bind<MenuRequest>();
                request = request ?? new MenuRequest() { };
                request.PageIndex = request.pageNumber.Value;
                var result = SqliteService.GetMenuPageList(request) as PagedList<Menu>;
                return this.Response.AsJson(new
                {
                    total = result.TotalItemCount,
                    rows = from a in result
                           select new
                           {
                               a.ID,
                               a.Name,
                               a.Url,
                               Parent = a.Parent.Name,
                               a.Icon,
                               a.Orderby
                           }
                });
            });
        }
    }
}
