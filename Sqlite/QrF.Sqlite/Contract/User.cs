using System;

namespace QrF.Sqlite.Contract
{
    public class User : IEntity
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public Guid Token { get; set; }
    }
}
