using QrF.Framework.Contract;

namespace QrF.Sqlite.Contract
{
    public class UserRequest : Request
    {

    }
    public class CustomerRequest : Request
    {

    }
    public class MenuRequest : Request
    {
        public int? pageNumber { get; set; }
        public string Name { get; set; }
        public int? ParentId { get; set; }
    }
}
