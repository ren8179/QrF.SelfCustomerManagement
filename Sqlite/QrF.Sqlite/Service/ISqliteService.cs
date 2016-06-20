using QrF.Sqlite.Contract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QrF.Sqlite.Service
{
    public interface ISqliteService
    {
        #region User
        /// <summary>
        /// 查询单个对象
        /// </summary>
        User GetUser(int id);
        User GetUser(Guid id);
        User GetUser(string name);
        User GetUser(string name, string password);
        /// <summary>
        /// 查询列表(未分页)
        /// </summary>
        IEnumerable<User> GetUserList(UserRequest request = null);
        /// <summary>
        /// 查询列表(分页)
        /// </summary>
        IEnumerable<User> GetUserPageList(UserRequest request = null);
        /// <summary>
        /// 编辑保存
        /// </summary>
        void SaveUser(User model);
        /// <summary>
        /// 删除
        /// </summary>
        void DeleteUser(List<int> ids);

        #endregion

        #region Customer
        /// <summary>
        /// 查询单个对象
        /// </summary>
        Customer GetCustomer(int id);
        /// <summary>
        /// 查询列表(未分页)
        /// </summary>
        IEnumerable<Customer> GetCustomerList(CustomerRequest request = null);
        /// <summary>
        /// 查询列表(分页)
        /// </summary>
        IEnumerable<Customer> GetCustomerPageList(CustomerRequest request = null);
        /// <summary>
        /// 编辑保存
        /// </summary>
        void SaveCustomer(Customer model);
        /// <summary>
        /// 删除
        /// </summary>
        void DeleteCustomer(List<int> ids);

        #endregion

        #region Menu
        /// <summary>
        /// 查询单个对象
        /// </summary>
        Menu GetMenu(int id);
        /// <summary>
        /// 查询列表(未分页)
        /// </summary>
        IEnumerable<Menu> GetMenuList(MenuRequest request = null);
        /// <summary>
        /// 查询列表(分页)
        /// </summary>
        IEnumerable<Menu> GetMenuPageList(MenuRequest request = null);
        /// <summary>
        /// 编辑保存
        /// </summary>
        void SaveMenu(Menu model);
        /// <summary>
        /// 删除
        /// </summary>
        void DeleteMenu(List<int> ids);
        /// <summary>
        /// 获取用户权限
        /// </summary>
        IList<Menu> UserMenus(string name, int parendId);
        #endregion

        #region Role
        Role GetRole(int id);
        IEnumerable<Role> GetRolePageList(RoleRequest request = null);
        void SaveRole(Role role);
        void DeleteRole(List<int> ids);
        #endregion
    }
}
