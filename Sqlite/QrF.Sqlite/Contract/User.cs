using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace QrF.Sqlite.Contract
{
    public class User : IEntity
    {
        public User()
        {
            this.Roles = new List<Role>();
            this.IsActive = true;
        }
        /// <summary>
        /// 登录名
        /// </summary>
        public string LoginName { get; set; }

        public string UserName { get; set; }
        public string Password { get; set; }
        /// <summary>
        /// 手机号
        /// </summary>
        public string Mobile { get; set; }

        /// <summary>
        /// 邮箱
        /// </summary>
        public string Email { get; set; }
        public Guid Token { get; set; }

        /// <summary>
        /// 角色列表
        /// </summary>
        public virtual List<Role> Roles { get; set; }
        public bool IsActive { get; set; }
        [NotMapped]
        public string NewPassword { get; set; }

        [NotMapped]
        public string RoleIds { get; set; }

        [NotMapped]
        public List<int> BusinessPermissionList
        {
            get
            {
                var permissions = new List<int>();

                foreach (var role in Roles)
                {
                    permissions.AddRange(role.BusinessPermissionList);
                }

                return permissions.Distinct().ToList();
            }
        }
    }
}
