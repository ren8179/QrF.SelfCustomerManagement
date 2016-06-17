using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace QrF.Sqlite.Contract
{
    public class Role : IEntity
    {
        public string Name { get; set; }
        public string Info { get; set; }
        public string BusinessPermissionString { get; set; }
        [NotMapped]
        public List<int> BusinessPermissionList
        {
            get
            {
                if (string.IsNullOrEmpty(BusinessPermissionString))
                    return new List<int>();
                else
                    return BusinessPermissionString.Split(",".ToCharArray()).Select(p => int.Parse(p)).ToList();
            }
            set
            {
                BusinessPermissionString = string.Join(",", value.Select(p => (int)p));
            }
        }
    }
}
