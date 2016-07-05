using QrF.Framework.Contract;
using System;

namespace QrF.Sqlite.Contract
{
    public class UserRequest : Request
    {
        public int? pageNumber { get; set; }
        public string LoginName { get; set; }
        public Role Role { get; set; }
    }
    public class CustomerRequest : Request
    {
        public int? pageNumber { get; set; }
        public string Name { get; set; }
        public DateTime? QueryDate { get; set; }
        public string CreateUser { get; set; }
    }
    public class MenuRequest : Request
    {
        public int? pageNumber { get; set; }
        public string Name { get; set; }
        public int? ParentId { get; set; }
    }
    public class RoleRequest : Request
    {
        public int? pageNumber { get; set; }
        public string Name { get; set; }
    }
}
