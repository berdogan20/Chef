using System;
namespace Chef.Domain.Entities
{
    public class BasketItem
    {
        public Guid BasketItemId { get; set; }
        public string Email { get; set; }
        public string FoodId { get; set; }
        public byte Amount { get; set; }
        public int Price { get; set; }

        public BasketItem()
        {
        }

        public BasketItem(
            Guid basketItemId,
            string email,
            string foodId,
            byte amount,
            int price)
        {
            BasketItemId = basketItemId;
            Email = email;
            FoodId = foodId;
            Amount = amount;
            Price = price;
        }
    }

}