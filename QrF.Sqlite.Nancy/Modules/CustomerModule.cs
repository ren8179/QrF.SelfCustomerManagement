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
using QrF.Framework.Utility;

namespace QrF.Sqlite.Nancy.Modules
{
    public class CustomerModule : NancyModule
    {
        public static ISqliteService SqliteService
        {
            get
            {
                return ServiceHelper.CreateService<ISqliteService>();
            }
        }
        public CustomerModule() : base("/customer")
        {
            this.RequiresAuthentication();

            #region Info

            Get("/info", args =>
            {
                return View["info"];
            });

            Post("/infoList", args =>
            {
                var request = this.Bind<CustomerRequest>();
                request = request ?? new CustomerRequest() { };
                request.PageIndex = request.pageNumber.Value;
                var result = SqliteService.GetCustomerPageList(request) as PagedList<Customer>;
                return this.Response.AsJson(new
                {
                    total = result.TotalItemCount,
                    rows = from a in result
                           select new
                           {
                               a.ID,
                               BuyTime =a.BuyTime.ToString(),
                               a.Name,
                               a.Days,
                               a.Money,
                               a.Product,
                               a.Card,
                               a.Contact,
                               a.YieldRate,
                               a.Expected,
                               CarrayDate=a.CarrayDate.ToString(),
                               DueDate=a.DueDate.ToString()
                           }
                });
            });

            Get("/infoGet", args =>
            {
                var id = Request.Query["id"];
                Customer result = SqliteService.GetCustomer(id);
                return Response.AsJson(new
                {
                    result.ID,
                    BuyTime = result.BuyTime.ToString(),
                    result.Name,
                    result.Days,
                    result.Money,
                    result.Product,
                    result.Card,
                    result.Contact,
                    result.YieldRate,
                    result.Expected,
                    CarrayDate = result.CarrayDate.ToString(),
                    DueDate = result.DueDate.ToString()
                });
            });

            Post("/infoEdit", args =>
            {
                var model = this.Bind<Customer>();
                SqliteService.SaveCustomer(model);
                return Response.AsJson("操作成功");
            });

            Get("/infoDelete", args =>
            {
                var id = Request.Query["id"];
                SqliteService.DeleteCustomer(new List<int>() { id });
                return Response.AsJson("操作成功");
            });
            
            #endregion
            
        }
    }
}
