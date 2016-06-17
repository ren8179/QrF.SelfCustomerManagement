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
using System.Collections.Generic;

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

            #region Menu

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
                return this.Response.AsJson(from a in result
                                            select new
                                            {
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

            Get("/menuGet", args =>
            {
                var id = Request.Query["id"];
                Menu result = SqliteService.GetMenu(id);
                return this.Response.AsJson(new
                {
                    result.ID,
                    result.Name,
                    result.Url,
                    result.Info,
                    result.Code,
                    result.Permission,
                    result.Icon,
                    result.ParentId,
                    result.Orderby
                });
            });

            Post("/menuEdit", args =>
            {
                var model = this.Bind<Menu>();
                SqliteService.SaveMenu(model);
                return Response.AsJson("操作成功");
            });

            Get("/menuDelete", args =>
            {
                var id = Request.Query["id"];
                SqliteService.DeleteMenu(new List<int>() { id });
                return Response.AsJson("操作成功");
            });

            Get("/menuTree", args =>
            {
                var menuList = SqliteService.GetMenuList();
                return Response.AsJson(
                    from a in menuList
                    where a.ParentId == 1
                    select new
                    {
                        id = a.ID,
                        text = a.Name,
                        type = "parent",
                        state = new
                        {
                            opened = true
                        },
                        children = (from b in menuList
                                    where b.ParentId == a.ID
                                    select new
                                    {
                                        id = b.ID,
                                        text = b.Name
                                    }).ToArray()
                    });
            });

            #endregion

            #region Role

            Get("/role", args =>
            {
                return View["role"];
            });

            Post("/roleList", args =>
            {
                var request = this.Bind<RoleRequest>();
                request = request ?? new RoleRequest() { };
                request.PageIndex = request.pageNumber.Value;
                var result = SqliteService.GetRolePageList(request) as PagedList<Role>;
                return this.Response.AsJson(new
                {
                    total = result.TotalItemCount,
                    rows = from a in result
                           select new
                           {
                               a.ID,
                               a.Name,
                               a.Info
                           }
                });
            });

            Get("/roleGet", args =>
            {
                var id = Request.Query["id"];
                Role result = SqliteService.GetRole(id);
                return Response.AsJson(new
                {
                    result.ID,
                    result.Name,
                    result.Info,
                    result.BusinessPermissionString
                });
            });

            Post("/roleEdit", args =>
            {
                var model = this.Bind<Role>();
                SqliteService.SaveRole(model);
                return Response.AsJson("操作成功");
            });

            Get("/roleDelete", args =>
            {
                var id = Request.Query["id"];
                SqliteService.DeleteRole(new List<int>() { id });
                return Response.AsJson("操作成功");
            });

            #endregion
        }
    }
}
