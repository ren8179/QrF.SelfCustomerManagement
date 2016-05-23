using QrF.Core.Config;
using QrF.Framework.DAL;
using QrF.Sqlite.Contract;
using System;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Reflection;

namespace QrF.Sqlite.EntityFramework
{
    public class SqliteDbContext : DbContext
    {
        public SqliteDbContext()
            //: base(@"Data Source=WIN-NRSLQON20B9\SQLEXPRESS;Initial Catalog=QrF.Account;Persist Security Info=True;User ID=sa;Password=pass", new LogDbContext()){}
            : base("Sqlite") {
            Configuration.ProxyCreationEnabled = true;
            Configuration.LazyLoadingEnabled = true;
        }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            Database.SetInitializer<SqliteDbContext>(null);
            var typesToRegister = Assembly.GetExecutingAssembly().GetTypes()
                    .Where(type => !String.IsNullOrEmpty(type.Namespace))
                    .Where(type => type.BaseType != null && type.BaseType.IsGenericType && type.BaseType.GetGenericTypeDefinition() == typeof(EntityTypeConfiguration<>));
            foreach (var type in typesToRegister)
            {
                dynamic configurationInstance = Activator.CreateInstance(type);
                modelBuilder.Configurations.Add(configurationInstance);
            }
            base.OnModelCreating(modelBuilder);

            var initializer = new SqliteDbInitializer(modelBuilder);
            Database.SetInitializer(initializer);
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Customer> Customers { get; set; }
    }
}
