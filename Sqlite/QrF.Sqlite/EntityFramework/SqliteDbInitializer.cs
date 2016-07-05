using QrF.Sqlite.Contract;
using SQLite.CodeFirst;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QrF.Sqlite.EntityFramework
{
    public class SqliteDbInitializer : SqliteDropCreateDatabaseWhenModelChanges<SqliteDbContext>
    {
        public SqliteDbInitializer(DbModelBuilder modelBuilder)
            : base(modelBuilder, typeof(CustomHistory))
        { }

        protected override void Seed(SqliteDbContext context)
        {
            context.Menus.Add(new Menu { ID = 1, Name = "所有菜单", Url = "", Info = "", Code = "", Permission = "", Icon = "", Orderby = "1", CreateTime = DateTime.Now });
            context.Menus.Add(new Menu { ID = 2, Name = "系统管理", Url = "", Info = "", Code = "", Permission = "", Icon = "mdi-action-settings", ParentId = 1, Orderby = "101", CreateTime = DateTime.Now });
            context.Menus.Add(new Menu { ID = 3, Name = "菜单管理", Url = "/sys/menu", Info = "", Code = "menu", Permission = "", Icon = "mdi-navigation-menu", ParentId = 2, Orderby = "10101", CreateTime = DateTime.Now });
            context.Menus.Add(new Menu { ID = 4, Name = "角色管理", Url = "/sys/role", Info = "", Code = "role", Permission = "", Icon = "mdi-social-group", ParentId = 2, Orderby = "10102", CreateTime = DateTime.Now });
            context.Menus.Add(new Menu { ID = 5, Name = "用户管理", Url = "/sys/user", Info = "", Code = "user", Permission = "", Icon = "mdi-social-person", ParentId = 2, Orderby = "10103", CreateTime = DateTime.Now });
            context.Menus.Add(new Menu { ID = 6, Name = "客户管理", Url = "", Info = "", Code = "", Permission = "", Icon = "mdi-action-assignment-ind", ParentId = 1, Orderby = "102", CreateTime = DateTime.Now });
            context.Menus.Add(new Menu { ID = 7, Name = "客户信息", Url = "/customer/info", Info = "", Code = "info", Permission = "", Icon = "mdi-action-credit-card", ParentId = 6, Orderby = "10201", CreateTime = DateTime.Now });


            var role = new Role { ID = 1, Name = "系统管理员", Info = "系统管理员", BusinessPermissionString = "1,2,3,4,5", CreateTime = DateTime.Now };
            context.Roles.Add(role);
            context.Users.Add(new User
            {
                UserName = "系统管理员",
                LoginName = "Admin",
                Password = "be05977add575832dc52655d4ad5c42e",
                Token = Guid.NewGuid(),
                CreateTime = DateTime.Now,
                Roles = new List<Role>() { role },
                ID = 1
            });
            context.Customers.Add(new Customer
            {
                BuyTime = DateTime.Now,
                Name = "测试",
                Days = 10,
                Money = 1000,
                Product = "测试产品",
                Card = "",
                CarrayDate = DateTime.Now,
                DueDate = DateTime.Now,
                CreateTime = DateTime.Now,
                CreateUser = "Admin",
                ID = 1,
                IsActive = true
            });

        }
    }
}
