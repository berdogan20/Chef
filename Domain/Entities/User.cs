using System;
namespace Chef.Domain.Entities
{
	public class User
	{
        public string Email { get; set; }           // I will use email as user id
        public string Password { get; set; }
        public string Address { get; set; }

        public IList<Order> Orders = new List<Order>();

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


        public object? MakeOrder(string orderId,
            Guid foodId,
            string orderOwner,
            byte amount,
            string address,
            string status)
        {
            var user = this;

           
            user.Orders.Add(
                new Order(
                     orderId,
                     foodId,
                     orderOwner,
                     amount,
                     address,
                     status)
                );

            return null;
        }
    }
}

