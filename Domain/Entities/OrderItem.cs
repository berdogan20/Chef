using System;
using Chef.ReadModels;


namespace Chef.Domain.Entities
{
    public class OrderItem
    {
        public Guid OrderItemId { get; set; }
        public Guid FoodItemId { get; set; }
        public byte Amount { get; set; }
        public int Price { get; set; }


        public OrderItem()
        {
        }

        public OrderItem(Guid orderItemId, Guid foodItemId, byte amount, int price)
        {
            OrderItemId = orderItemId;
            FoodItemId = foodItemId;
            Amount = amount;
            Price = price;
        }
    }
}

