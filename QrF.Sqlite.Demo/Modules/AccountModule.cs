using Nancy;
using Nancy.Authentication.Forms;
using Nancy.Extensions;
using QrF.Sqlite.Demo.Models;
using System;

namespace QrF.Sqlite.Demo.Modules
{
    public class AccountModule : NancyModule
    {
        public AccountModule() : base("/login")
        {
            Get("/", args =>
            {
                return View["login"];
            });
            Post("/", args =>
            {
                var userGuid = UserModel.ValidateUser((string)this.Request.Form.Username, (string)this.Request.Form.Password);
                if (userGuid == null)
                    return Response.AsJson(new { code = 400, error = "用户名或密码错误！" });
                DateTime? expiry = null;
                if (Request.Form.RememberMe.HasValue)
                {
                    expiry = DateTime.Now.AddDays(7);
                }
                this.Login(userGuid.Value, expiry);
                return Response.AsJson(new { code = 200 });
            });

            Get("/logout", args =>
            {
                return this.LogoutAndRedirect("~/");
            });
        }
    }
}
