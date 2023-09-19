using System;
namespace Chef.Domain.Entities
{
    public class Order
    {
        public Guid OrderId { get; set; }
        public DateTime OrderDate { get; set; }
        public string OrderOwner { get; set; }
        public string Address { get; set; }
        public byte StatusId { get; set; }
        public int TotalPayment { get; set; }

        public Order()
        {
        }

        public Order(
            Guid orderId,
            DateTime orderDate,
            string orderOwner,
            string address,
            byte statusId,
            int totalPayment)
        {
            OrderId = orderId;
            OrderDate = orderDate;
            OrderOwner = orderOwner;
            Address = address;
            StatusId = statusId;
            TotalPayment = totalPayment;
        }

}
}

