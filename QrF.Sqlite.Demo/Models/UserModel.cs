using Nancy;
using Nancy.Authentication.Forms;
using QrF.Core.Service;
using QrF.Sqlite.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;
using Nancy.Security;

namespace QrF.Sqlite.Demo.Models
{
    public class UserModel : IUserMapper
    {
        public virtual ISqliteService SqliteService
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
                       : new ClaimsPrincipal(new GenericIdentity(userRecord.UserName));
        }

        public Guid? ValidateUser(string username, string password)
        {
            var userRecord = SqliteService.GetUser(username,password);

            if (userRecord == null)
            {
                return null;
            }

            return userRecord.Token;
        }

        IUserIdentity IUserMapper.GetUserFromIdentifier(Guid identifier, NancyContext context)
        {
            throw new NotImplementedException();
        }
    }
}
