using Nancy;
using Nancy.Authentication.Forms;
using QrF.Core.Service;
using QrF.Sqlite.Service;
using System;
using System.Security.Claims;
using System.Security.Principal;

namespace QrF.Sqlite.Demo.Models
{
    public class UserModel : IUserMapper
    {
        public static ISqliteService SqliteService
        {
            get
            {
                return ServiceHelper.CreateService<ISqliteService>();
            }
        }

        public ClaimsPrincipal GetUserFromIdentifier(Guid identifier, NancyContext context)
        {
            var userRecord = SqliteService.GetUser(identifier);

            return userRecord == null
                       ? null
                       : new ClaimsPrincipal(new GenericIdentity(userRecord.LoginName));
        }

        public static Guid? ValidateUser(string username, string password)
        {
            var userRecord = SqliteService.GetUser(username,password);

            if (userRecord == null)
            {
                return null;
            }

            return userRecord.Token;
        }
    }
}
