using QrF.Framework.Contract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QrF.Sqlite.Contract
{
    [Auditable]
    public class User : ModelBase
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public Guid Token { get; set; }
    }
}
