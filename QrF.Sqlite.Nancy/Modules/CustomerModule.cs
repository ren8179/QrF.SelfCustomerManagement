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
using System.IO;
using Newtonsoft.Json;

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
                var request = JsonConvert.DeserializeObject<CustomerRequest>(new StreamReader(Request.Body).ReadToEnd()) ?? new CustomerRequest();
                request.PageIndex = request.pageNumber.Value;
                request.CreateUser= this.Context.CurrentUser.Identity.Name; 
                var result = SqliteService.GetCustomerPageList(request) as PagedList<Customer>;
                return this.Response.AsJson(new
                {
                    total = result.TotalItemCount,
                    rows = from a in result
                           select new
                           {
                               a.ID,
                               BuyTime = a.BuyTime.ToString("yyyy-MM-dd"),
                               a.Name,
                               a.Days,
                               a.Money,
                               a.Product,
                               a.Card,
                               a.Contact,
                               a.YieldRate,
                               a.Expected,
                               CarrayDate = a.CarrayDate.ToString("yyyy-MM-dd"),
                               DueDate = a.DueDate.ToString("yyyy-MM-dd")
                           }
                });
            });

            Get("/infoGet", args =>
            {
                var id = Request.Query["id"];
                Customer result = SqliteService.GetCustomer(id)??new Customer();
                return Response.AsJson(new
                {
                    result.ID,
                    CreateTime = result.CreateTime.ToString("yyyy-MM-dd"),
                    BuyTime = result.BuyTime.ToString("yyyy-MM-dd"),
                    result.Name,
                    result.Days,
                    result.Money,
                    result.Product,
                    result.Card,
                    result.Contact,
                    result.YieldRate,
                    result.Expected,
                    CarrayDate = result.CarrayDate.ToString("yyyy-MM-dd"),
                    DueDate = result.DueDate.ToString("yyyy-MM-dd"),
                    result.Remark
                });
            });

            Post("/infoEdit", args =>
            {
                var model = JsonConvert.DeserializeObject<Customer>(new StreamReader(Request.Body).ReadToEnd());
                model.CreateUser = this.Context.CurrentUser.Identity.Name;
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
