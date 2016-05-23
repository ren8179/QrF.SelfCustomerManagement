using Nancy;
using QrF.Sqlite.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QrF.Sqlite.Demo.Modules
{
    public class BaseNancyModule : NancyModule
    {
        protected readonly ISqliteService _sqliteService;

    }
}
