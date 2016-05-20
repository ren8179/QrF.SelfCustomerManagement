using EntityFramework.Extensions;
using QrF.Framework.Contract;
using QrF.Sqlite.Contract;
using QrF.Sqlite.EntityFramework;
using QrF.Sqlite.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QrF.Sqlite.Service
{
   public class SqliteService: ISqliteService
    {
        #region User
        /// <summary>
        /// 查询单个对象
        /// </summary>
        public User GetUser(int id)
        {
            using (var dbContext = new SqliteDbContext())
            {
                return dbContext.Find<User>(id);
            }
        }
        public User GetUser(Guid id)
        {
            using (var dbContext = new SqliteDbContext())
            {
                return dbContext.Users.FirstOrDefault(o=>o.Token==id);
            }
        }
        public User GetUser(string name,string password)
        {
            using (var dbContext = new SqliteDbContext())
            {
                return dbContext.Users.FirstOrDefault(o => o.UserName==name && o.Password==password);
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
                IQueryable<User> queryList = dbContext.Users;

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
                IQueryable<User> queryList = dbContext.Users;

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
                if (model.ID > 0)
                {
                    dbContext.Update<User>(model);
                }
                else
                {
                    dbContext.Insert<User>(model);
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
                dbContext.Users.Where(u => ids.Contains(u.ID)).Delete();
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
                return dbContext.Find<Customer>(id);
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
                    dbContext.Update<Customer>(model);
                }
                else
                {
                    dbContext.Insert<Customer>(model);
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
                dbContext.Customers.Where(u => ids.Contains(u.ID)).Delete();
            }
        }
        #endregion

    }
}
