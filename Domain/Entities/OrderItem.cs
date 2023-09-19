using System;
using Chef.ReadModels;


namespace Chef.Domain.Entities
{
    public class OrderItem
    {
        public string OrderId { get; set; }
        public Guid OrderItemId { get; set; }
        public string FoodItemId { get; set; }
        public byte Amount { get; set; }
        public int Price { get; set; }


        public OrderItem()
        {
        }

        public OrderItem(string orderId, Guid orderItemId, string foodItemId, byte amount, int price)
        {
            OrderId = orderId;
            OrderItemId = orderItemId;
            FoodItemId = foodItemId;
            Amount = amount;
            Price = price;
        }

    }
}

