using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QrF.Sqlite.Contract
{
    public class IEntity
    {
        public virtual DateTime CreateTime { get; set; }
        public virtual int ID { get; set; }
    }
}
