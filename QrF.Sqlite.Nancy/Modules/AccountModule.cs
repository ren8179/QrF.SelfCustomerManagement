using Nancy;
using Nancy.Authentication.Forms;
using Nancy.Extensions;
using QrF.Sqlite.Demo.Models;
using System;

namespace QrF.Sqlite.Nancy.Modules
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
                    return this.Context.GetRedirect("~/login?error=true&username=" + (string)this.Request.Form.Username);
                DateTime? expiry = null;
                if (Request.Form.RememberMe.HasValue)
                {
                    expiry = DateTime.Now.AddDays(7);
                }
                return this.LoginAndRedirect(userGuid.Value, expiry);
            });

            Get("/logout", args =>
            {
                return this.LogoutAndRedirect("~/");
            });
        }
    }
}
