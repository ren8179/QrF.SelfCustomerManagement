﻿using System;

namespace QrF.Sqlite.Contract
{
    public class Customer : IEntity
    {
        public Customer()
        {
            CreateTime = DateTime.Now;
            BuyTime = DateTime.Now;
            CarrayDate = DateTime.Now;
            DueDate = DateTime.Now;
            IsActive = true;
        }
        /// <summary>
        /// 购买日期
        /// </summary>
        public DateTime BuyTime { get; set; }

        /// <summary>
        /// 客户姓名
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// 购买天数
        /// </summary>
        public int Days { get; set; }
        /// <summary>
        /// 金额
        /// </summary>
        public decimal Money { get; set; }
        /// <summary>
        /// 产品名称
        /// </summary>
        public string Product { get; set; }
        /// <summary>
        /// 卡号
        /// </summary>
        public string Card { get; set; }

        /// <summary>
        /// 联系方式
        /// </summary>
        public string Contact { get; set; }

        /// <summary>
        /// 收益率
        /// </summary>
        public string YieldRate { get; set; }

        /// <summary>
        /// 预期收益
        /// </summary>
        public string Expected { get; set; }
        /// <summary>
        /// 起息日期
        /// </summary>
        public DateTime CarrayDate { get; set; }
        /// <summary>
        /// 到期日期
        /// </summary>
        public DateTime DueDate { get; set; }
        /// <summary>
        /// 备注说明
        /// </summary>
        public string Remark { get; set; }
        /// <summary>
        /// 操作人
        /// </summary>
        public string CreateUser { get; set; }

        public bool IsActive { get; set; }
    }
}
