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
            context.Users.Add(new User
            {
                UserName = "Admin",
                Password = "123456",
                Token = Guid.NewGuid(),
                CreateTime = DateTime.Now,
                ID=1
            });

            context.Menus.Add(new Menu {ID=1,Name= "所有菜单",Url="",Info="",Code="",Permission="",Icon="",Orderby ="1",CreateTime=DateTime.Now});
            context.Menus.Add(new Menu{ID = 2,Name = "系统管理",Url = "",Info = "",Code = "",Permission = "",Icon = "mdi-action-settings", ParentId=1,Orderby = "101",CreateTime = DateTime.Now});
            context.Menus.Add(new Menu{ID = 3,Name = "菜单管理",Url = "/sys/menu",Info = "",Code = "",Permission = "",Icon = "mdi-navigation-menu", ParentId = 2,Orderby = "10101",CreateTime = DateTime.Now});
            context.Menus.Add(new Menu { ID = 4, Name = "角色管理", Url = "/sys/role", Info = "", Code = "", Permission = "", Icon = "mdi-social-group", ParentId = 2, Orderby = "10102", CreateTime = DateTime.Now });
            context.Menus.Add(new Menu { ID = 5, Name = "用户管理", Url = "/sys/user", Info = "", Code = "", Permission = "", Icon = "mdi-social-person", ParentId = 2, Orderby = "10103", CreateTime = DateTime.Now });

            context.Customers.Add(new Customer
            {
                BuyTime = DateTime.Now,
                Name = "测试",
                Days=10,
                Money=1000,
                Product="测试产品",
                Card="",
                CarrayDate=DateTime.Now,
                DueDate=DateTime.Now,
                CreateTime=DateTime.Now,
                ID=1
            });

        }
    }
}
