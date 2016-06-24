using EntityFramework.Extensions;
using QrF.Framework.Contract;
using QrF.Sqlite.Contract;
using QrF.Sqlite.EntityFramework;
using QrF.Sqlite.Service;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QrF.Sqlite.Service
{
    public class SqliteService : ISqliteService
    {
        private readonly int _RootMenuId = 1;

        #region User
        /// <summary>
        /// 查询单个对象
        /// </summary>
        public User GetUser(int id)
        {
            using (var dbContext = new SqliteDbContext())
            {
                return dbContext.Users.Include("Roles").FirstOrDefault(o => o.ID == id);
            }
        }
        public User GetUser(Guid id)
        {
            using (var dbContext = new SqliteDbContext())
            {
                return dbContext.Users.Include("Roles").ToList().FirstOrDefault(o => o.Token.ToString() == id.ToString());
            }
        }
        public User GetUser(string name)
        {
            using (var dbContext = new SqliteDbContext())
            {
                return dbContext.Users.Include("Roles").FirstOrDefault(o =>o.LoginName==name);
            }
        }
        public User GetUser(string name, string password)
        {
            using (var dbContext = new SqliteDbContext())
            {
                return dbContext.Users.Include("Roles").FirstOrDefault(o => o.LoginName == name && o.Password == password);
            }
        }
        /// <summary>
        /// 查询列表(未分页)
        /// </summary>
        public IEnumerable<User> GetUserList(UserRequest request = null)
        {
            request = request ?? new UserRequest();
            using (var dbContext = new SqliteDbContext())
            {
                IQueryable<User> queryList = dbContext.Users.Include("Roles").Where(o => o.IsActive);

                if (!string.IsNullOrEmpty(request.LoginName))
                    queryList = queryList.Where(u => u.LoginName.Contains(request.LoginName));

                if (request.Role != null)
                    queryList = queryList.Where(u => u.Roles.Count(o => o.ID == request.Role.ID) > 0);

                return queryList.OrderBy(u => u.ID).ToPagedList(request.PageIndex, request.PageSize);
            }
        }
        /// <summary>
        /// 查询列表(分页)
        /// </summary>
        public IEnumerable<User> GetUserPageList(UserRequest request = null)
        {
            request = request ?? new UserRequest();
            using (var dbContext = new SqliteDbContext())
            {
                IQueryable<User> queryList = dbContext.Users.Include("Roles").Where(o => o.IsActive);

                if (!string.IsNullOrEmpty(request.LoginName))
                    queryList = queryList.Where(u => u.LoginName.Contains(request.LoginName));

                if (request.Role != null)
                    queryList = queryList.Where(u => u.Roles.Count(o => o.ID == request.Role.ID) > 0);

                return queryList.OrderBy(u => u.ID).ToPagedList(request.PageIndex, request.PageSize);
            }
        }
        /// <summary>
        /// 编辑保存
        /// </summary>
        public void SaveUser(User model)
        {
            using (var dbContext = new SqliteDbContext())
            {
                var ids = model.RoleIds.Split(',').Select<string, int>(x => int.Parse(x)).ToList();
                if (model.ID > 0)
                {
                    dbContext.Users.Attach(model);
                    dbContext.Entry<User>(model).State = EntityState.Modified;
                    var roles = dbContext.Roles.Where(r => ids.Contains(r.ID)).ToList();
                    model.Roles = roles;
                    dbContext.SaveChanges();
                }
                else
                {
                    var existUser = dbContext.Users.Where(u => u.LoginName == model.LoginName).ToList();
                    if (existUser.Count > 0)
                    {
                        throw new BusinessException("LoginName", "此登录名已存在！");
                    }
                    else
                    {
                        dbContext.Users.Add(model);
                        var roles = dbContext.Roles.Where(r => ids.Contains(r.ID)).ToList();
                        model.Roles = roles;
                        dbContext.SaveChanges();
                    }
                }
            }
        }
        /// <summary>
        /// 删除
        /// </summary>
        public void DeleteUser(List<int> ids)
        {
            using (var dbContext = new SqliteDbContext())
            {
                dbContext.Users.Include("Roles").Where(u => ids.Contains(u.ID)).ToList().ForEach(a => { a.Roles.Clear(); dbContext.Users.Remove(a); });
                dbContext.SaveChanges();
            }
        }
        #endregion

        #region Customer
        /// <summary>
        /// 查询单个对象
        /// </summary>
        public Customer GetCustomer(int id)
        {
            using (var dbContext = new SqliteDbContext())
            {
                return dbContext.Customers.FirstOrDefault(o => o.ID == id);
            }
        }
        /// <summary>
        /// 查询列表(未分页)
        /// </summary>
        public IEnumerable<Customer> GetCustomerList(CustomerRequest request = null)
        {
            request = request ?? new CustomerRequest();
            using (var dbContext = new SqliteDbContext())
            {
                IQueryable<Customer> queryList = dbContext.Customers;

                if (!string.IsNullOrEmpty(request.Name))
                {
                    queryList = queryList.Where(u => u.Name.Contains(request.Name));
                }

                return queryList.OrderBy(u => u.ID).ToPagedList(request.PageIndex, request.PageSize);
            }
        }
        /// <summary>
        /// 查询列表(分页)
        /// </summary>
        public IEnumerable<Customer> GetCustomerPageList(CustomerRequest request = null)
        {
            request = request ?? new CustomerRequest();
            using (var dbContext = new SqliteDbContext())
            {
                IQueryable<Customer> queryList = dbContext.Customers;

                if (!string.IsNullOrEmpty(request.Name))
                {
                    queryList = queryList.Where(u => u.Name.Contains(request.Name));
                }

                return queryList.OrderBy(u => u.ID).ToPagedList(request.PageIndex, request.PageSize);
            }
        }
        /// <summary>
        /// 编辑保存
        /// </summary>
        public void SaveCustomer(Customer model)
        {
            using (var dbContext = new SqliteDbContext())
            {
                if (model.ID > 0)
                {
                    dbContext.Customers.Attach(model);
                    dbContext.Entry<Customer>(model).State = EntityState.Modified;
                    dbContext.SaveChanges();
                }
                else
                {
                    dbContext.Set<Customer>().Add(model);
                    dbContext.SaveChanges();
                }
            }
        }
        /// <summary>
        /// 删除
        /// </summary>
        public void DeleteCustomer(List<int> ids)
        {
            using (var dbContext = new SqliteDbContext())
            {
                var model = dbContext.Customers.Where(u => ids.Contains(u.ID)).FirstOrDefault();
                dbContext.Customers.Remove(model);
                dbContext.SaveChanges();
            }
        }
        #endregion

        #region Menu
        /// <summary>
        /// 查询单个对象
        /// </summary>
        public Menu GetMenu(int id)
        {
            using (var dbContext = new SqliteDbContext())
            {
                return dbContext.Menus.Include("Parent").FirstOrDefault(o => o.ID == id);
            }
        }
        /// <summary>
        /// 查询列表(未分页)
        /// </summary>
        public IEnumerable<Menu> GetMenuList(MenuRequest request = null)
        {
            request = request ?? new MenuRequest();
            using (var dbContext = new SqliteDbContext())
            {
                IQueryable<Menu> queryList = dbContext.Menus.Include("Parent").Where(o => o.ID != _RootMenuId);

                if (!string.IsNullOrEmpty(request.Name))
                    queryList = queryList.Where(o => o.Name.Contains(request.Name));
                if (request.ParentId.HasValue)
                    queryList = queryList.Where(o => o.ParentId == request.ParentId);

                return queryList.OrderBy(u => u.Orderby).ToPagedList(request.PageIndex, request.PageSize);
            }
        }
        /// <summary>
        /// 查询列表(分页)
        /// </summary>
        public IEnumerable<Menu> GetMenuPageList(MenuRequest request = null)
        {
            request = request ?? new MenuRequest();
            using (var dbContext = new SqliteDbContext())
            {
                IQueryable<Menu> queryList = dbContext.Menus.Include("Parent").Where(o => o.ID != _RootMenuId);

                if (!string.IsNullOrEmpty(request.Name))
                    queryList = queryList.Where(o => o.Name.Contains(request.Name));
                if (request.ParentId.HasValue)
                    queryList = queryList.Where(o => o.ParentId == request.ParentId);

                return queryList.OrderBy(u => u.Orderby).ToPagedList(request.PageIndex, request.PageSize);
            }
        }
        /// <summary>
        /// 编辑保存
        /// </summary>
        public void SaveMenu(Menu model)
        {
            using (var dbContext = new SqliteDbContext())
            {
                model.ParentId = model.ParentId ?? _RootMenuId;
                if (model.ID > 0)
                {
                    dbContext.Menus.Attach(model);
                    dbContext.Entry<Menu>(model).State = EntityState.Modified;
                    dbContext.SaveChanges();
                }
                else
                {
                    model.Orderby = MaxOrderNumber(model.Parent ?? GetMenu(model.ParentId.Value));
                    dbContext.Set<Menu>().Add(model);
                    dbContext.SaveChanges();
                }
            }
        }
        /// <summary>
        /// 删除
        /// </summary>
        public void DeleteMenu(List<int> ids)
        {
            using (var dbContext = new SqliteDbContext())
            {
                var model=dbContext.Menus.Where(u => ids.Contains(u.ID)).FirstOrDefault();
                dbContext.Menus.Remove(model);
                dbContext.SaveChanges();
            }
        }

        public IList<Menu> UserMenus(string name,int parendId)
        {
            var user = GetUser(name);
            if (user == null)
                return new List<Menu>();
            var ids = new List<int>();
            foreach(var item in user.Roles)
            {
                ids.AddRange(item.BusinessPermissionList);
            }
            return ids.Distinct().Select(o => GetMenu(o)).Where(o=>o.ParentId==parendId).OrderBy(o=>o.Orderby).ToList();
        }

        /// <summary>
        /// 自动生成排序编号
        /// </summary>
        private string MaxOrderNumber(Menu parent)
        {
            using (var dbContext = new SqliteDbContext())
            {
                var orderNum = parent.Orderby;
                var count = dbContext.Menus.Where(o => o.ParentId == parent.ID).Count() + 1;
                orderNum += count < 10 ? "0" + count.ToString() : count.ToString();
                return orderNum;
            }
        }

        #endregion

        #region Role
        public Role GetRole(int id)
        {
            using (var dbContext = new SqliteDbContext())
            {
                return dbContext.Roles.FirstOrDefault(o => o.ID == id);
            }
        }

        public IEnumerable<Role> GetRolePageList(RoleRequest request = null)
        {
            request = request ?? new RoleRequest();
            using (var dbContext = new SqliteDbContext())
            {
                IQueryable<Role> queryList = dbContext.Roles;

                if (!string.IsNullOrEmpty(request.Name))
                {
                    queryList = queryList.Where(u => u.Name.Contains(request.Name));
                }

                return queryList.OrderByDescending(u => u.ID).ToPagedList(request.PageIndex, request.PageSize);
            }
        }

        public void SaveRole(Role model)
        {
            using (var dbContext = new SqliteDbContext())
            {
                if (model.ID > 0)
                {
                    dbContext.Roles.Attach(model);
                    dbContext.Entry(model).State = EntityState.Modified;
                    dbContext.SaveChanges();
                }
                else
                {
                    dbContext.Roles.Add(model);
                    dbContext.SaveChanges();
                }
            }
        }

        public void DeleteRole(List<int> ids)
        {
            using (var dbContext = new SqliteDbContext())
            {
                dbContext.Roles.Include("Users").Where(u => ids.Contains(u.ID)).ToList().ForEach(a => {
                    a.Users.Clear();
                    dbContext.Roles.Remove(a);
                });
                dbContext.SaveChanges();
            }
        }
        #endregion
    }
}
