using System;
namespace Chef.Domain.Entities
{
    public class Order
    {
        public string OrderId { get; set; }
        public DateTime OrderDate { get; set; }
        public string OrderOwner { get; set; }
        public string Address { get; set; }
        public byte StatusId { get; set; }
        public int TotalPayment { get; set; }
        public List<OrderItem> OrderItems { get; set; }

        public Order()
        {
            OrderItems = new List<OrderItem>();
        }

        public Order(
            string orderId,
            DateTime orderDate,
            string orderOwner,
            string address,
            byte statusId,
            int totalPayment,
            List<OrderItem> orderItems)
        {
            OrderId = orderId;
            OrderDate = orderDate;
            OrderOwner = orderOwner;
            Address = address;
            StatusId = statusId;
            TotalPayment = totalPayment;
            OrderItems = orderItems;
        }

}
}

