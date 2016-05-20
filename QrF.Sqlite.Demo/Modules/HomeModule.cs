using Nancy;

namespace QrF.Sqlite.Demo.Modules
{
    public class HomeModule : NancyModule
    {
        public HomeModule()
        {
            Get["/"] = _ =>
            {
                return View["index"];
            };
            Get["/login"] = _ =>
            {
                return View["login"];
            };
            //Post["/login"] = _ =>
            //{
            //    var loginUser = this.Bind<SystemUser>();
            //    SystemUser user = GetValidUser(loginUser.SystemUserName, loginUser.SystemUserPassword);
            //    if (user == null)
            //    {
            //        return Response.AsText("出错了", "text/html;charset=UTF-8");
            //    }
            //    return this.LoginAndRedirect(user.SystemUserId, fallbackRedirectUrl: "/secure");
            //};
        }
    }
}
