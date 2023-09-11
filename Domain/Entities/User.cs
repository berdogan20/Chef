using System;
namespace Chef.Domain.Entities
{
	public class User
	{
        public string Email { get; set; }           // I will use email as user id
        public string Password { get; set; }
        public string Address { get; set; }

        public IList<OrderItem> Basket = new List<OrderItem>();

        public User()
        {

        }

        public User(
            string email,
            string password,
            string address
        )
        {
            Email = email;
            Password = password;
            Address = address;
        }

        public void AddToBasket(Guid orderItemId, Guid foodItemId, byte amount, int price)
        {
            var user = this;

            user.Basket.Add( new OrderItem(orderItemId, foodItemId, amount, price));

        }

    }
}

